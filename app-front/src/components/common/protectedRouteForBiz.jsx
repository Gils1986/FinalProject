import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRouteForBiz = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();

  if (!user || (onlyBiz && !user.biz)) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

export default ProtectedRouteForBiz;
