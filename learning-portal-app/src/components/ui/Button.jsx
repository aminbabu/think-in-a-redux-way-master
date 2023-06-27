const Button = ({
  type = "button",
  className = "",
  children,
  ...attributes
}) => {
  return (
    <button
      type={type}
      className={`inline-flex gap-1 items-center justify-center text-center p-2 sm:px-4 cursor-pointer text-sm md:text-base font-semibold transition-all duration-150 active:scale-105 disabled:bg-slate-600/50 disabled:text-slate-100/25 disabled:fill-slate-100/25 disabled:cursor-not-allowed disabled:border-slate-600/50 ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
