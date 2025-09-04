import { useEffect } from "react";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import FormCreateNewWarehouses from "../../organisms/warehouses/FormCreateNewWarehouses";

const WarehouseCreateTemplate = () => {
  // Set variable --background-color in white
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      "white"
    );

    return () => {
      document.documentElement.style.setProperty(
        "--background-color",
        "var(--background-color-original)"
      );
    };
  }, []);

  return (
    <>
      <HeaderActionBack title="Agregar Bodega" />
      <FormCreateNewWarehouses />
    </>
  );
};

export default WarehouseCreateTemplate;