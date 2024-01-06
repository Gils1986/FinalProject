import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import CheckBox from "./checkbox";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const SignUp = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, createUser, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      name: "",
      password: "",
      biz: false,
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required().label("Name"),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .label("Password")
        .messages({
          "string.pattern.base": `The password must contain at least one uppercase letter, one lowercase
      letter, 4 numbers, 1 special character (!@%$#^&*) and a minimum of 8
      characters`,
        }),
      biz: Joi.boolean(),
    }),

    async onSubmit(values) {
      try {
        await createUser(values);
        await login({ email: values.email, password: values.password });
        toast.success(`${values.email} Signed up successfully`, toastStyle);
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
          return;
        }
        setError(null);
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title={"Sign Up"} description={"Sign Up"} />
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
          type={"email"}
          label={"Email"}
          required
        />
        <Input
          {...form.getFieldProps("name")}
          error={form.touched.name && form.errors.name}
          type={"text"}
          label={"Name"}
          required
        />
        <Input
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
          type={"password"}
          label={"Password"}
          required
        />
        <CheckBox
          {...form.getFieldProps("biz")}
          label="Sign up as Business user?"
          error={form.touched.biz && form.errors.biz}
        />
        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
export default SignUp;
