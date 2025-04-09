import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;
