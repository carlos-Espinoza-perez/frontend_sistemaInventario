import useDebounce from "../../../hook/func/useDebounce";
import { useAppSelector } from "../../../hook/useAppSelector";
import CardItem from "../../molecules/items/CardItem";

const ListItemsByWarehouses = () => {
  const listWarehouse = useAppSelector(a => a.warehouses.listItemByWarehouse);
  const filterName = useAppSelector(a => a.warehouses.nameFilterWarehouse);
  const debouncedFilter = useDebounce(filterName, 300);

  const filteredItems = listWarehouse.filter(item =>
    item.item_name?.toLowerCase().includes(debouncedFilter.toLowerCase())
  );


  return (
    <>
      <h2 className="text-[var(--primary-text-color)] text-xl font-semibold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">
        Productos en bodega
      </h2>
      <div className="divide-y divide-[var(--divider-color)] border-t border-b border-[var(--divider-color)] bg-[var(--surface-color)]">
        {
          filteredItems.map(a => 
            <CardItem key={a.item_id} item={a} />
          )
        }
      </div>
    </>
  );
};

export default ListItemsByWarehouses;