import { useEffect, useState } from "react";
import type { IItemMovementGroupSaleAndPurchase } from "../../../interface/TransactionHistoryInterface";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../../services/AxiosInstance";
import moment from "moment";
import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";

const CardDetailEntryTransaction = () => {
  const { item_movement_group_id } = useParams();
  const [data, setData] = useState<IItemMovementGroupSaleAndPurchase | null>(null);


  useEffect(() => {
    axiosPrivate.get(`/item-movement-groups/group/${item_movement_group_id}`).then((response) => setData(response.data));
  }, []);

  return (
    <section className="bg-white rounded-xl shadow p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-[var(--text-primary)] text-lg font-bold">{data?.note}</p>
          <p className="text-[var(--text-secondary)] text-xs">{moment(data?.created_at).format("DD/MM/yyyy")}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <p className="text-[var(--text-secondary)] text-sm">Total de productos:</p>
        <p className="text-[var(--text-primary)] text-base font-semibold">{formatNumber(data?.total_items || 0)}</p>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[var(--text-secondary)] text-sm">Costo invertido:</p>
        <p className="text-[var(--accent-color)] text-base font-bold">{formatMoney(data?.total_purchase_price || 0)}</p>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[var(--text-secondary)] text-sm">Total esperado:</p>
        <p className="text-[var(--success-color)] text-base font-bold">{formatMoney(data?.total_sale_price || 0)}</p>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[var(--text-secondary)] text-sm">Ganancia esperada:</p>
        <p className="text-[var(--success-color)] text-base font-bold">{formatMoney(((data?.total_sale_price || 0) - (data?.total_purchase_price || 0)) || 0)}</p>
      </div>
    </section>
  );
};

export default CardDetailEntryTransaction;