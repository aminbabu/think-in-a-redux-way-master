export default function Button({ type, id, classes, children, disabled }) {
  return (
    <button
      type={type ? type : "button"}
      className={`addCity ${classes ? classes : ""}`}
      id={id && id}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
