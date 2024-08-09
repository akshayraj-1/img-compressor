import cn from "../../utils/cn.util.js";

function Button({ type = "primary", label = "Click Me", onClick = () => {} }) {
    const style = {
        background: cn(),
        text: cn(),
    };

    return (
        <button className={cn(style.text, style.background)}>{label}</button>
    );
}

export default Button;