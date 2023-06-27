import { useDispatch } from "react-redux";
import cancelIcon from "../assets/images/cancel.png";
import {
  changePriorities,
  deleteTodo,
  toggleTodo,
} from "../redux/todoSlice/ceators";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const { id, text, completed, priority } = todo;

  const handleChange = (todoID) => {
    dispatch(toggleTodo(todoID));
  };

  const handleChangePriorities = (todoID, TodoPriority) => {
    dispatch(changePriorities(todoID, TodoPriority));
  };

  const handleClickRemove = (todoID) => {
    dispatch(deleteTodo(todoID));
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed ? "border-green-500 focus-within:border-green-500" : ""
        }`}
      >
        <input
          type="checkbox"
          className="opacity-0 absolute rounded-full cursor-pointer"
          checked={completed}
          onChange={() => handleChange(id)}
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 ${completed ? "line-through" : ""}`}>
        {text}
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${
          priority === "not important" && "bg-green-500"
        }`}
        onClick={() => handleChangePriorities(id, "not important")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${
          priority === "important" && "bg-yellow-500"
        }`}
        onClick={() => handleChangePriorities(id, "important")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${
          priority === "urgent" && "bg-red-500"
        }`}
        onClick={() => handleChangePriorities(id, "urgent")}
      ></div>

      <img
        src={cancelIcon}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleClickRemove(id)}
      />
    </div>
  );
};

export default TodoItem;
