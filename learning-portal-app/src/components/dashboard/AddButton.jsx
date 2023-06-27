import Button from "components/ui/Button";

const AddButton = ({ children, ...attributes }) => {
  return (
    <div className="mb-4 text-end">
      <Button
        className="md:text-sm border rounded-full transition-all duration-300 bg-violet-600 border-violet-600 hover:bg-violet-700 hover:border-violet-700 fill-white"
        {...attributes}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="sm:-ml-1 md:-ml-1.5 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-150"
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
        </svg>
        <span className="hidden sm:inline-block">{children}</span>
      </Button>
    </div>
  );
};

export default AddButton;
