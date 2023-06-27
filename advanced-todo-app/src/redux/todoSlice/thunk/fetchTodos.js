import { loadTodos } from "../ceators";

const fetchTodos = async (dispatch, getState) => {
  const response = await fetch("http://localhost:9000/todos");

  const data = await response.json();

  dispatch(loadTodos(data));
};

export default fetchTodos;
