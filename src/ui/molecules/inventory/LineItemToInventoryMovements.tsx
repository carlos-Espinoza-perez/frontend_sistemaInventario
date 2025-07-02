import { useEffect, useState, type ChangeEvent } from "react";
import { useLocalStorage } from "../../../hook/useLocalStorage";
import type { IItem } from "../../../interface/ItemInterface";
import AnimatedSelect from "../gen/AnimatedSelect";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import type { IOption } from "../../../interface/GenInterface";
import { useAppSelector } from "../../../hook/useAppSelector";

const LineItemToInventoryMovements = ({ item, setRemoveItem, changeValue }: { item: IInventoryMovements, setRemoveItem: () => void; changeValue: (item: IInventoryMovements) => void; }) => {
  const listItemToInventory = useAppSelector(a => a.inventory.listItemByInventory);
  
  const requiredFields = ["item_id", "quantity"];
  const [tempValue, setTempValue] = useState<IInventoryMovements>(item);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTempValue({
      ...tempValue,
      [e.target.name]: e.target.value,
    });
  };

  const changeSelect = (value: IOption) => {
    setTempValue({
      ...tempValue,
      item_name: value.label,
      item_id: parseInt(value.value)
    })
  };

  const reviewTempValue = () => {
    const missingFields = requiredFields.filter((field: string) => !tempValue[field]);
    if (!missingFields) return;

    changeValue(tempValue);
  };

  useEffect(() => {
    reviewTempValue();
  }, [tempValue]);



  return (
    <div className="space-y-3">
      <div className="flex items-end space-x-2">
        <div className="flex-grow">
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="item-1">Producto</label>
          <div className="relative">
            <AnimatedSelect
              options={listItemToInventory}
              label="Seleccionar producto"
              change={changeSelect}
              defaultOptionValue={item.item_id.toString()}
            />
          </div>
        </div>
        <div className="w-24">
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="quantity-1">Cantidad</label>
          <input
            className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal"
            id={`quantity-${item.key}`}
            placeholder="Cant"
            type="number"

            defaultValue={item.quantity == 0 ? "" : item.quantity}
            onBlur={handleChange}
            name="quantity"
          />
        </div>
        <button
          onClick={setRemoveItem}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="purchase-price-1">Precio de compra</label>
          <input
            className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal"
            id={`purchase-price-${item.key}`}
            placeholder="e.g. 10.99"
            step="0.01"
            type="number"
            defaultValue={item.purchase_price == 0 ? "" : item.purchase_price}

            onBlur={handleChange}
            name="purchase_price"

          />
        </div>
        <div>
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="selling-price-1">Precio de venta</label>
          <input
            className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal"
            id={`selling-price-${item.key}`}
            placeholder="e.g. 15.99"
            step="0.01"
            type="number"
            defaultValue={item.sale_price == 0 ? "" : item.sale_price}

            onBlur={handleChange}
            name="sale_price"
          />
        </div>
      </div>
    </div>
  );
};

export default LineItemToInventoryMovements;