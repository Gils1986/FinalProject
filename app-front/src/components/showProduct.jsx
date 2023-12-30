import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Product from "./Product";

const ShowProduct = () => {
  console.log("In  ShowCard: calling useParams()");
  const { id } = useParams();
  console.log("In  ShowCard: id=", id);
  const product = useProduct(id);
  console.log("In ShowCard: card=", product);
  return (
    <div>
      {!product ? <span>"no product"</span> : <Product product={product} />}
    </div>
  );
};

export default ShowProduct;
