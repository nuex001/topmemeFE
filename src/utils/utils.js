import { toast } from "react-toastify";
import axios from 'axios';


export const successMsg = (e) =>
    toast(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "dark",
    });
export const errorMsgs = (e) =>
    toast(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "dark",
    });

export const selectStyle = {
    control: (base, state) => ({
        ...base,
        border: "none",
        boxShadow: "var(--bxShadow)",
        backgroundColor: 'var(--bg)',
        height: "50px",
        fontSize: "1.4em",
        '&:hover': {
            border: '1none',
            backgroundColor: 'var(--bg)',
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--bg)', // Background color for the menu (options list)
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--text)', // Text color for the selected input
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'var(--text)', // Text color
        backgroundColor: 'transparent',
        border: "none",
        fontSize: "1.4em",
        cursor: "pointer",
    }), //for the main option

}


export function truncateMiddle(str, startChars =5, endChars =5, ellipsis = '...') {
    if (str.length > (startChars + endChars)) {
        return str.substring(0, startChars) + ellipsis + str.substring(str.length - endChars);
    } else {
        return str;
    }
}

export function shortenNumber(num) {
    // Check if the number is greater than or equal to 1 billion
    if (!num) {
        return "";
    }
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'b';
    }
    // Check if the number is greater than or equal to 1 million
    else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'm';
    }
    // Check if the number is greater than or equal to 1 thousand
    else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'k';
    }
    // Otherwise, return the number as is
    else {
        return num.toString();
    }
}

export function roundToThreeDecimalPlaces(number) {
    return parseFloat(number.toFixed(5));
}
