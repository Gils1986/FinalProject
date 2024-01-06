import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteProduct = async () => {
      await productService.deleteProduct(id);
      toast.success("Product deleted", toastStyle);
      navigate("/");
    };
    deleteProduct();
  }, [id, navigate]);

  return null;
};

export default DeleteProduct;
