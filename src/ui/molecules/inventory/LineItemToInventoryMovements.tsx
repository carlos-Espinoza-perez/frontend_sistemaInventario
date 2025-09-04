import { useEffect, useState, type ChangeEvent } from "react";
import AnimatedSelect from "../gen/AnimatedSelect";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import type { IOption } from "../../../interface/GenInterface";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setItemRecentCreated } from "../../../features/InventorySlice";

const LineItemToInventoryMovements = ({
  item, setRemoveItem, changeValue, addNewLine,
  index
}:
  {
    item: IInventoryMovements, setRemoveItem: () => void; changeValue: (item: IInventoryMovements) => void; addNewLine: () => void;
    index: number
  }
) => {
  const dispatch = useAppDispatch();
  const baseTabIndex = index * 10;
  const listItemToInventory = useAppSelector(a => a.inventory.listItemByInventory);
  const itemRecentCreated = useAppSelector(a => a.inventory.itemRecentCreated);

  const requiredFields = ["item_id", "quantity", "purchase_price", "sale_price"];
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

    // Si no hay cantidad en quanty que haga un focus
    if (!tempValue.quantity) {
      document.getElementById(`quantity-${item.key}`)?.focus();
    }
  };

  const reviewTempValue = () => {
    const missingFields = requiredFields.filter((field: string) => !tempValue[field]);
    if (!missingFields) return;

    changeValue(tempValue);
  };

  const colorFieldValid = (name: string) =>
    tempValue[name] != 0 ? "border-green-600" : "border-red-600";

  useEffect(() => {
    reviewTempValue();
  }, [tempValue]);

  useEffect(() => {
    // Si ya esta lleno todo y se da enter en Precio de venta agrega una nueva linea
    const sellingPrice = document.getElementById(`selling-price-${item.key}`) as HTMLInputElement | null;
    sellingPrice?.addEventListener("keydown", (event) => {
      const isEnter = event.key === "Enter"
      if (!isEnter) return;

      const missingFields = requiredFields.filter((field: string) => !tempValue[field]);
      if (!missingFields) return;

      addNewLine();
    });
  }, [item.key]);

  useEffect(() => {
    if (!itemRecentCreated) return;

    const itemFound = listItemToInventory.find(a => a.value == itemRecentCreated.id.toString());
    if (!itemFound) return;


    changeSelect(itemFound);
    dispatch(setItemRecentCreated(null));
  }, [listItemToInventory, itemRecentCreated])



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
              isCorrect={item.item_id != 0}
            />
          </div>
        </div>
        <div className="w-24">
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="quantity-1">Cantidad</label>
          <input
            className={`form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border ${colorFieldValid("quantity")} bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal`}
            id={`quantity-${item.key}`}
            placeholder="Cant"
            type="number"

            defaultValue={item.quantity == 0 ? "" : item.quantity}
            onKeyUp={handleChange as any}
            name="quantity"
            tabIndex={baseTabIndex + 1}
          />
        </div>
        <button
          tabIndex={-1}
          onClick={setRemoveItem}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="purchase-price-1">Costo de compra</label>
          <input
            className={
              `form-input block w-full rounded-lg text-[var(--text-primary)] 
              focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] 
              focus:border-[var(--primary-color)] border ${colorFieldValid("purchase_price")}
              bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm 
              font-normal leading-normal`
            }
            id={`purchase-price-${item.key}`}
            placeholder="e.g. 10.99"
            step="0.01"
            type="number"
            defaultValue={item.purchase_price == 0 ? "" : item.purchase_price}

            onKeyUp={handleChange as any}
            name="purchase_price"
            tabIndex={baseTabIndex + 2}
          />
        </div>
        <div>
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="selling-price-1">Precio de venta</label>
          <input
            className={
              `form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border ${colorFieldValid("sale_price")} bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal`
            }
            id={`selling-price-${item.key}`}
            placeholder="e.g. 15.99"
            step="0.01"
            type="number"
            defaultValue={item.sale_price == 0 ? "" : item.sale_price}

            onKeyUp={handleChange as any}
            name="sale_price"
            tabIndex={baseTabIndex + 3}
          />
        </div>
      </div>
    </div>
  );
};

export default LineItemToInventoryMovements;