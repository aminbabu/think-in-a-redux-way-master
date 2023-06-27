import Count from "./Count";
import Button from "../Button";
import { connect } from "react-redux";
import {
  decrementCreator,
  incrementCreator,
} from "../../redux/counter/creators";

const Counter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="shadow-xl shadow-state-200 rounded-lg w-96 max-w-full">
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">Counter</h1>
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
const mapStateToProps = ({ payload }, ownProps) => {
  console.log(ownProps, payload);

  return {
    count: payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: (value) => {
      dispatch(incrementCreator(value));
    },
    onDecrement: (value) => {
      dispatch(decrementCreator(value));
    },
  };
};

// connect with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
