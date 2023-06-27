import { createTodo } from "../ceators";

const addToDo = (todoText) => {
  return async (dispatch, getState) => {
    const response = await fetch("http://localhost:9000/todos", {
      method: "POST",
      body: JSON.stringify({
        text: todoText,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const todo = await response.json();

    dispatch(createTodo(todo.text));
  };
};

export default addToDo;
