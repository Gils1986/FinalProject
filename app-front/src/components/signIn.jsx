import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const SignIn = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login, user } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().min(6).max(255).required().label("Password"),
    }),

    async onSubmit(values) {
      try {
        await login(values);
        toast.success(`${values.email} Signed up successfully`, toastStyle);
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title={"Sign In"} description={"Sign In"} />
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
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
          type={"password"}
          label={"Password"}
          required
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
