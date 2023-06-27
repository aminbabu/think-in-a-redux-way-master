import { useRef } from "react";
import Button from "./Button";

const Modal = ({
  open = false,
  className = "",
  modalSize = "max-w-3xl",
  handleModalClose,
  hasCloseButton = true,
  children,
}) => {
  const backdropRef = useRef(null);

  // handle modal behaviour
  const handleModal = (e, actionType) => {
    if (e.target === backdropRef.current || actionType === "modalClosed") {
      if (typeof handleModalClose === "function") {
        handleModalClose();
      }
    }
  };

  return (
    <div
      className={`modal fixed inset-0 bg-slate-900/60 p-6 transition-all duration-300 grid place-items-center ${className} ${
        !open ? "hide" : "show"
      }`}
      onClick={handleModal}
      ref={backdropRef}
    >
      <div className={`relative w-full ${modalSize}`}>
        {hasCloseButton && (
          <Button
            className="absolute top-0 left-full -translate-x-1/2 -translate-y-1/2 bg-red-400 fill-white rounded-full !p-0 w-7 h-7 transition-colors duration-150 hover:bg-red-500"
            onClick={(e) => handleModal(e, "modalClosed")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </Button>
        )}
        <div className="w-full rounded-lg bg-slate-800 p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
