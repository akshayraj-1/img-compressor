import PropTypes from "prop-types";
import cn from "../../utils/cn.util.js";
import { Link } from "react-router-dom";

const buttonStyles = {
    base: "flex items-center justify-center gap-2 text-[0.9rem] sm:text-base font-normal",
    primary: "bg-button rounded-full px-6 py-2.5 shadow-primaryButton text-white",
    tertiary: "bg-transparent border border-colorPrimary rounded-lg px-4 py-2 text-colorPrimary hover:bg-button hover:text-white transition",
};

function Button({ type = "button", variant = "primary", icon, label, className, target, onClick }) {

    const style = cn(buttonStyles.base, buttonStyles[variant], className);

    const Component = type === "anchor" ? "a" : type === "link" ? Link : "button";

    return (
        <Component className={style} href={target} to={target} onClick={onClick}>
            {icon}
            {label}
        </Component>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(["button", "anchor", "link"]),
    variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
