const FormControl = ({
  label = undefined,
  name = "",
  type = "text",
  className = "",
  required,
  ...attributes
}) => {
  return (
    <label htmlFor={name}>
      {label && (
        <span className="block text-slate-50/60 text-sm font-semibold mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <input
        type={type}
        className={`appearance-none w-full block bg-slate-800 text-sm md:text-base text-slate-50 px-4 py-2 outline-none transition-all duration-200 ease-in ring-1 ring-slate-700 ring-opacity-60 focus:ring-2 focus:ring-violet-600 focus:ring-opacity-100 placeholder:text-slate-500 focus:relative ${className}`}
        name={name}
        id={name}
        required={required}
        {...attributes}
      />
    </label>
  );
};

export default FormControl;
