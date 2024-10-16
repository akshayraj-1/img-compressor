import {useRef, useState} from "react";
import {Upload} from 'lucide-react';
import useCustomToast from "../hooks/useCustomToast.jsx";
import useImageCompressor from "../hooks/useImageCompressor.js";
import cn from "../utils/cn.util.js";
import {formatFileSize} from "../utils/format.util.js";

import Button from "../components/UI/Button.jsx";
import ImageComparison from "../components/ImageComparison.jsx";
import MainBackground from "../components/Backgrouds/MainBackground.jsx";
import ImageItem from "../components/ImageItem.jsx";
import img_sample from "../assets/images/img_sample.jpg";
import img_sample_min from "../assets/images/img_sample_min.jpg";
import img_picker_icon from "../assets/images/img_picker_icon.svg";

function Home() {

    const MAX_FILE_COUNT = 30;
    const MAX_FILE_SIZE = 15728640;
    const inputRef = useRef(null);
    const [compressionQueue, setCompressionQueue] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const {CustomToastModal, showToast} = useCustomToast();
    const {compress} = useImageCompressor();

    const updateCompressionQueue = (imgName, oldState, newState, updatedFields = {}) => {
        setCompressionQueue(prevState => {
            return prevState.map(file => {
                if (file.imgName === imgName && file.currentState === oldState) {
                    return { ...file, currentState: newState, ...updatedFields };
                } else {
                    return file;
                }
            });
        });
    };

    const uploadImagesForCompression = async (files) => {
        if (!files || files.length > MAX_FILE_COUNT) {
            showToast("Please select less than 30 images", "error");
            return;
        }
        const currentBatch = files.map(file => {
            if (file.size > MAX_FILE_SIZE) {
                showToast("Please select less than 15MB images", "error");
                return null;
            }
            return {
                id: (Date.now() + Math.round(Math.random() * 1000)).toString(),
                imgSrc: URL.createObjectURL(file),
                imgName: file.name,
                imgSize: file.size,
                currentState: "uploading"
            };
        }).filter(Boolean);

        if (currentBatch.length < files.length) return;

        setCompressionQueue(prev => [...currentBatch, ...prev]);

        const response = await compress(files, 20, (progress) => {
            if (progress >= 100) {
                currentBatch.forEach(file => {
                    updateCompressionQueue(file.imgName, "uploading", "compressing");
                });
            }
        });

        if (!response || !response.success || !response.data) {
            currentBatch.forEach(file => {
                updateCompressionQueue(file.imgName, "compressing", "failed");
            });
            return showToast(response?.message || "Something went wrong", "error");
        } else {
            response.data.images.forEach(file => {
                const foundFile = currentBatch.find(f => f.imgName === file.original_name);
                if (!foundFile) return;
                if (file.success) {
                    updateCompressionQueue(foundFile.imgName, "compressing", "compressed", {
                        id: file.id,
                        url: file.url,
                        compressedSize: file.compressed_size / 1024
                    });
                } else {
                    updateCompressionQueue(foundFile.imgName, "compressing", "failed");
                }
            })
        }
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataTransfer = e.dataTransfer;
        if (dataTransfer.files) {
            setIsDragging(false);
            uploadImagesForCompression(Array.from(dataTransfer.files)).then(() => {
                dataTransfer.clearData();
            });
        }
    };

    const handleImageSelection = (e) => {
        uploadImagesForCompression(Array.from(e.target.files)).then(() => {
            e.target.value = null;
        });
    };


    return (
        <>
            <CustomToastModal/>
            <MainBackground className="relative">
                <section
                    className="relative flex flex-col gap-3 items-center w-screen h-auto min-h-screen px-5 sm:px-8">
                    <h1 className="text-center text-[2.3rem] sm:text-[2.6rem] leading-[125%] font-bold">
                        <span className="text-primary">Online</span> Image Compressor
                    </h1>
                    <p className="text-textSecondary text-center text-sm sm:text-base sm:mx-6 sm:text-center">
                        Compress images with a single click, reduce image size without losing image quality.
                    </p>
                    <div
                        className={cn("relative bg-surface rounded-xl shadow-mainCard px-8 py-9 mt-8 border-2 " +
                            "border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[850px] overflow-hidden",
                            isDragging && "border-primaryLight/60")}
                        onDrop={handleImageDrop}
                        onDragOver={e => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragEnter={() => setIsDragging(true)}
                        onDragExit={() => setIsDragging(false)}
                        onDragLeave={() => setIsDragging(false)}
                    >
                        <div className="flex flex-col justify-center items-center gap-3.5">
                            <img src={img_picker_icon} alt="" className="size-32"/>
                            <input ref={inputRef} type="file" accept="image/jpg, image/jpeg, image/png, image/gif"
                                   hidden
                                   multiple={true} onInput={handleImageSelection}/>
                            <Button type="button" variant="primary"
                                    className="py-3"
                                    label="Upload Image"
                                    icon={<Upload size={18} absoluteStrokeWidth/>}
                                    onClick={() => inputRef.current.click()}/>
                            <p className="text-textSecondary text-sm">or drop your images</p>
                        </div>
                    </div>

                    {
                        compressionQueue?.length > 0 && (
                            <div
                                className="w-full sm:w-[70vw] max-w-[850px] mt-3 mb-28 py-4 rounded-xl bg-surface shadow-mainCard">
                                <div id="image-list"
                                     className="flex flex-col gap-3.5 size-full max-h-[60vh] overflow-y-scroll">
                                    {
                                        compressionQueue.map(item => {
                                            return (
                                                <ImageItem key={item.id}
                                                           id={item.id}
                                                           imageSrc={item.imgSrc}
                                                           title={item.imgName}
                                                           state={item.currentState || "compressing"}
                                                           originalSize={formatFileSize(item.imgSize / 1024, 1)}
                                                           compressedSize={item.compressedSize && formatFileSize(item.compressedSize, 1)}
                                                           downloadUrl={item?.url}
                                                           onDelete={(id) => setCompressionQueue(prev => prev.filter((obj) => obj.id !== id))}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                </section>
            </MainBackground>

            {/* Image Comparison */}
            <section className="flex flex-col gap-3 items-center justify-start size-full px-5 sm:px-8 pt-0 pb-28">
                <h2 className="text-3xl sm:text-4xl leading-[125%] font-bold text-center">Can you find the
                    difference?</h2>
                <p className="text-textSecondary text-center sm:max-w-[60vw]">With seamless compression, you can reduce
                    image size without losing image quality</p>
                <div
                    className="w-full sm:w-[70vw] max-w-[850px] bg-surface shadow-mainCard rounded-xl sm:rounded-3xl overflow-hidden mt-6">
                    <ImageComparison beforeImage={{src: img_sample, size: "1.8MB"}}
                                     afterImage={{src: img_sample_min, size: "420KB"}}
                    />
                </div>
            </section>
        </>
    );
}

export default Home;
