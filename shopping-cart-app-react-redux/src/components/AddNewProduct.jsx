import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/productSlice/creators";

const productDesc = {
  title: "",
  category: "",
  imgURL: "",
  price: "",
  quantity: "",
};

export default function AddNewProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(productDesc);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value =
      target.name === "price" || target.name === "quantity"
        ? Number(target.value)
        : target.value;

    setProduct((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProduct(product));

    setProduct(productDesc);
  };

  const { title, category, imgURL, price, quantity } = product;

  return (
    <div className="formContainer">
      <h4 className="formTitle">Add New Product</h4>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-[#534F4F]"
        id="lws-addProductForm"
      >
        {/* product name */}
        <div className="space-y-2">
          <label htmlFor="lws-inputName">Product Name</label>
          <input
            className="addProductInput"
            type="text"
            id="lws-inputName"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        {/* product category */}
        <div className="space-y-2">
          <label htmlFor="lws-inputCategory">Category</label>
          <input
            className="addProductInput"
            type="text"
            id="lws-inputCategory"
            name="category"
            value={category}
            onChange={handleChange}
            required
          />
        </div>
        {/* product image url */}
        <div className="space-y-2">
          <label htmlFor="lws-inputImage">Image Url</label>
          <input
            className="addProductInput"
            type="text"
            id="lws-inputImage"
            name="imgURL"
            value={imgURL}
            onChange={handleChange}
            required
          />
        </div>
        {/* price & quantity container */}
        <div className="grid grid-cols-2 gap-8 pb-4">
          {/* price */}
          <div className="space-y-2">
            <label htmlFor="ws-inputPrice">Price</label>
            <input
              className="addProductInput"
              type="number"
              id="lws-inputPrice"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          {/* quantity */}
          <div className="space-y-2">
            <label htmlFor="lws-inputQuantity">Quantity</label>
            <input
              className="addProductInput"
              type="number"
              id="lws-inputQuantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* submit button */}
        <button type="submit" id="lws-inputSubmit" className="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
