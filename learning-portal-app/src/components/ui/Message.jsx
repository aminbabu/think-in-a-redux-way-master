const Message = ({ className, children }) => {
  return (
    <span
      className={`px-3 py-2.5 text-sm font-semibold rounded-lg ${className}`}
    >
      {children}
    </span>
  );
};

export default Message;
