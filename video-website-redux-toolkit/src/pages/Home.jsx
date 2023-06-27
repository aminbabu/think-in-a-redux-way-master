import React from "react";
import Tags from "../components/Tags";
import VideoGrid from "../components/VideoGrid";
import Pagination from "../components/Pagination";

const Home = () => {
  return (
    <>
      <Tags />
      <VideoGrid />
      <Pagination />
    </>
  );
};

export default Home;
