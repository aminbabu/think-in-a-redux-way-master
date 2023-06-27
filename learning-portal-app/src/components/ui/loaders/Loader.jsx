const Loader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 grid place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="w-6 h-6 animate-spin fill-slate-500"
      >
        <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
      </svg>
    </div>
  );
};

export default Loader;
