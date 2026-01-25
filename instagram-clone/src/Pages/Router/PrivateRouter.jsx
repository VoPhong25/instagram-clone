import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { validateTokenAction } from "../../Redux/Auth/Action";

const PrivateRoute = ({ children }) => {
  const jwt = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { validateToken } = useSelector(store => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(validateTokenAction(jwt));
    }
  }, [jwt, dispatch]);

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  if (validateToken === null) {
    return null; 
  }

  if (validateToken === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
