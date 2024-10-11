import {useEffect, useState} from "react";
import cn from "../utils/cn.util.js";
import {AnimatePresence, motion} from "framer-motion";
import {CheckCheck, CircleAlert} from "lucide-react";
import PropTypes from "prop-types";

const variants = {
    initial: {
        y: 200,
        opacity: 0,
    },
    final: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.9,
            ease: "anticipate",
        },
    },
    exit: {
        y: 200,
        opacity: 0,
        transition: {
            duration: 0.9,
            ease: "anticipate",
        }
    }
};

function useCustomToast() {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");

    const styles = {
        parent: cn("absolute z-[50] bottom-5 sm:bottom-10 flex justify-center w-screen px-5 select-none"),
        body: cn("relative flex gap-2 items-center bg-surface w-full sm:w-fit px-5 py-3 rounded-md shadow-md", toastType === "error" ? "bg-red-500" : "bg-green-500"),
        message: cn("sm:text-[0.8rem] text-sm", toastType === "error" || toastType === "success" ? "text-white" : "text-primary"),
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

    const showToast = (message, type = "error") => {
        setToastType(type);
        setToastMessage(message);
        setToastVisible(true);
    };

    const CustomToastModal = () => {
        return (
            <AnimatePresence mode="wait">
                {
                    toastVisible &&
                    <div className={styles.parent}>
                        <motion.div variants={variants} initial="initial" animate="final" exit="exit"
                                    className={styles.body}>
                            {toastType === "error" ? <CircleAlert size={13} className={styles.message}/> :
                                <CheckCheck size={13} className={styles.message}/>}
                            <p className={styles.message}>{toastMessage}</p>
                        </motion.div>
                    </div>
                }
            </AnimatePresence>
        );
    };

    showToast.propTypes = {
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["error", "success", "normal"]),
    };

    return {CustomToastModal, showToast};

}


export default useCustomToast;