import cn from "../../utils/cn.util.js";

function MainBackground({ children, ...props }) {

    return (
        <div className="relative size-full">
            <div className="absolute z-[1] size-full bg-mainBg blur-[120px] bg-center bg-cover bg-no-repeat opacity-10"></div>
            <div className={cn("absolute z-[2] size-full", props.className)}>
                {children}
            </div>
        </div>
    );
}

export default MainBackground;