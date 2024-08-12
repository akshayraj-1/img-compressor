import cn from "../../utils/cn.util.js";

const buttonStyles = {
    primary: {
        base: cn("flex items-center justify-center gap-2.5 bg-button rounded-full px-8 py-3 shadow-primaryButton"),
        text: cn("text-secondary text-sm sm:text-base"),
    },
    secondary: {
        base: cn(),
    },
    tertiary: {
        base: cn("flex items-center justify-center gap-3 bg-transparent border border-accent rounded-lg px-4 py-2"),
        text: cn("text-accent text-sm sm:text-base"),
        hover: cn("hover:bg-button hover:text-secondary transition"),
    },
};

function Button({ type = "primary", icon = "", label = "Click Me", className = "", onClick = () => {} }) {

    const { base, text, hover } = buttonStyles[type] || buttonStyles.primary;

    return (
        <button
            className={cn(text, base, hover, className)}
            onClick={onClick}
        >
            {icon && <i className={cn(icon, "text-sm -mb-1")}></i>}
            {label}
        </button>
    );
}

export default Button;
