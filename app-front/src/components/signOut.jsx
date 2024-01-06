import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import { toastStyle } from "../utils/toastify";

const SignOut = ({ redirect = "/" }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    logout();
    toast.success("Hope to see you again", toastStyle);
    navigate(redirect);
  }, [logout, navigate, redirect]);

  return null;
};

export default SignOut;
