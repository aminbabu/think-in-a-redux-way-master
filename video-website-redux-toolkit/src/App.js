import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import VideoDescription from "./pages/VideoDescription";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/videos/:videoId" element={<VideoDescription />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
