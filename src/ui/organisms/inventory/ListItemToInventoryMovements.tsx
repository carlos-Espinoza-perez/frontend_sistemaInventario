import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hook/useLocalStorage";
import LineItemToInventoryMovements from "../../molecules/inventory/LineItemToInventoryMovements";
import { v4 } from 'uuid';
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import LineItemToInventorySale from "../../molecules/inventory/LineItemToInventorySale";
import formatMoney from "../../../hook/func/formatMoney";

const ListItemToInventoryMovements = ({ type }: { type: 'entrada' | 'salida' }) => {
  const itemEmpty: IInventoryMovements = {
    item_id: 0,
    item_name: "",
    quantity: 0,
    purchase_price: 0,
    sale_price: 0,
    key: v4(),
    paid: 1,
  };
  const { value: listItemStorage, updateValue: updateListItemStorage } =
    useLocalStorage<IInventoryMovements[]>("list_item", [], true);

  const [listItem, setListItem] = useState(listItemStorage);

  useEffect(() => {
    if (listItemStorage.length == 0 && listItem.length == 0)
      setListItem([itemEmpty]);

    else if (listItemStorage.length > 0)
      setListItem(listItemStorage);
  }, [listItemStorage]);

  const addNewLine = () => {
    const newList = [...listItem, itemEmpty];
    setListItem(newList);
    updateListItemStorage(newList);

    // Llevar al final del navegador con un scroll suave
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const removeLine = (key: string) => {
    const newList = listItem.filter(a => a.key != key)
    setListItem(newList);
    updateListItemStorage(newList);
  };

  const updateLine = (item: IInventoryMovements) => {
    const updatedList = listItem.map((i) =>
      i.key === item.key ? item : i
    );

    setListItem(updatedList);
    updateListItemStorage(updatedList);
  };

  return (
    <>

      <div>
        <label
          htmlFor="name"
          className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
        >
          Descripción del movimiento
        </label>
        <input
          id="name"
          type="text"
          placeholder="Eg. Juan Perez"
          className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-14 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-[var(--text-primary)] text-base font-medium leading-tight mt-4">Lista de producto</h2>
        <div className="p-4 border border-[var(--border-color)] rounded-lg space-y-4 bg-slate-50">
          {
            listItem.map((a, index) =>
              <React.Fragment key={`item-${index}`}>
                {
                  type === "salida" && (
                    <LineItemToInventorySale
                      key={a.id}
                      item={a}
                      index={index}
                      setRemoveItem={() => removeLine(a.key as string)}
                      changeValue={updateLine}
                    />
                  )
                }
                {
                  type === "entrada" && (
                    <LineItemToInventoryMovements
                      key={a.id}
                      index={index}
                      item={a}
                      setRemoveItem={() => removeLine(a.key as string)}
                      changeValue={updateLine}
                      addNewLine={addNewLine}
                    />
                  )
                }

                {
                  index != listItem.length - 1 &&
                  <hr />
                }
              </React.Fragment>
            )
          }
        </div>
        <button
          onClick={addNewLine}
          className="flex items-center justify-center w-full rounded-lg h-10 px-4 border border-dashed border-[var(--primary-color)] text-[var(--primary-color)] text-sm font-medium leading-normal hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
          <span className="material-icons mr-1.5 text-lg">add_circle_outline</span>
          Agregar más producto
        </button>
      </div>


      <div className="mt-6 p-4 border border-[var(--border-color)] rounded-lg bg-white">
        <h3 className="text-[var(--text-primary)] text-base font-semibold mb-2">Resumen</h3>
        {type === "entrada" && (
          <>
            <div className="flex justify-between text-sm">
              <span>Total de inversión:</span>
              <span className="font-bold">
                {formatMoney(listItem.reduce(
                  (acc, item) => acc + (item.purchase_price || 0) * (item.quantity || 0),
                  0
                ))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Ganancia esperada:</span>
              <span className="font-bold">
                {formatMoney(
                  listItem.reduce(
                    (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
                    0
                  )
                  - listItem.reduce(
                    (acc, item) => acc + (item.purchase_price || 0) * (item.quantity || 0),
                    0
                  )
                )}
              </span>
            </div>
          </>
        )}
        {type === "salida" && (
          <>
            <div className="flex justify-between text-sm">
              <span>Total de contado:</span>
              <span className="font-bold">
                {formatMoney(listItem.filter(a => a.paid).reduce(
                  (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
                  0
                ))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total de fiado:</span>
              <span className="font-bold">
                {formatMoney(listItem.filter(a => !a.paid).reduce(
                  (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
                  0
                ))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Costo total:</span>
              <span className="font-bold">
                {formatMoney(listItem.reduce(
                  (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
                  0
                ))}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListItemToInventoryMovements;