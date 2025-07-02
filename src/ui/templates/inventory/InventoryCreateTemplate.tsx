import { useEffect, useState } from "react";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import FormCreateNewInventoryWarehouse from "../../organisms/inventory/FormCreateNewInventoryWarehouse";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setListItemByInventory } from "../../../features/InventorySlice";
import type { IOption } from "../../../interface/GenInterface";
import type { IItem } from "../../../interface/ItemInterface";
import LineButtonSaveInventoryMovements from "../../molecules/inventory/LineButtonSaveInventoryMovements";

const InventoryCreateTemplate = () => {
  const dispatch = useAppDispatch();
  const [typeMovement, setTypeMovement] = useState<'entrada' | 'salida'>('entrada');

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

  // Cargar lista de items
  useEffect(() => {
    axiosPrivate.get("/items")
      .then(a => {
        const listOptions: IOption[] = a.data.map((e: IItem) => {
          return {
            label: e.name,
            value: e.id
          }
        })
        dispatch(setListItemByInventory(listOptions));
      });
  }, []);

  return (
    <>
      <HeaderActionBack title="Administrar inventario" />
      <FormCreateNewInventoryWarehouse typeMovement={typeMovement} setTypeMovement={setTypeMovement} />
      <LineButtonSaveInventoryMovements typeMovement={typeMovement} />
    </>
  );
};

export default InventoryCreateTemplate;