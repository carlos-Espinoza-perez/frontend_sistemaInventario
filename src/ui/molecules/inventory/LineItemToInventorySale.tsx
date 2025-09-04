import { useEffect, useState, type ChangeEvent } from "react";
import AnimatedSelect from "../gen/AnimatedSelect";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import type { IOption } from "../../../interface/GenInterface";
import { useAppSelector } from "../../../hook/useAppSelector";
import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const LineItemToInventorySale = (
  { item, setRemoveItem, changeValue, index }:
    {
      item: IInventoryMovements,
      setRemoveItem: () => void;
      changeValue: (item: IInventoryMovements) => void;
      index: number
    }
) => {
  const baseTabIndex = index * 10;
  const { listItemByInventory } = useAppSelector(a => a.inventory);

  const requiredFields = ["item_id", "quantity", "sale_price"];
  const [tempValue, setTempValue] = useState<IInventoryMovements>(item);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.name === "quantity") {
      const isValid = e.target.validity.valid;
      if (!isValid) {
        alert(e.target.validationMessage);
        return;
      }
    }

    setTempValue({
      ...tempValue,
      [e.target.name]: e.target.value,
    });
  };

  const changeSelect = (value: IOption) => {
    setTempValue({
      ...tempValue,
      item_name: value.label,
      item_id: parseInt(value.value),
      total_quantity: value.total_quantity,
      last_purchase_price: value.last_purchase_price,
      last_sale_price: value.last_sale_price
    })
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
  return (
    <div className="space-y-0">
      <div className="flex items-top space-x-2">
        <div className="flex-grow">
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="item-1">Producto</label>
          <div className="relative">
            <AnimatedSelect
              options={listItemByInventory}
              label="Seleccionar producto"
              change={changeSelect}
              defaultOptionValue={item.item_id.toString()}
              isCorrect={tempValue.item_id != 0}
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
            max={item.total_quantity?.toString() || "0"}
            tabIndex={baseTabIndex + 1}
          />
          <p className="text-[var(--text-secondary)] text-xs font-normal leading-normal mt-1">
            Max: {formatNumber(parseInt(item.total_quantity?.toString() || "0")) } unds
          </p>
        </div>
        <button
          tabIndex={-1}
          onClick={setRemoveItem}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
          <span className="material-icons">delete</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 items-center">
        <div>
          <label className="block text-[var(--text-primary)] text-sm font-medium leading-tight mb-1" htmlFor="selling-price-1">Precio de venta</label>
          <input
            className={`form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border ${colorFieldValid("sale_price")} bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal`}
            id={`selling-price-${item.key}`}
            placeholder="e.g. 15.99"
            type="number"
            defaultValue={item.sale_price == 0 ? "" : item.sale_price}

            onKeyUp={handleChange as any}
            name="sale_price"
            tabIndex={baseTabIndex + 2}
          />

          <p className="text-[var(--text-secondary)] text-xs font-normal leading-normal mt-1">
            Precio de venta: {formatMoney(parseInt(item.last_sale_price?.toString() || "0"))}
          </p>
        </div>

        <FormGroup>
          <FormControlLabel control={<Switch
            onChange={(_, checked) => setTempValue({ ...tempValue, paid: checked ? 0 : 1 })}
            checked={tempValue.paid === 0}
            name="paid"
          />} label="¿Es fiado?" />
        </FormGroup>
      </div>
    </div>
  );
};

export default LineItemToInventorySale;