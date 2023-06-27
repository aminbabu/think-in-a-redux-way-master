const ButtonLoader = ({ type = "button", className = "", ...attributes }) => {
  return (
    <button
      type={type}
      className={`inline-flex gap-1 items-center justify-center text-center p-2 sm:px-4 cursor-pointer fill-slate-100 text-slate-100/25 border rounded-full border-slate-500 ${className}`}
      {...attributes}
    >
      <span className="w-16 h-4 placeholder rounded-full"></span>
      <span className="w-4 h-4 placeholder rounded-full"></span>
    </button>
  );
};

export default ButtonLoader;
