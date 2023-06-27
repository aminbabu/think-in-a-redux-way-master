import { useSelector } from "react-redux";
import BillDetails from "../components/BillDetails";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cartProducts = useSelector((state) => state.cart);

  return (
    <main className="py-16">
      <div className="container 2xl:px-8 px-2 mx-auto">
        <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div className="cartListContainer">
          <div className="space-y-6">
            {cartProducts.length > 0
              ? cartProducts.map((product) => (
                  <CartItem key={product.id} cartProduct={product} />
                ))
              : "No product in cart!"}
          </div>
          <div>
            <BillDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
