import { Link, useParams } from "react-router-dom";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import ListItems from "../../organisms/items/ListItemsByWarehouses";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setListItemByWarehouse, setNameFilterWarehouse, setWarehouse } from "../../../features/WarehousesSlice";
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
    
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    dispatch(setNameFilterWarehouse(filterText));
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <HeaderActionBack title={warehouse?.name} />
      <main className="py-2 min-h-[calc(100vh-138px)]">
        <div className="px-4 py-1.5">
          <input
            className={`form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border  bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal`}
            placeholder="Buscar por nombre..."
            type="search"
            name="filter"
            onChange={handleFilterChange}
          />
        </div>

        <div className="flex justify-center mt-1">
          <Link to={`/transaction/history/${warehouse.id}`}>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Historial
            </button>
          </Link>
          <Link to={`/Inventory/Ingreso/${id}`}>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Ingreso
            </button>
          </Link>
          <Link to={`/Inventory/Salida/${id}`}>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Salida
            </button>
          </Link>
        </div>
        
        <ListItems />
      </main>
    </>
  );
};

export default WarehouseDetailsTemplate;