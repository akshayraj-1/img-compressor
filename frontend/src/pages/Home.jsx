import {useRef} from "react";
import { ImagePlus, Upload } from 'lucide-react';
import Button from "../components/Button.jsx";
import MainBackground from "../components/Backgrouds/MainBackground.jsx";
import ImageComparison from "../components/ImageComparison.jsx";

import _sample from "../assets/images/_sample.jpg";
import _sample_min from "../assets/images/_sample_min.jpg";


function Home() {

    const inputRef = useRef(null);

    return (
        <>
            <MainBackground className="w-screen">
                <section
                    className="flex flex-col gap-3 justify-center items-center size-full min-h-screen px-5 sm:px-8">
                    <h1 className="text-center text-[2.3rem] sm:text-[2.6rem] leading-[125%] font-bold"><span
                        className="text-accent">Online</span> Image Compressor</h1>
                    <p className="text-textSecondary text-center text-sm sm:text-base sm:mx-6 sm:text-center">Compress images with a
                        single
                        click, reduce image size without losing image quality.</p>
                    <div
                        className="flex flex-col justify-center items-center gap-3.5 bg-secondary rounded-xl shadow-mainCard px-8 py-9 mt-10 border-2 border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[850px]">
                        <ImagePlus className="text-textSecondary" size={90} strokeWidth={3} absoluteStrokeWidth  />
                        <input ref={inputRef} type="file" accept="image/jpg, image/jpeg, image/png, image/webp" hidden/>
                        <Button type="button" variant="primary"
                                className="mt-2.5"
                                label="Upload Image"
                                icon={<Upload size={18} absoluteStrokeWidth />}
                                onClick={() => inputRef.current.click()}/>
                        <p className="text-textSecondary text-sm">or drop your images</p>
                    </div>
                </section>
            </MainBackground>

            <section className="flex flex-col gap-3 items-center justify-start size-full px-5 sm:px-8">
                <h2 className="text-3xl sm:text-4xl leading-[125%] font-bold text-center">Can you find the difference?</h2>
                <p className="text-textSecondary text-center sm:max-w-[60vw]">With seamless compression, you can reduce image size without losing image quality</p>
                <div className="w-full sm:w-[70vw] max-w-[850px] bg-secondary shadow-mainCard shadow-accentLight/10 rounded-xl sm:rounded-3xl overflow-hidden mt-5">
                    <ImageComparison beforeImage={{ src: _sample, size: "1.9MB"}} afterImage={{src: _sample_min, size: "580KB"}} />
                </div>
            </section>

        </>
    );
}

export default Home;
