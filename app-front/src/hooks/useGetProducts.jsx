import { useEffect, useState } from "react";
import userService from "../services/userService";
import productService from "../services/productService";
import { useAuth } from "../context/auth.context";

export const useGetProducts = (onlyFavorites = false) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let getProducts = () => {};
    if (onlyFavorites) {
      getProducts = async () => {
        const { data } = await userService.getFavoriteProducts();
        setProducts(data);
      };
    } else {
      getProducts = async () => {
        const { data } = user
          ? await productService.getAllProducts()
          : await productService.getAllProductsForGuest();
        setProducts(data);
      };
    }
    getProducts();
  }, [onlyFavorites, user]);

  return products;
};

export default useGetProducts;
