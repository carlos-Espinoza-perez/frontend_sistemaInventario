import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { axiosPrivate } from "../services/AxiosInstance";

const PrivateRoute = () => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        await axiosPrivate.get("/auth/me");
        setIsAllowed(true);
      } catch {
        setIsAllowed(false);
      }
    };
    verifyAccess();
  }, []);

  if (isAllowed === null) return <div>Cargando...</div>;
  if (!isAllowed) return <Navigate to="/Login" replace />;

  return <Outlet />; // Renderiza las rutas hijas protegidas
};

export default PrivateRoute;
