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
import _sample from "../assets/images/_sample.jpg";
import _sample_min from "../assets/images/_sample_min.jpg";
import _picker_icon from "../assets/images/_picker_icon.svg";

function Home() {

    const inputRef = useRef(null);
    const [compressionQueue, setCompressionQueue] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const {CustomToastModal, showToast} = useCustomToast();
    const {compress} = useImageCompressor();

    const uploadImagesForCompression = async (files) => {
        if (!files || files.length > 30) {
            showToast("Please select less than 30 images", "error");
            return;
        }
        const currentBatch = files.map(file => {
            return {
                id: (Date.now() + Math.round(Math.random() * 1000)).toString(),
                imgSrc: URL.createObjectURL(file),
                imgName: file.name,
                imgSize: file.size,
                currentState: "uploading"
            };
        });

        setCompressionQueue(prev => [...currentBatch, ...prev]);

        const response = await compress(files, 20, (progress) => {
            if (progress >= 100) {
                setCompressionQueue(prev =>
                    prev?.map(img => currentBatch.find(o => o.imgName === img.imgName && img.currentState === "uploading")
                            ? { ...img, currentState: "compressing" }
                            : img
                    )
                );
            }
        });
        if (!response || !response.success) {
            setCompressionQueue(prev =>
                prev?.map(img => currentBatch.find(o => o.imgName === img.imgName)
                        ? { ...img, currentState: "failed" }
                        : img
                )
            );
            showToast(response?.data?.message || "Something went wrong", "error");
        } else {
            setCompressionQueue(prev =>
                prev?.map(img => {
                    const found = response.data?.images?.find(o => o.original_name === img.imgName && img.currentState === "compressing");
                    if (found && !found.success) {
                        showToast(found.message || "Something went wrong", "error");
                    }
                    return found ? {
                        ...img,
                        id: found.id,
                        imgSrc: found.url || img.imgSrc,
                        compressedSize: found.compressed_size * 1024 || img.imgSize,
                        currentState: found.success ? "compressed" : "failed"
                    } : img;
                })
            );
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
                    <h1 className="text-center text-[2.3rem] sm:text-[2.6rem] leading-[125%] font-bold mt-10">
                        <span className="text-accent">Online</span> Image Compressor
                    </h1>
                    <p className="text-textSecondary text-center text-sm sm:text-base sm:mx-6 sm:text-center">
                        Compress images with a single click, reduce image size without losing image quality.
                    </p>
                    <div
                        className={cn("relative bg-secondary rounded-xl shadow-mainCard px-8 py-9 mt-8 border-2 " +
                            "border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[850px] overflow-hidden",
                            isDragging && "border-accentLight/60")}
                        onDrop={handleImageDrop}
                        onDragOver={e => e.preventDefault() && setIsDragging(true)}
                        onDragEnter={() => setIsDragging(true)}
                        onDragExit={() => setIsDragging(false)}
                        onDragLeave={() => setIsDragging(false)}
                    >
                        <div className="flex flex-col justify-center items-center gap-3.5">
                            <img src={_picker_icon} alt="" className="size-32"/>
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
                                className="w-full sm:w-[70vw] max-w-[850px] mt-3 mb-28 py-4 rounded-xl bg-secondary shadow-mainCard">
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
                                                           originalSize={formatFileSize(item.imgSize, 1)}
                                                           compressedSize={item.compressedSize && formatFileSize(item.compressedSize, 1)}
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

            <section className="flex flex-col gap-3 items-center justify-start size-full px-5 sm:px-8 pt-0 pb-28">
                <h2 className="text-3xl sm:text-4xl leading-[125%] font-bold text-center">Can you find the
                    difference?</h2>
                <p className="text-textSecondary text-center sm:max-w-[60vw]">With seamless compression, you can reduce
                    image size without losing image quality</p>
                <div
                    className="w-full sm:w-[70vw] max-w-[850px] bg-secondary shadow-mainCard rounded-xl sm:rounded-3xl overflow-hidden mt-6">
                    <ImageComparison beforeImage={{src: _sample, size: "1.8MB"}}
                                     afterImage={{src: _sample_min, size: "420KB"}}
                    />
                </div>
            </section>

        </>
    );
}

export default Home;
