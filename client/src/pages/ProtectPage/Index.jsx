import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";
import { use } from "react";
const Index = (children) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default Index;
