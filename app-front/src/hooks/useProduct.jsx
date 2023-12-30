import { useEffect, useState } from "react";
import productService from "../services/productService";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await productService.getProduct(id);
      console.log("In useCard: data=", data);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  return product;
};

export default useProduct;
