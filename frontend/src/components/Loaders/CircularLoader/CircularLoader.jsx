import "./CircularLoader.scss";
import PropTypes from "prop-types";
import cn from "../../../utils/cn.util.js";

function CircularLoader({ size = "sm", color = "#fff", className }) {

    const styles = {
        sm: {
            "--size": "25px",
            "--backgroundSize": "5px",
        },
        md: {
            "--size": "50px",
            "--backgroundSize": "10px",
        },
        lg: {
            "--size": "100px",
            "--backgroundSize": "20px",
        },
    };

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <div className="custom-loader" style={{...styles[size], "--color": color}}></div>
        </div>
    );
}

CircularLoader.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    color: PropTypes.string,
    className: PropTypes.string
};

export default CircularLoader;