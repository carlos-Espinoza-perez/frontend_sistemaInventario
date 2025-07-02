import { useAppSelector } from "../../../hook/useAppSelector";
import CardItem from "../../molecules/items/CardItem";

const ListItemsByWarehouses = () => {
  const listWarehouse = useAppSelector(a => a.warehouses.listItemByWarehouse);

  return (
    <>
      <h2 className="text-[var(--primary-text-color)] text-xl font-semibold leading-tight tracking-[-0.015em] px-4 pt-2 pb-3 pt-6">
        Productos en bodega
      </h2>
      <div className="divide-y divide-[var(--divider-color)] border-t border-b border-[var(--divider-color)] bg-[var(--surface-color)]">
        {
          listWarehouse.map(a => 
            <CardItem key={a.item_id} item={a} />
          )
        }
      </div>
    </>
  );
};

export default ListItemsByWarehouses;