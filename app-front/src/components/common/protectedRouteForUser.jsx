import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRouteForUser = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

export default ProtectedRouteForUser;
