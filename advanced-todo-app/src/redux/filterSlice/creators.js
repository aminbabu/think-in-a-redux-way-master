import { CHANGEDSTATUS, CHANGEDPRIORITIES } from "./identifiers";

export const changeStatus = (status) => {
  return {
    type: CHANGEDSTATUS,
    payload: {
      status,
    },
  };
};

export const changePriorities = (priority, priorityType) => {
  return {
    type: CHANGEDPRIORITIES,
    payload: {
      priority,
      priorityType,
    },
  };
};
