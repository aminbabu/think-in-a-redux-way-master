const Option = ({ name = "quiz", className = "", children, ...attibures }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        id={name}
        hidden
        className="peer/quiz"
        {...attibures}
      />
      <label
        htmlFor={name}
        className={`h-full flex items-center gap-3 md:gap-4 rounded border border-slate-600 border-opacity-50 bg-slate-800 p-3 md:p-4 font-medium transition-colors duration-200 cursor-pointer peer-checked/quiz:bg-violet-600 peer-checked/quiz:border-violet-600 peer-checked/quiz:border-opacity-100 ${className}`}
      >
        {children}
      </label>
    </div>
  );
};

export default Option;
