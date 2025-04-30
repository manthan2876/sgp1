import { toast } from "react-toastify";

export const showErrorNotification = (message) => {
  toast.error(message, {
    position: "top-right", // Ensure this is set correctly
    autoClose: 5000, // Toast duration
    hideProgressBar: false, // Optional
    closeOnClick: true, // Optional
    pauseOnHover: true, // Optional
    draggable: true, // Optional
    progress: undefined, // Optional
  });
};

export default showErrorNotification;
