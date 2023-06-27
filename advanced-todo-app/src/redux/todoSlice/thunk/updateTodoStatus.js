import { toggleTodo } from "../ceators";

const updateTodoStatus = (todoID, todoStatus) => {
  return async (dispatch, getState) => {
    const response = await fetch(`http://localhost:9000/todos/${todoID}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !todoStatus,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const todo = await response.json();

    dispatch(toggleTodo(todo.id));
  };
};

export default updateTodoStatus;
