import { useEffect } from "react";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import FormCreateNewInventoryWarehouse from "../../organisms/inventory/FormCreateNewInventoryWarehouse";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setListItemByInventory } from "../../../features/InventorySlice";
import type { IOption } from "../../../interface/GenInterface";
import type { IItem } from "../../../interface/ItemInterface";
import LineButtonSaveInventoryMovements from "../../molecules/inventory/LineButtonSaveInventoryMovements";
import type { IInventoryGrouped } from "../../../interface/InventoryInterface";
import { useParams } from "react-router-dom";

const InventoryCreateTemplate = ({ typeMovement }: {
  typeMovement: 'entrada' | 'salida';
}) => {
  const { warehouse_id } = useParams();

  const dispatch = useAppDispatch();

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
    // Relizar carga de datos segun el tipo de movimiento
    if (typeMovement === 'entrada') {
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
    }

    else if (typeMovement === 'salida') {
      axiosPrivate.get(`/inventory/grouped/${warehouse_id}`)
        .then(a => {
          const listOptions: IOption[] = a.data.map((e: IInventoryGrouped) => {
            return {
              label: e.item_name,
              value: e.item_id,

              // Añadir propiedades adicionales si es necesario
              total_quantity: e.total_quantity,
              last_sale_price: e.last_sale_price,
              last_purchase_price: e.last_purchase_price,
            }
          })

          dispatch(setListItemByInventory(listOptions));
        });
    }
  }, []);

  return (
    <>
      <HeaderActionBack title="Administrar inventario" />
      <FormCreateNewInventoryWarehouse typeMovement={typeMovement} />
      <LineButtonSaveInventoryMovements typeMovement={typeMovement} />
    </>
  );
};

export default InventoryCreateTemplate;