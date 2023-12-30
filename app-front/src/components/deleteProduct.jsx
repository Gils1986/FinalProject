import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteProduct = async () => {
      await productService.deleteProduct(id);
      navigate("/");
    };
    deleteProduct();
  }, [id, navigate]);

  return null;
};

export default DeleteProduct;
