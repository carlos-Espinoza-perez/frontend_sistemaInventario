import { useEffect } from "react";
import { setListWarehouses } from "../../../features/WarehousesSlice";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { axiosPrivate } from "../../../services/AxiosInstance";
import HeaderWarehouses from "../../organisms/header/HeaderWarehouses";
import ListWarehouses from "../../organisms/warehouses/ListWarehouses";

const WarehousesTemplate = () => {
  const dispatch = useAppDispatch();

  const getListWarehouses = async () => {
    const response = await axiosPrivate.get("/warehouses");
    dispatch(setListWarehouses(response.data));
  };
  
  useEffect(() => {
    getListWarehouses();
  }, []);

  return (
    <>
      <HeaderWarehouses />
      <main className="p-4 min-h-[calc(100vh-200px)]">
        <ListWarehouses />
      </main>
    </>
  );
};

export default WarehousesTemplate;