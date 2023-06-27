import noteIcon from "../assets/images/notes.png";
import doubleCheckIcon from "../assets/images/double-tick.png";
import plusIcon from "../assets/images/plus.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  clearCompletedTodo,
  completeAllTodo,
} from "../redux/todoSlice/ceators";
import addToDo from "../redux/todoSlice/thunk/addTodo";

const Header = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;

    setTodo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToDo(todo));
    setTodo("");
  };

  const handleCompleteAll = () => {
    dispatch(completeAllTodo());
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedTodo());
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src={noteIcon} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={todo}
          onChange={handleChange}
          required
        />
        {todo && (
          <button
            type="submit"
            className={`appearance-none w-8 h-8 bg-[url('${plusIcon}')] bg-no-repeat bg-contain`}
          ></button>
        )}
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={handleCompleteAll}
        >
          <img className="w-4 h-4" src={doubleCheckIcon} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleClearCompleted}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
