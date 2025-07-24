import { ToastContainer, Toast } from "react-bootstrap";
const ToastAlert = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastAlert;