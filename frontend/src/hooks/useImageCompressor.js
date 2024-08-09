import axios from "axios";

function useImageCompressor() {

    const API_URL = import.meta.env.VITE_COMPRESSOR_API_URL;
    const API_KEY = import.meta.env.VITE_COMPRESSOR_API_KEY;

    const compress = async (files, quality = 75, onProgress = () => {}) => {
        try {
            const formData = new FormData();
            formData.append("apiKey", API_KEY);
            formData.append("quality", quality);

            Array.from(files).forEach((file) => {
               formData.append("images", file);
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
            console.log(e);
            throw e;
        }
    };

    return { compress };
}

export default useImageCompressor;