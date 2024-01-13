import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const CreateProduct = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
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
      productImage: Joi.string().min(11).max(1024).allow("").label("Image"),
    }),

    async onSubmit(values) {
      try {
        const { productImage, ...body } = values;
        if (productImage) {
          body.productImage = productImage;
        }
        await productService.createProduct(body);
        toast.success(`Product ${body.productName} created`, toastStyle);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title={"Create Product"} description={"Create Product"} />
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
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
