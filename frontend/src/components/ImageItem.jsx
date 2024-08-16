import PropTypes from "prop-types";
import {DownloadCloud, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import CircularLoader from "./Loaders/CircularLoader/CircularLoader.jsx";
import cn from "../utils/cn.util.js";

function ImageItem({ id, state = "compressing", imageSrc, title, originalSize, compressedSize, onDelete, className }) {

    const [currentState, setCurrentState] = useState(state);

    useEffect(() => {
       setCurrentState(state);
    }, [state]);

    return (
        <div className="relative flex gap-3 items-center w-full px-5 py-1 bg-secondary">
            <div className="relative h-16 aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden">
                <img className="size-full object-cover" src={imageSrc} alt=""/>
                {
                    currentState === "compressing" && (
                        <CircularLoader className="absolute top-0 left-0 size-full bg-black/15"/>
                    )
                }
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <span className="font-medium text-[0.8rem] sm:text-[0.9rem] overflow-ellipsis line-clamp-2 break-all">{title}</span>
                <span className="font-normal text-[0.75rem] sm:text-sm text-textSecondary"><span className={cn(compressedSize && "line-through opacity-50")}>{originalSize}</span> {compressedSize}</span>
            </div>
            {
                currentState === "compressed" && (
                    <div className="flex items-center justify-end gap-4 flex-[0.85]">
                        <DownloadCloud className="bg-button text-white p-1.5 w-full sm:w-14 rounded-full cursor-pointer"
                                       size={30}
                                       strokeWidth={1.8}
                                       onClick={() => window.open(imageSrc, "_blank")}
                        />
                        <Trash2 className="text-textSecondary hover:text-red-500 w-full sm:w-auto cursor-pointer"
                                size={19}
                                strokeWidth={1.8}
                                onClick={() => onDelete(id)}
                        />
                    </div>
                )
            }
        </div>
    );
}

ImageItem.prototype = {
    id: PropTypes.string.isRequired,
    state: PropTypes.oneOf(["compressing", "compressed", "failed"]),
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    originalSize: PropTypes.string.isRequired,
    compressedSize: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default ImageItem;