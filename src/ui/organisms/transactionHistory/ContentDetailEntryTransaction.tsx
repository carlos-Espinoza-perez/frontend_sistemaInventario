import { useEffect, useState } from "react";
import CardItemEntryTransaction from "../../molecules/transactionHistory/CardItemEntryTransaction";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../../services/AxiosInstance";

const ContentDetailEntryTransaction = () => {
  const { item_movement_group_id } = useParams();
  const [data, setData] = useState<IInventoryMovements[]>([]);

  useEffect(() => {
    axiosPrivate.get(`/movements/${item_movement_group_id}`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <section>
      <h2 className="text-[var(--text-primary)] text-lg font-semibold px-1 pb-3 pt-2">Lista de productos</h2>
      <div className="space-y-3">
        {
          data.map((item, index) => (
            <CardItemEntryTransaction key={index} item={item} />
          ))
        }
      </div>
    </section>
  );
}

export default ContentDetailEntryTransaction; 