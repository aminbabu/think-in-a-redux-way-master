import React from "react";
import Filters from "../components/Books/Filters";
import BookList from "../components/Books/BookList";

const Home = () => {
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>
          <Filters />
        </div>
        <BookList />
      </div>
    </main>
  );
};

export default Home;
