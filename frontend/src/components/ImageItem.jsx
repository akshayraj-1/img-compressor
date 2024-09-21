import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {DownloadCloud, Trash2} from "lucide-react";
import cn from "../utils/cn.util.js";
import CircularLoader from "./Loaders/CircularLoader/CircularLoader.jsx";

const variants = {
    item: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "anticipate"
            }
        }
    },
    image: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    },
    currentSate: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        }
    }
}

// eslint-disable-next-line react/display-name
const ImageItem = React.memo(({id, state = "compressing", imageSrc, title, originalSize, compressedSize, downloadUrl, onDelete}) => {

    const [currentState, setCurrentState] = useState(state);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setCurrentState(state);
    }, [state]);

    return (
        <motion.div variants={variants.item} initial={currentState === "uploading" && "initial"} animate={currentState === "uploading" && "animate"} className="relative flex gap-3 items-center w-full px-5 py-1">
            <div className={cn("relative h-16 aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden bg-gray-100", isImageLoading && "animate-pulse")}>
                <motion.img variants={variants.image} initial={"initial"} animate={ isImageLoading ? "initial" : "animate"} onLoad={() => setIsImageLoading(false)} className="size-full object-cover" src={imageSrc} alt="" loading="lazy"/>
                {
                    (currentState === "compressing" || currentState === "uploading") && (
                        <CircularLoader className="absolute top-0 left-0 size-full bg-black/15"/>
                    )
                }
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <span
                    className="font-medium text-[0.8rem] sm:text-[0.9rem] overflow-ellipsis line-clamp-2 break-all">{title}</span>
                <span className="font-normal text-[0.75rem] sm:text-sm text-textSecondary"><span
                    className={cn(compressedSize && "line-through opacity-50")}>{originalSize}</span> {compressedSize}</span>
            </div>
            {
                currentState === "compressed" ? (
                        <motion.div variants={variants.currentSate} initial={"initial"} animate={"animate"} className="flex items-center justify-end gap-4">
                            <a href={downloadUrl} download={title}>
                                <DownloadCloud className="bg-button text-white p-2 sm:p-1.5 w-8 sm:w-14 rounded-full cursor-pointer"
                                               size={30}
                                               strokeWidth={1.8}
                                />
                            </a>
                            <Trash2 className="text-textSecondary hover:text-red-500 w-full sm:w-auto cursor-pointer"
                                    size={19}
                                    strokeWidth={1.8}
                                    onClick={() => onDelete(id)}
                            />
                        </motion.div>
                    )
                    : (
                        <motion.span variants={variants.currentSate} initial={"initial"} animate={"animate"} className={cn("min-w-16 text-center text-secondary px-1.5 py-[1.5px] text-[0.75rem] rounded capitalize", currentState === "failed" ? "bg-red-400" : currentState === "uploading" ? "bg-yellow-400" : "bg-accent")}>
                            {currentState}
                        </motion.span>
                    )

            }
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && prevProps.state === nextProps.state;
});

ImageItem.propTypes = {
    state: PropTypes.oneOf(["uploading", "compressing", "compressed", "failed"]),
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    originalSize: PropTypes.string.isRequired,
    compressedSize: PropTypes.string,
    downloadUrl: PropTypes.string,
    onDelete: PropTypes.func.isRequired
};

export default ImageItem;