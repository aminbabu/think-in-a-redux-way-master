import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksAPI";
import TaskLoader from "../UI/Loaders/TaskLoader";
import Message from "../UI/Message";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { data = [], isLoading, isError, error } = useGetTasksQuery();
  const { projects, searchQuery } = useSelector((state) => state.filters);

  const filteredByProjectName = (task) =>
    projects
      .map((project) => project?.toLowerCase())
      ?.includes(task?.project?.projectName?.toLowerCase());

  const filteredBytaskName = (task) =>
    task?.taskName?.trim()?.toLowerCase()?.includes(searchQuery?.toLowerCase());

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <TaskLoader />
        <TaskLoader />
        <TaskLoader />
        <TaskLoader />
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
    content = data
      .filter(filteredByProjectName)
      .filter(filteredBytaskName)
      .map((task) => <TaskItem key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
};

export default TaskList;
