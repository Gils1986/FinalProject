import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const SignOut = ({ redirect = "/" }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate(redirect);
  }, [logout, navigate, redirect]);

  return null;
};

export default SignOut;
