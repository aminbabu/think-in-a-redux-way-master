import Navbar from "./components/Navbar";
import Container from "./layouts/Container";
import BookList from "./components/BookList";
import NewBook from "./components/NewBook";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />

      <Container>
        <BookList />
        <NewBook />
      </Container>
    </Provider>
  );
}

export default App;
