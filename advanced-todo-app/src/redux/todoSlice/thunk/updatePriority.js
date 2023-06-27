import { changePriority } from "../ceators";

const updatePriority = (todoID, priority) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${todoID}`, {
      method: "PATCH",
      body: JSON.stringify({ priority }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const todo = await response.json();

    dispatch(changePriority(todo.id, todo.priority));
  };
};

export default updatePriority;
