import { useAppSelector } from "../../../hook/useAppSelector";
import type { IWarehouse } from "../../../interface/WarehousesInterface";
import CardWarehouses from "./CardWarehouse";

const ListWarehouses = () => {
  const listWarehouses = useAppSelector((state) => state.warehouses.listWarehouses);

  return (
    <main className="space-y-3 ">
      {
        listWarehouses.map((warehouse: IWarehouse) => (
          <CardWarehouses warehouse={warehouse} key={"warehouses" + warehouse.id} />
        ))
      }
    </main>
  );
};

export default ListWarehouses;
