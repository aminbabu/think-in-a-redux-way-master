import Layout from "./layouts/Layout";
import Balance from "./components/Balance";
import ExpenseForm from "./components/ExpenseForm";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Layout>
      <Balance />
      <ExpenseForm />
      <Transactions />
    </Layout>
  );
}

export default App;
