import Count from "./Count";
import Button from "../Button";
import {
  decrementCreator,
  incrementCreator,
} from "../../redux/counter/creators";
import { useDispatch, useSelector } from "react-redux";

const ReduxHooksCounter = () => {
  const count = useSelector((state) => state.counter.payload);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(incrementCreator());
  };

  const decrementHandler = () => {
    dispatch(decrementCreator());
  };

  return (
    <div className="shadow-xl shadow-state-200 rounded-lg w-96 max-w-full">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Redux Hooks Counter
        </h1>
        <Count>{count}</Count>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            styles="bg-slate-500 text-white shadow-lg shadow-slate-200"
            handler={decrementHandler}
          >
            Decrement
          </Button>
          <Button
            type="button"
            styles="bg-emerald-500 text-white shadow-lg shadow-emerald-200"
            handler={incrementHandler}
          >
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReduxHooksCounter;
