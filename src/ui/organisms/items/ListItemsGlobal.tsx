import { useAppSelector } from "../../../hook/useAppSelector";
import CardItem from "../../molecules/items/CardItem";

const ListItemsGlobal = () => { 
  const listFiltered = useAppSelector(a => a.inventory.listItemFiltered);

  return (
    <>
      {listFiltered.map(item => (
        <CardItem key={item.item_name + item.warehouse_id + item.item_id + item.inventory_id} item={item} />
      ))}
    </>
  );
};

export default ListItemsGlobal;