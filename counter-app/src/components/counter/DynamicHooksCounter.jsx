import Count from "./Count";
import Button from "../Button";
import {
  dynamicIncrementCreator,
  dynamicDecrementCreator,
} from "../../redux/dynamicCounter/creators";
import { useDispatch, useSelector } from "react-redux";

const DynamicCounter = () => {
  const count = useSelector((state) => state.dynamicCounter.payload);
  const dispatch = useDispatch();

  const incrementHandler = (value) => {
    dispatch(dynamicIncrementCreator(value));
  };

  const decrementHandler = (value) => {
    dispatch(dynamicDecrementCreator(value));
  };

  return (
    <div className="shadow-xl shadow-state-200 rounded-lg w-96 max-w-full">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Dynamic Counter
        </h1>
        <Count>{count}</Count>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            styles="bg-slate-500 text-white shadow-lg shadow-slate-200"
            handler={() => decrementHandler(2)}
          >
            Decrement
          </Button>
          <Button
            type="button"
            styles="bg-emerald-500 text-white shadow-lg shadow-emerald-200"
            handler={() => incrementHandler(5)}
          >
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicCounter;
