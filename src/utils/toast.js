import { toast } from "react-toastify";

export const showToast = (text, type) => {
  const uniqueId = "toast-" + Date.now(); // unique each time
  // toast.dismiss(); // dismiss all (optional)
  if (type === "success") {
    return toast.success(text, {
      toastId: uniqueId,
    });
  } else if (type === "error") {
    return toast.error(text, {
      toastId: uniqueId,
    });
  } else if (type === "info") {
    return toast.info(text, {
      toastId: uniqueId,
    });
  }
};
