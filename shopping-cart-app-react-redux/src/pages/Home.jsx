import { useSelector } from "react-redux";
import AddNewProduct from "../components/AddNewProduct";
import ProductItem from "../components/ProdouctItem";

export default function Home() {
  const products = useSelector((state) => state.product);

  return (
    <main className="py-16">
      <div className="productWrapper">
        <div className="productContainer" id="lws-productContainer">
          {products.length > 0
            ? products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            : "No products found!"}
        </div>
        <div>
          <AddNewProduct />
        </div>
      </div>
    </main>
  );
}
