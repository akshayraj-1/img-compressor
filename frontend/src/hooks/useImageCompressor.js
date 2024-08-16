import axios from "axios";
import PropTypes from "prop-types";

function useImageCompressor() {

    const API_URL = import.meta.env.VITE_COMPRESSOR_API_URL;
    const API_KEY = import.meta.env.VITE_COMPRESSOR_API_KEY;

    const compress = async (files, quality = 70, onProgress = () => {}) => {
        try {
            const formData = new FormData();
            formData.append("key", API_KEY);
            formData.append("quality", quality);

            Array.from(files).forEach((file, idx) => {
                formData.append(`files[${idx}]`, file);
            });

            Array.from({length: files.length}).fill(quality).forEach((q, idx) => {
                formData.append(`quality[${idx}]`, q);
            });

            const response = await axios.post(
                API_URL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentCompleted);
                    },
                });
            return await response.data;
        } catch (e) {
            return e.response?.data;
        }
    };

    compress.prototype = {
        files: PropTypes.arrayOf(PropTypes.object).isRequired,
        quality: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
        onProgress: PropTypes.func
    }

    return { compress };
}

export default useImageCompressor;