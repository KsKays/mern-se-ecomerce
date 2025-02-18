import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const index = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return <div>loading.....</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};
export default index;