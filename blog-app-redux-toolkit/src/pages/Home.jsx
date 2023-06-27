import React from "react";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <>
      <section className="wrapper">
        <Sidebar />
        <PostList />
      </section>
    </>
  );
};

export default Home;
