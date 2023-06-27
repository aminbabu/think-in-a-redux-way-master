import { removeTodo } from "../ceators";

const deleteTodo = (todoID) => {
  return async (dispatch, getState) => {
    await fetch(`http://localhost:9000/todos/${todoID}`, {
      method: "DELETE",
    });

    dispatch(removeTodo(todoID));
  };
};

export default deleteTodo;
