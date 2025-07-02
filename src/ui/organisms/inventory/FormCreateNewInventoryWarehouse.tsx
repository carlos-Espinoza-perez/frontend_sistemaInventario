import ListItemToInventoryMovements from "./ListItemToInventoryMovements";
import { axiosPrivate } from "../../../services/AxiosInstance";
import type { IOption } from "../../../interface/GenInterface";
import type { IItem } from "../../../interface/ItemInterface";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setListItemByInventory } from "../../../features/InventorySlice";
import { useParams } from "react-router-dom";
import type { IInventoryGrouped } from "../../../interface/InventoryInterface";

const FormCreateNewInventoryWarehouse = ({ typeMovement, setTypeMovement }: { typeMovement: 'entrada' | 'salida'; setTypeMovement: (type: 'entrada' | 'salida') => void; }) => {
  const { warehouse_id } = useParams();

  const dispatch = useAppDispatch();

  const handleTypeMovementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeMovement(event.target.value as 'entrada' | 'salida');

    // Relizar carga de datos segun el tipo de movimiento
    if (event.target.value === 'entrada') {
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

    else if (event.target.value === 'salida') { 
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
  };

  return (
    <main className="p-4 space-y-6">
      <div>
        <h2 className="text-[var(--text-primary)] text-base font-medium leading-tight mb-2">Tipo de movimiento</h2>

        <div className="flex space-x-3">
          <label className="flex-1 text-sm font-medium leading-normal flex items-center justify-center rounded-lg border border-[var(--border-color)] px-4 h-12 text-[var(--text-primary)] has-[:checked]:border-2 has-[:checked]:border-[var(--primary-color)] has-[:checked]:bg-blue-50 relative cursor-pointer transition-all duration-200 ease-in-out">
            <input
              className="sr-only"
              name="movement_type"
              type="radio"
              value="entrada"
              checked={typeMovement === 'entrada'}
              onChange={handleTypeMovementChange}
            />
            Entrada
          </label>
          <label className="flex-1 text-sm font-medium leading-normal flex items-center justify-center rounded-lg border border-[var(--border-color)] px-4 h-12 text-[var(--text-primary)] has-[:checked]:border-2 has-[:checked]:border-[var(--primary-color)] has-[:checked]:bg-blue-50 relative cursor-pointer transition-all duration-200 ease-in-out">
            <input
              className="sr-only"
              name="movement_type"
              type="radio"
              value="salida"
              checked={typeMovement === 'salida'}
              onChange={handleTypeMovementChange}
            />
            Salida
          </label>
        </div>
      </div>


      <ListItemToInventoryMovements type={typeMovement} />
    </main>
  );
};

export default FormCreateNewInventoryWarehouse;