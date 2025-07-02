import { Link, useParams } from "react-router-dom";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import ListItems from "../../organisms/items/ListItemsByWarehouses";
import CardWarehousesDetail from "../../organisms/warehouses/CardWarehouseDetails";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setListItemByWarehouse, setWarehouse } from "../../../features/WarehousesSlice";
import { useEffect } from "react";

const WarehouseDetailsTemplate = () => {
  const dispatch = useAppDispatch();
  
  const { id } = useParams();
  const warehouse = useAppSelector(a => a.warehouses.warehouse);

  const getData = async () => {
    const warehouseData = await axiosPrivate.get(`/warehouses/${id}`);
    const listItemData = await axiosPrivate.get(`/inventory/grouped/${id}`);

    dispatch(setWarehouse(warehouseData.data));
    dispatch(setListItemByWarehouse(listItemData.data));
  };
    
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <HeaderActionBack title="Detalle de bodega" />
      <main className="py-2 min-h-[calc(100vh-138px)]">
        <CardWarehousesDetail warehouse={warehouse} />
        <ListItems />
      </main>

      <div className="fixed bottom-[50px] right-0 p-6">
        <Link to={`/Inventory/Create/${id}`}>
          <button
            aria-label="Add Item"
            className="flex items-center justify-center rounded-full h-14 w-14 bg-[var(--primary-color)] text-white shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-150"
          >
            <span className="material-icons-outlined text-2xl">add</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default WarehouseDetailsTemplate;