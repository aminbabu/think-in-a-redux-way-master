import React from "react";

const Pagination = () => {
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-1 rounded-full"
        >
          1
        </button>
        <button
          type="button"
          className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full"
        >
          2
        </button>
        <button
          type="button"
          className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full"
        >
          3
        </button>
        <button
          type="button"
          className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full"
        >
          4
        </button>
      </div>
    </section>
  );
};

export default Pagination;
