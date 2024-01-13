import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Product from "./Product";

const ShowProduct = () => {
  const { id } = useParams();
  const product = useProduct(id);

  return (
    <div>
      {!product ? <span>"no product"</span> : <Product product={product} />}
    </div>
  );
};

export default ShowProduct;
