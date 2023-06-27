import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import HooksCounter from "./components/counter/HooksCounter";
import DynamicHooksCounter from "./components/counter/DynamicHooksCounter";
import VariableCounter from "./components/counter/VariableCounter";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-wrap items-center justify-center content-center gap-4 p-2">
        <HooksCounter />
        <DynamicHooksCounter />
        <VariableCounter />
        <VariableCounter dynamic incrementBy={5} decrementBy={2} />
      </div>
    </Provider>
  );
}

export default App;
