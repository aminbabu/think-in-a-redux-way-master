export default function Button({ type, styles, children, handler }) {
  return (
    <button
      type={type ? type : "button"}
      className={`rounded-lg px-7 py-3 font-normal active:scale-95 duration-200 transition ease-in-out ${styles}`}
      onClick={handler}
    >
      {children}
    </button>
  );
}
