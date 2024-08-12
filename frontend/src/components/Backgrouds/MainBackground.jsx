import cn from "../../utils/cn.util.js";

function MainBackground({ children, ...props }) {

    return (
        <section className="relative size-full">
            <div className="absolute z-[1] size-full bg-mainBg blur-[128px] bg-center bg-cover bg-no-repeat opacity-[0.07]"></div>
            <div className={cn("absolute z-[2] size-full", props.className)}>
                {children}
            </div>
        </section>
    );
}

export default MainBackground;