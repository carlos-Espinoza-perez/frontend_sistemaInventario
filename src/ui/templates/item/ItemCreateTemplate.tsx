import { useEffect } from "react";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import FormCreateNewItem from "../../organisms/items/FormCreateNewItem";

const ItemCreateTemplate = () => {
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
      <HeaderActionBack title="Agregar producto" />
      <FormCreateNewItem />
    </>
  );
};

export default ItemCreateTemplate;