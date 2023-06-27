import React from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsAPI";
import ProjectLoader from "../UI/Loaders/ProjectLoader";
import Message from "../UI/Message";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const { data, isLoading, isError, error } = useGetProjectsQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <ProjectLoader />
        <ProjectLoader />
        <ProjectLoader />
        <ProjectLoader />
        <ProjectLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Message className="error">{error.error}</Message>;
  }

  if (!isLoading && !isError && data?.length === 0) {
    content = <Message className="error">There is no project found!</Message>;
  }

  if (!isLoading && !isError && data?.length) {
    content = data.map((project) => (
      <ProjectItem key={project.id} project={project} />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectList;
