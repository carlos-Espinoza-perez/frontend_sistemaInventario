// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Footer from "../ui/atoms/gen/Footer";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
