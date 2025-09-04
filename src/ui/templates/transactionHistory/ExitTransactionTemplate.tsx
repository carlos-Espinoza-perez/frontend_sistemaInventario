import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { IItemMovementGroupSaleAndPurchase } from "../../../interface/TransactionHistoryInterface";
import { axiosPrivate } from "../../../services/AxiosInstance";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import CardDetailExitTransaction from "../../organisms/transactionHistory/CardDetailExitTransaction";
import ContentDetailExitTransaction from "../../organisms/transactionHistory/ContentDetailExitTransaction";

const ExitTransactionTemplate = () => {
  const { sale_group_id } = useParams();
  const [data, setData] = useState<IItemMovementGroupSaleAndPurchase | null>(null);

  const getData = () => 
    axiosPrivate.get(`/sale-groups/summaryGroup/${sale_group_id}`).then((response) => setData(response.data));

  useEffect(() => {
    if (!sale_group_id) return;
    getData();
  }, [sale_group_id]);

  return (
    <>
      <HeaderActionBack title="Salida de inventario"/>
    
      <main className="p-4 space-y-6">
        <CardDetailExitTransaction data={data} />

        <ContentDetailExitTransaction callback={getData}/>
      </main>
    </>
  );
};

export default ExitTransactionTemplate;