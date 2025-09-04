import { useState } from "react";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import { useLocalStorage } from "../../../hook/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../../services/AxiosInstance";

const LineButtonSaveInventoryMovements = ({ typeMovement }: { typeMovement: 'entrada' | 'salida' }) => {
  const navigate = useNavigate();
  const { warehouse_id } = useParams();

  const [disabled, setDisabled] = useState(false);
  const { value, removeValue } =
    useLocalStorage<IInventoryMovements[]>("list_item", [], true);
  
  const isValidForm = () => {
    // Revisar el formulario
    // Si es typeMovement "salida" revisar que se asigne una descripcion
    if (typeMovement === "salida") {
      const inputDescription = document.getElementById("name") as HTMLInputElement;
      if (inputDescription && inputDescription.value.trim() === "") {
        alert("Por favor, agrega una descripción.");
        setDisabled(false);
        return false;
      }
    }

    if (value.length === 0) {
      alert("Agrega al menos un producto.");
      setDisabled(false);
      return;
    }


    return true;
  }
  
  const handleSave = async () => {
    setDisabled(true);
    if (!isValidForm()) {
      setDisabled(false);
      return;
    }

    if (typeMovement === "entrada")
      handleSaveIn();
    
    else if (typeMovement === "salida")
      handleSaveOut();
  };

  const handleSaveIn = async () => {
    // Guardar los cambios
    const listItem = value.map((item) => ({
      warehouse_id,
      item_id: item.item_id,
      quantity: item.quantity,
      purchase_price: item.purchase_price,
      sale_price: item.sale_price,
    }));


    if (listItem.filter(a => a.item_id != 0).length == 0) {
      setDisabled(false);
      return;
    }

    const inputDescription = document.getElementById("name") as HTMLInputElement;

    const itemMovementGroup = await axiosPrivate.post("/item-movement-groups/", { note: inputDescription.value, warehouse_id: parseInt(warehouse_id || "0") });
    const listItemWithMovementType = listItem.map((item) => ({
      target_warehouse_id: warehouse_id,
      item_id: item.item_id,
      quantity: item.quantity,
      type: "entrada",
      purchase_price: item.purchase_price,
      sale_price: item.sale_price,
      item_movement_group_id: itemMovementGroup.data.id,
    }));


    await axiosPrivate.post("/movements/bulk", { items: listItemWithMovementType });
    await axiosPrivate.post("/inventory/rebuild-inventory");

    alert("Movimientos guardados correctamente.");
    navigate(-1);

    removeValue(); // Limpiar el localStorage
    setDisabled(false);
  };

  const handleSaveOut = async () => {
    const inputDescription = document.getElementById("name") as HTMLInputElement;
    
    const saleGroups = await axiosPrivate.post("/sale-groups", { note: inputDescription.value, warehouse_id: parseInt(warehouse_id || "0") });
    const saleGroupId = saleGroups.data.id;

    const listSales = value.map((item) => ({
      sale_group_id: saleGroupId,
      item_id: item.item_id,
      warehouse_id: parseInt(warehouse_id || "0"),
      quantity: item.quantity,
      sale_price: item.sale_price,
      paid: item.paid == 0 ? false : true,
    }));


    try {
      await axiosPrivate.post("/sales/bulk", listSales);
      await axiosPrivate.post("/inventory/rebuild-inventory");
  
      alert("Ventas guardadas correctamente.");
      navigate(-1);
      removeValue(); // Limpiar el localStorage
      setDisabled(false);
    } catch (error) {
      console.error("Error al guardar las ventas:", error);
      alert("Ocurrió un error al guardar las ventas. Por favor, inténtalo de nuevo.");
      setDisabled(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={disabled}
      className="flex w-[94%] items-center justify-center rounded-lg m-3 h-12 px-5 bg-[var(--primary-color)] text-white text-base font-semibold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
      <span className="material-icons mr-2">save</span>
      Guardar movimiento
    </button>
  );
};

export default LineButtonSaveInventoryMovements;