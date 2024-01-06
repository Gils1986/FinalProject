import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";
import useProduct from "../hooks/useProduct";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const EditProduct = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const product = useProduct(id);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      // productQuantity: "",
      productImage: "",
    },
    validate: formikValidateUsingJoi({
      productName: Joi.string().min(2).max(255).required().label("Name"),
      productDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      productPrice: Joi.number().min(1).max(99999).required().label("Price"),
      // productQuantity: Joi.number()
      //   .min(1)
      //   .max(999999)
      //   .required()
      //   .label("Quantity"),
      productImage: Joi.string().min(11).max(1024).allow("").label("Image"),
    }),

    async onSubmit(values) {
      try {
        const { productImage, ...body } = values;
        if (productImage) {
          body.productImage = productImage;
        }
        productService.updateProduct(id, body);
        toast.success(`Product ${body.productName} edited`, toastStyle);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!product) return;
    const {
      productName,
      productDescription,
      productPrice,
      // productQuantity,
      productImage,
    } = product;

    form.setValues({
      productName,
      productDescription,
      productPrice,
      // productQuantity,
      productImage,
    });
  }, [product]);

  return (
    <>
      <PageHeader title={"Edit Product"} description={"Edit Product"} />
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...form.getFieldProps("productName")}
          error={form.touched.productName && form.errors.productName}
          type="text"
          label="Name"
          required
        />
        <Input
          {...form.getFieldProps("productDescription")}
          error={
            form.touched.productDescription && form.errors.productDescription
          }
          type="text"
          label="Description"
          required
        />
        <Input
          {...form.getFieldProps("productPrice")}
          error={form.touched.productPrice && form.errors.productPrice}
          type="number"
          label="Price"
          required
        />
        {/* <Input
          {...form.getFieldProps("productQuantity")}
          error={form.touched.productQuantity && form.errors.productQuantity}
          type="number"
          label="Phone"
          required
        /> */}
        <Input
          {...form.getFieldProps("productImage")}
          error={form.touched.productImage && form.errors.productImage}
          type="text"
          label="Image"
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Edit Product
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
