import {  toast  } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {

        duration: 2000,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
export const handleError = (msg) => {
    toast.error(msg, {
        duration: 2000,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}