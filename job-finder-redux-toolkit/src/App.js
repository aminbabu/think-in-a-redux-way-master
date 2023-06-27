import React from "react";
import JobBoard from "./components/JobBoard";
import JobForm from "./components/JobForm";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<JobBoard />} />
          <Route path="/create" element={<JobForm />} />
          <Route path="/edit/:jobId" element={<JobForm />} />
          <Route path="/jobs/" element={<JobBoard />}>
            <Route path="internship" element={<JobBoard />} />
            <Route path="fulltime" element={<JobBoard />} />
            <Route path="remote" element={<JobBoard />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
