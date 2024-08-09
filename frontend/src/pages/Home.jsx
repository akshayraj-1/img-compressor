import MainBackground from "../components/Backgrouds/MainBackground.jsx";


function Home() {

    return (
        <MainBackground className="w-screen">
            <div className="flex flex-col gap-3 justify-center items-center size-full px-5 sm:px-8">
                <h1 className="text-[2.6rem] font-semibold"><span className="text-accent">Online</span> Image Compressor</h1>
                <p className="text-textSecondary text-sm sm:text-base sm:mx-6 sm:text-center">Compress images with a single click, reduce image size without losing image quality.</p>
                <div
                    className="flex flex-col justify-center items-center bg-secondary rounded-xl shadow-mainCard px-8 py-7 mt-10 border-2 border-textSecondary/30 border-dashed w-full sm:w-[70vw] max-w-[750px]">
                    <i className="fi fi-tr-images text-textSecondary text-7xl"></i>

                </div>
            </div>
        </MainBackground>
    );
}

export default Home;
