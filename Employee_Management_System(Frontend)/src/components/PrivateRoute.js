import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const credentials = useSelector((state) => state.credentials);

  if (!credentials || Object.keys(credentials).length === 0) {
    // return <Navigate to="/login" replace />;
    navigate("/login");
  }

  return children;
};

export default PrivateRoute;
