import {useCallback, useEffect, useState} from "react";
import ToastModal from "../components/Modals/ToastModal.jsx";

function useCustomToast() {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");

    const showToast = useCallback((message, type = "error") => {
        setToastType(type);
        setToastMessage(message);
        setToastVisible(true);
    }, []);

    const CustomToastModal = () => {
        return (
            <ToastModal showToast={toastVisible} message={toastMessage} type={toastType} />
        );
    };

    useEffect(() => {
        let timer;
        if (toastVisible) {
            timer = setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [toastVisible]);

    return { CustomToastModal, showToast };

}


export default useCustomToast;