import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../../services/AxiosInstance";
import type { ISale } from "../../../interface/ISaleInterface";
import CardItemExitTransaction from "../../molecules/transactionHistory/CardItemExitTransaction";

const ContentDetailExitTransaction = ({ callback }: { callback: () => void }) => {
  const { sale_group_id } = useParams();
  const [data, setData] = useState<ISale[]>([]);

  useEffect(() => {
    axiosPrivate.get(`/sales/${sale_group_id}`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <section>
      <h2 className="text-[var(--text-primary)] text-lg font-semibold px-1 pb-3 pt-2">Lista de productos</h2>
      <div className="space-y-3">
        {
          data.map((item, index) => (
            <CardItemExitTransaction key={index} item={item} callback={callback}/>
          ))
        }
      </div>
    </section>
  );
}

export default ContentDetailExitTransaction; 