import MainBackground from "../components/Backgrouds/MainBackground.jsx";
import Button from "../components/UI/Button.jsx";
import {useRef} from "react";


function Home() {

    const inputRef = useRef(null);

    return (
        <section className="flex flex-col gap-3 justify-center items-center size-full px-5 sm:px-8">
            <h1 className="text-[2.3rem] sm:text-[2.6rem] leading-[125%] font-semibold"><span
                className="text-accent">Online</span> Image Compressor</h1>
            <p className="text-textSecondary text-sm sm:text-base sm:mx-6 sm:text-center">Compress images with a single
                click, reduce image size without losing image quality.</p>
            <div
                className="flex flex-col justify-center items-center gap-3.5 bg-secondary rounded-xl shadow-mainCard px-8 py-9 mt-10 border-2 border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[750px]">
                <i className="fi fi-tr-add-image text-textSecondary text-6xl sm:text-7xl"></i>
                <input ref={inputRef} type="file" accept="image/jpg, image/jpeg, image/png, image/webp" hidden/>
                <Button className="mt-2" label="Upload Image" icon="fi fi-sr-upload"
                        onClick={() => inputRef.current.click()}/>
                <p className="text-textSecondary text-sm">or drop your images</p>
            </div>
        </section>
    )
        ;
}

export default Home;
