import {
  ADDED,
  COMPLETEDALL,
  CLEARCOMPLETED,
  DELETE,
  COMPLETEDTOGGLE,
  CHANGEDPRIORITY,
  LOADED,
} from "./identifiers";

export const createTodo = (text) => {
  return {
    type: ADDED,
    payload: {
      text,
    },
  };
};

export const completeAllTodo = () => {
  return {
    type: COMPLETEDALL,
  };
};

export const clearCompletedTodo = () => {
  return {
    type: CLEARCOMPLETED,
  };
};

export const changePriority = (id, priority) => {
  return {
    type: CHANGEDPRIORITY,
    payload: {
      id,
      priority,
    },
  };
};

export const removeTodo = (id) => {
  return {
    type: DELETE,
    payload: {
      id,
    },
  };
};

export const toggleTodo = (id) => {
  return {
    type: COMPLETEDTOGGLE,
    payload: {
      id,
    },
  };
};

export const loadTodos = (todos) => {
  return {
    type: LOADED,
    payload: {
      todos,
    },
  };
};
