import PropTypes from "prop-types";

function ImageItem({ image, title, originalSize, compressedSize, className }) {
    return (
        <div className="flex gap-3 items-center w-full sm:w-[70vw] px-5">
            <img src={image} alt="" />
            <div>
                <span>{title}</span>
                <span>{originalSize}</span>
            </div>
        </div>
    );
}

ImageItem.prototype = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    originalSize: PropTypes.string.isRequired,
    compressedSize: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default ImageItem;