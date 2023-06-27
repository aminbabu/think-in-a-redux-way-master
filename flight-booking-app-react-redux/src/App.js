import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReserveFlight from "./components/ReserveFlight";
import Flights from "./components/Flights";

function App() {
  return (
    <Provider store={store}>
      {/* Navbar */}
      <Navbar />
      <section>
        {/* Flight reservation form */}
        <ReserveFlight />
        {/* Reserved flights */}
        <Flights />
      </section>
    </Provider>
  );
}

export default App;
