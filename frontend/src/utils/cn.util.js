import {twMerge} from "tailwind-merge";

function cn(...inputs) {
    return twMerge(inputs);
}

export default cn;