import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice/creators";
import { decreaseQuantity } from "../redux/productSlice/creators";

export default function ProductItem({ product }) {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { id, title, category, price, quantity, imgURL } = product;
  const cartProduct = cartProducts.find((item) => item.id === id);

  const handleClick = (product) => {
    const numberOfItems = 1;

    if (cartProduct?.id !== id) {
      dispatch(addToCart(product, numberOfItems, "new"));
    } else {
      dispatch(addToCart(cartProduct, numberOfItems, "existing"));
    }

    dispatch(
      decreaseQuantity(
        id,
        cartProduct?.quantity ? cartProduct.quantity : 0,
        numberOfItems
      )
    );
  };

  return (
    <div className="lws-productCard">
      <img
        className="lws-productImage"
        src={imgURL}
        alt={title}
        title={title}
      />
      <div className="p-4 space-y-2">
        <h4 className="lws-productName">{title}</h4>
        <p className="lws-productCategory">{category}</p>
        <div className="flex items-center justify-between pb-2">
          <p className="productPrice">
            BDT <span className="lws-price">{price}</span>
          </p>
          <p className="productQuantity">
            {quantity ? (
              <span className="lws-quantity">QTY {quantity}</span>
            ) : (
              <span className="lws-quantity text-red-400">Out of Stock</span>
            )}
          </p>
        </div>
        <button
          type="button"
          className="lws-btnAddToCart"
          onClick={() => handleClick(product)}
          disabled={!quantity}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
