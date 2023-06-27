import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const todoFilters = useSelector((state) => state.todoFilters);
  const { status, priorities } = todoFilters;

  const filterByStatus = (todo) => {
    switch (status) {
      case "complete":
        return todo?.completed;

      case "incomplete":
        return !todo?.completed;

      default:
        return true;
    }
  };

  const filterByPriority = (todo) => {
    return priorities.length ? priorities?.includes(todo?.priority) : true;
  };

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {todos
        .filter(filterByStatus)
        .filter(filterByPriority)
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default TodoList;
