import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../../features/projects/projectsAPI";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "../../features/tasks/tasksAPI";
import { useGetTeamQuery } from "../../features/team/teamAPI";
import Message from "../UI/Message";

const TaskForm = ({ task = {} }) => {
  const [
    addTask,
    {
      isLoading: isLoadingOnAddtask,
      isSuccess: isSuccessOnAddTask,
      isError: isErrorOnAddTask,
    },
  ] = useAddTaskMutation();
  const [
    editTask,
    {
      isLoading: isLoadingOnEditTask,
      isSuccess: isSuccessOnEditTask,
      isError: isErrorOnEditTask,
    },
  ] = useEditTaskMutation();
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();

  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [member, setMember] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editMode, setEditMode] = useState(false);

  const resetData = () => {
    setTaskName("");
    setMember("");
    setProjectName("");
    setDeadline("");
  };

  const handleSubmit = (e, actionType) => {
    e.preventDefault();

    const patch = {
      taskName,
      teamMember: team.find(
        (Teammember) =>
          Teammember?.name?.toLowerCase() === member?.toLowerCase()
      ),
      project: projects.find(
        (project) =>
          project?.projectName?.toLowerCase() === projectName?.toLowerCase()
      ),
      deadline,
      status: "pending",
    };

    if (actionType === "add") {
      addTask(patch);
      resetData();
    }

    if (actionType === "edit") {
      editTask({ id: task?.id, patch });
    }
  };

  useEffect(() => {
    if (isSuccessOnAddTask || isSuccessOnEditTask) {
      navigate("/");
    }

    if (task?.id) {
      setEditMode(true);
      setTaskName(task?.taskName);
      setMember(task?.teamMember?.name);
      setProjectName(task?.project?.projectName);
      setDeadline(task?.deadline);
    } else {
      setEditMode(false);
    }
  }, [isSuccessOnAddTask, isSuccessOnEditTask, navigate, task]);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) =>
        !editMode ? handleSubmit(e, "add") : handleSubmit(e, "edit")
      }
    >
      {(isLoadingOnAddtask || isLoadingOnEditTask) && (
        <Message>Loading...</Message>
      )}

      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="fieldContainer">
        <label>Assign To</label>
        <select
          name="teamMember"
          id="lws-teamMember"
          required
          value={member}
          onChange={(e) => setMember(e.target.value)}
        >
          <option hidden>Select Job</option>
          <option value="Sumit Saha">Sumit Saha</option>
          <option value="Saad Hasan">Saad Hasan</option>
          <option value="Akash Ahmed">Akash Ahmed</option>
          <option value="Md Salahuddin">Md Salahuddin</option>
          <option value="Riyadh Hassan">Riyadh Hassan</option>
          <option value="Ferdous Hassan">Ferdous Hassan</option>
          <option value="Arif Almas">Arif Almas</option>
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select
          id="lws-projectName"
          name="projectName"
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        >
          <option hidden>Select Project</option>
          <option value="Scoreboard">Scoreboard</option>
          <option value="Flight Booking">Flight Booking</option>
          <option value="Product Cart">Product Cart</option>
          <option value="Book Store">Book Store</option>
          <option value="Blog Application">Blog Application</option>
          <option value="Job Finder">Job Finder</option>
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          id="lws-deadline"
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="lws-submit"
          disabled={isLoadingOnAddtask || isLoadingOnEditTask}
        >
          Save
        </button>
      </div>
      {(isErrorOnAddTask || isErrorOnEditTask) && (
        <Message className="error">
          There was an error occored adding a task!
        </Message>
      )}
      {isSuccessOnAddTask && (
        <Message className="success">New task is added successfully!</Message>
      )}
      {isSuccessOnEditTask && (
        <Message className="success">Task is updated successfully!</Message>
      )}
    </form>
  );
};

export default TaskForm;
