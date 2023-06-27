const ModalFormLayout = ({ title, children }) => {
  return (
    <div className="modal-dialog-scrollable border border-gray-600/50 p-4 md:p-6 rounded">
      {title && (
        <h4 className="text-lg md:text-xl font-bold border-b border-b-gray-600/50 p-2 mb-6">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

export default ModalFormLayout;
