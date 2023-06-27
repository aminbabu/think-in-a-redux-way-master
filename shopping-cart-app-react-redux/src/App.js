import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

function App() {
  const [isHome, setIsHome] = useState(true);

  const handleRoute = (e, page) => {
    e.preventDefault();
    if (page !== "home") {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  };

  return (
    <Provider store={store}>
      <Navbar handler={handleRoute} />
      {isHome ? <Home /> : <Cart />}
    </Provider>
  );
}

export default App;
