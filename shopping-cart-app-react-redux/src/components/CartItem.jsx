import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantityInCart,
  increaseQuantityInCart,
  removeFromCart,
} from "../redux/cartSlice/creators";
import {
  decreaseQuantity,
  increaseQuantity,
  resetQuantity,
} from "../redux/productSlice/creators";

export default function CartItem({ cartProduct }) {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const product = products.find((item) => item.id === cartProduct.id);

  const handleClickIncrement = (e, id) => {
    e.preventDefault();
    const increaseBy = 1;

    dispatch(increaseQuantityInCart(id, product.quantity, increaseBy));
    dispatch(decreaseQuantity(id, cartProduct.quantity, increaseBy));
  };

  const handleClickDecrement = (e, id) => {
    e.preventDefault();
    const decreaseBy = 1;

    dispatch(decreaseQuantityInCart(id, product.quantity, decreaseBy));
    dispatch(increaseQuantity(id, cartProduct.quantity, decreaseBy));
  };

  const handleClickRemove = (e, id) => {
    e.preventDefault();

    console.log(id, cartProduct.quantity);

    dispatch(removeFromCart(id));
    dispatch(resetQuantity(id, cartProduct.quantity));
  };

  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        <img
          className="lws-cartImage"
          src={cartProduct.imgURL}
          alt={cartProduct.title}
          title={cartProduct.title}
        />
        <div className="space-y-2">
          <h4 className="lws-cartName">{cartProduct.title}</h4>
          <p className="lws-cartCategory">{cartProduct.category}</p>
          <p>
            BDT <span className="lws-cartPrice">{cartProduct.price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="lws-incrementQuantity"
            onClick={(e) => {
              handleClickIncrement(e, cartProduct.id);
            }}
            disabled={
              cartProduct.quantity >= cartProduct.quantity + product.quantity
            }
          >
            <i className="text-lg fa-solid fa-plus"></i>
          </button>
          <span className="lws-cartQuantity">{cartProduct.quantity}</span>
          <button
            type="button"
            className="lws-decrementQuantity"
            onClick={(e) => {
              handleClickDecrement(e, cartProduct.id);
            }}
            disabled={cartProduct.quantity <= 1}
          >
            <i className="text-lg fa-solid fa-minus"></i>
          </button>
        </div>
        <p className="text-lg font-bold">
          BDT{" "}
          <span className="lws-calculatedPrice">
            {cartProduct.price * cartProduct.quantity}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button
          className="lws-removeFromCart"
          onClick={(e) => {
            handleClickRemove(e, cartProduct.id);
          }}
        >
          <i className="text-lg text-red-400 fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
