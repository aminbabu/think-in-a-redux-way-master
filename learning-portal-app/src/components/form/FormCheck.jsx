const FormCheck = ({
  children,
  name = "",
  type = "checkbox",
  className = "",
  ...attributes
}) => {
  return (
    <label htmlFor={name} className="flex gap-3">
      <input
        type={type}
        className={`appearance-none flex-shrink-0 w-3.5 h-3.5 bg-slate-800 outline-none rounded-sm mt-1 transition-all duration-200 ease-in ring-1 ring-slate-400 ring-opacity-60 checked:bg-violet-600 checked:ring-2 checked:ring-violet-600 checked:ring-opacity-100 cursor-pointer ${className}`}
        name={name}
        id={name}
        {...attributes}
      />
      {children && <span className="block text-slate-50">{children}</span>}
    </label>
  );
};

export default FormCheck;
