import { useEffect, useState } from "react";
import type { IAgrupacionMovimiento } from "../../../interface/TransactionHistoryInterface";
import { agrupadoPorRangoFecha } from "../../../hook/func/formatTransactionHistory";
import { axiosPrivate } from "../../../services/AxiosInstance";
import WrapperHistoryTransaction from "../transactionHistory/WrapperHistoryTransaction";

const ListSaleDebtInventory = () => {
  const [data, setData] = useState < IAgrupacionMovimiento[] > ([])

  const loadData = () => {
    axiosPrivate.get(`/sale-groups/sumaryDebt`)
      .then((response) => {
        setData(agrupadoPorRangoFecha(response.data))
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="py-4">
      <WrapperHistoryTransaction listTrasactionHistory={data} entry={false} />
    </main>
  );
};

export default ListSaleDebtInventory;