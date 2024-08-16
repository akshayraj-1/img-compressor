import { useRef, useState} from "react";
import {ImagePlus, Upload} from 'lucide-react';
import Button from "../components/UI/Button.jsx";
import ImageComparison from "../components/ImageComparison.jsx";

import _sample from "../assets/images/_sample.jpg";
import _sample_min from "../assets/images/_sample_min.jpg";
import ImageItem from "../components/ImageItem.jsx";
import useImageCompressor from "../hooks/useImageCompressor.js";
import MainBackground from "../components/Backgrouds/MainBackground.jsx";
import {formatFileSize} from "../utils/format.util.js";


function Home() {

    const inputRef = useRef(null);
    const [compressionQueue, setCompressionQueue] = useState([]);

    const {compress} = useImageCompressor();


    const handleImageSelection = async (e) => {
        const files = e.target.files;
        if (files.length === 0) {
            return;
        }
        const compressImages = Array.from(files).map(file => {
            console.log(file);
            return {
                imgSrc: URL.createObjectURL(file),
                imgName: file.name,
                imgSize: file.size,
                currentState: "compressing"
            }
        });
        setCompressionQueue([...compressImages, ...compressionQueue]);
        const response = await compress(files, 25, () => {});
        if (response.success) {
            setCompressionQueue(prev => {
                return prev.map(img => {
                    const found = response.data.images?.find(o => o.original_name === img.imgName);
                    if (found) {
                        return {
                            ...img,
                            id: found.id,
                            imgSrc: found.url,
                            compressedSize: found.compressed_size * 1024,
                            currentState: "compressed"
                        }
                    }
                    return img;
                })
            })
        } else {
            setCompressionQueue(prev => {
                return prev.map(img => {
                    const found = response.data.images?.find(o => o.original_name === img.imgName);
                    if (found) {
                        return {
                            ...img,
                            currentState: "failed"
                        }
                    }
                    return img;
                })
            })
        }
    }


    return (
        <>
            <MainBackground className="relative">
                <section className="relative flex flex-col gap-3 items-center w-screen h-auto min-h-screen px-5 sm:px-8">
                    <h1 className="text-center text-[2.3rem] sm:text-[2.6rem] leading-[125%] font-bold mt-12">
                        <span className="text-accent">Online</span> Image Compressor
                    </h1>
                    <p className="text-textSecondary text-center text-sm sm:text-base sm:mx-6 sm:text-center">
                        Compress images with a single click, reduce image size without losing image quality.
                    </p>
                    <div
                        className="flex flex-col justify-center items-center gap-3.5 bg-secondary rounded-xl shadow-mainCard px-8 py-9 mt-8 border-2 border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[850px]">
                        <ImagePlus className="text-textSecondary" size={90} strokeWidth={3} absoluteStrokeWidth/>
                        <input ref={inputRef} type="file" accept="image/jpg, image/jpeg, image/png" hidden
                               multiple={true} onInput={handleImageSelection}/>
                        <Button type="button" variant="primary"
                                className="mt-2.5 py-3"
                                label="Upload Image"
                                icon={<Upload size={18} absoluteStrokeWidth/>}
                                onClick={() => inputRef.current.click()}/>
                        <p className="text-textSecondary text-sm">or drop your images</p>
                    </div>

                    {
                        compressionQueue?.length > 0 && (
                            <div
                                className="w-full sm:w-[70vw] max-w-[850px] mt-3 mb-28 py-4 rounded-xl bg-secondary shadow-mainCard">
                                <div id="image-list"
                                     className="flex flex-col gap-3.5 size-full max-h-[60vh] overflow-y-scroll">
                                    {
                                        compressionQueue.map((item, idx) => {
                                            return (
                                                <ImageItem key={idx}
                                                           id = {item.id || idx}
                                                           imageSrc={item.imgSrc} title={item.imgName}
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
                                     afterImage={{src: _sample_min, size: "420KB"}}/>
                </div>
            </section>

        </>
    );
}

export default Home;
