import {useState} from "react";
import PropTypes from "prop-types";
import cn from "../utils/cn.util.js";
import {SeparatorVertical} from "lucide-react";

function ImageComparison({ beforeImage, afterImage, className }) {

    const [currentWidth, setCurrentWidth] = useState(50);
    const [labelVisible, setLabelVisible] = useState(false);

    const handleChange = (e) => {
        setCurrentWidth(Number(e.target.value));
    };

    return (
        <div
            className={cn("relative overflow-hidden w-full aspect-[21/12] text-secondary text-[0.75rem]", className)}>

            <div className="absolute z-[1] size-full overflow-hidden" style={{clipPath: `inset(0 ${100 - currentWidth}% 0 0)`}}>
                <img className="size-full object-cover object-left" src={beforeImage.src} alt="Before Image"/>
                <span className="absolute bottom-3 left-3 bg-black/40 min-w-14 text-center px-3 py-1 rounded-md transition-opacity ease-in-out duration-300" style={{opacity: labelVisible ? 1 : 0}}>Before: {beforeImage.size}</span>
            </div>

            <div className="absolute size-full overflow-hidden">
                <img className="size-full object-cover object-left" src={afterImage.src} alt="After Image"/>
                <span className="absolute bottom-3 right-3 bg-black/40 min-w-14 text-center px-3 py-1 rounded-md transition-opacity ease-in-out duration-300" style={{opacity: labelVisible ? 1 : 0}}>After: {afterImage.size}</span>
            </div>

            <input className="absolute z-[4] w-full h-full bg-transparent opacity-0 cursor-col-resize"
                   type="range" min={0} max={100}
                   onChange={handleChange}
                   onMouseEnter={() => setLabelVisible(true)}
                   onMouseLeave={() => setLabelVisible(false)}
            />
            <div
                className="absolute z-[3] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center h-full"
                style={{left: currentWidth+"%"}}
            >
                <span className="flex-1 w-[2px] bg-secondary/80"></span>
                <SeparatorVertical
                    className="relative z-[1] rounded-full bg-black/50 border-2 border-secondary p-2"
                    size={46} strokeWidth={1.5}
                />
                <span className="flex-1 w-[2px] bg-secondary/80"></span>
            </div>
        </div>
    );
}

ImageComparison.propTypes = {
    beforeImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired
    }).isRequired,
    afterImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string
}

export default ImageComparison;