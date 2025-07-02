import { useEffect } from "react";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import HeaderInventory from "../../organisms/header/HeaderInventory";
import ListItemsGlobal from "../../organisms/items/ListItemsGlobal";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { setGroupByItemsByItemId, setListCategoryByInventory, setListItemFiltered, setListItemGloabl } from "../../../features/InventorySlice";
import { setListWarehouses } from "../../../features/WarehousesSlice";

const GlobalInventory = () => {
  const dispatch = useAppDispatch();

  const getGlobalInventory = () => { 
    axiosPrivate.get("/inventory/grouped")
      .then((response) => {
        dispatch(setListItemGloabl(response.data))
        dispatch(setListItemFiltered(response.data));
        dispatch(setGroupByItemsByItemId());
      })
    
    axiosPrivate.get("/categories")
      .then((response) => dispatch(setListCategoryByInventory(response.data)));
    
    axiosPrivate.get("/warehouses")
      .then((response) => dispatch(setListWarehouses(response.data)));
  };

  useEffect(() => {
    getGlobalInventory();
  }, []);

  return (
    <>
      <HeaderInventory />
      <main className="p-4 min-h-[calc(100dvh-225px)]">
        <ListItemsGlobal />
      </main>
    </>
  );
};

export default GlobalInventory;