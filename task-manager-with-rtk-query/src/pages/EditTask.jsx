import React from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/Form/TaskForm";
import Message from "../components/UI/Message";
import { useGetTaskQuery } from "../features/tasks/tasksAPI";

const EditTask = () => {
  const { taskId } = useParams();

  const { data, isLoading, isError, error } = useGetTaskQuery(taskId);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <Message className="success">Loading...</Message>;
  }

  if (!isLoading && isError) {
    content = <Message className="error">{error.error}</Message>;
  }

  if (!isLoading && !isError && data?.id) {
    content = (
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <TaskForm task={data} />
        </div>
      </main>
    );
  }

  return content;
};

export default EditTask;
