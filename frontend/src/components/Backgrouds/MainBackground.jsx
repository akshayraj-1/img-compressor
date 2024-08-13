import cn from "../../utils/cn.util.js";
import PropTypes from "prop-types";

function MainBackground({ children, className }) {

    return (
        <section className="relative size-full">
            <div className="absolute z-[1] size-full bg-mainBg blur-3xl bg-center bg-cover bg-no-repeat opacity-5"></div>
            <div className={cn("absolute z-[2] size-full", className)}>
                {children}
            </div>
        </section>
    );
}

MainBackground.prototype = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default MainBackground;