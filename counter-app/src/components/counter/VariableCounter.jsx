import Count from "./Count";
import Button from "../Button";
import { connect } from "react-redux";
import {
  decrementCreator,
  incrementCreator,
} from "../../redux/counter/creators";
import {
  dynamicIncrementCreator,
  dynamicDecrementCreator,
} from "../../redux/dynamicCounter/creators";

const Counter = ({ count, onIncrement, onDecrement, dynamic }) => {
  return (
    <div className="shadow-xl shadow-state-200 rounded-lg w-96 max-w-full">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {dynamic ? "Dynamic Variable Counter" : "Variable Counter"}
        </h1>
        <Count>{count}</Count>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            styles="bg-slate-500 text-white shadow-lg shadow-slate-200"
            handler={onDecrement}
          >
            Decrement
          </Button>
          <Button
            type="button"
            styles="bg-emerald-500 text-white shadow-lg shadow-emerald-200"
            handler={onIncrement}
          >
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
};

// convert state and dispatch method to props
const mapStateToProps = (state, { dynamic }) => {
  const payload = dynamic
    ? state.dynamicCounter.payload
    : state.counter.payload;

  return {
    count: payload,
  };
};

const mapDispatchToProps = (
  dispatch,
  { dynamic, incrementBy, decrementBy }
) => {
  return {
    onIncrement: () => {
      dynamic
        ? dispatch(dynamicIncrementCreator(incrementBy))
        : dispatch(incrementCreator());
    },
    onDecrement: () => {
      dynamic
        ? dispatch(dynamicDecrementCreator(decrementBy))
        : dispatch(decrementCreator());
    },
  };
};

// connect with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
