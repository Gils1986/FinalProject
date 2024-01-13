import { useEffect, useState } from "react";
import productService from "../services/productService";
import { useAuth } from "../context/auth.context";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      const { data } = user
        ? await productService.getAllProducts()
        : await productService.getAllProductsForGuest();
      setProducts(data);
    };
    getProducts();
  }, [user]);

  return products;
};

export default useGetProducts;
