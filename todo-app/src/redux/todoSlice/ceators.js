import {
  ADDED,
  COMPLETEDALL,
  CLEARCOMPLETED,
  DELETE,
  COMPLETEDTOGGLE,
  CHANGEDPRIORITY,
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

export const changePriorities = (id, priority) => {
  return {
    type: CHANGEDPRIORITY,
    payload: {
      id,
      priority,
    },
  };
};

export const deleteTodo = (id) => {
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
