import React, { createContext, useContext, useState } from "react";
import ToastAlert from "../helpers/ToastAlert";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const showCustomToast = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const hideToast = () => setShowToast(false);

  return (
    <ToastContext.Provider value={{ showCustomToast }}>
      {children}
      <ToastAlert
        show={showToast}
        onClose={hideToast}
        message={toastMessage}
        variant={toastVariant}
      />
    </ToastContext.Provider>
  );
};