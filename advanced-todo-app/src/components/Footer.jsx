import { useDispatch, useSelector } from "react-redux";
import { changePriorities, changeStatus } from "../redux/filterSlice/creators";

const remainingTaks = (numberOfTodos) => {
  switch (numberOfTodos) {
    case 0:
      return "No Task Left";

    case 1:
      return `${numberOfTodos} Task Left`;

    default:
      return `${numberOfTodos} Tasks Left`;
  }
};

const Footer = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const { status, priorities } = useSelector((state) => state.todoFilters);

  const remainingTodos = todos.filter((todo) => !todo?.completed).length;

  const handleClick = (status) => {
    dispatch(changeStatus(status));
  };

  const handleChangePriority = (priority) => {
    if (!priorities?.includes(priority)) {
      dispatch(changePriorities(priority, "selected"));
      return;
    }
    dispatch(changePriorities(priority, "removed"));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{remainingTaks(remainingTodos)}</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "*" ? "font-bold" : ""}`}
          onClick={() => handleClick("*")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            status === "incomplete" ? "font-bold" : ""
          }`}
          onClick={() => handleClick("incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            status === "complete" ? "font-bold" : ""
          }`}
          onClick={() => handleClick("complete")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            priorities?.includes("not important") ? "bg-green-500" : ""
          }`}
          onClick={() => handleChangePriority("not important")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            priorities?.includes("important") ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleChangePriority("important")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            priorities?.includes("urgent") ? "bg-red-500" : ""
          }`}
          onClick={() => handleChangePriority("urgent")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
