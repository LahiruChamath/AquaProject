import { Navigate } from "react-router-dom";
import { LOGIN_PATH } from "../components/constants";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to={LOGIN_PATH} />;
  }

  return children;
};

export default ProtectedRoute;
