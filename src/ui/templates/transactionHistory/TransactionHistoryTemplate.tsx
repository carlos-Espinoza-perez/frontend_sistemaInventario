import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { axiosPrivate } from "../../../services/AxiosInstance";
import HeaderTransactionHistory from "../../organisms/header/HeaderTransactionHistory";
import { setListTransactionHistoryIn, setListTransactionHistoryOut } from "../../../features/TransactionHistorySlice";
import { useEffect } from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import WrapperHistoryTransaction from "../../organisms/transactionHistory/WrapperHistoryTransaction";
import { agrupadoPorRangoFecha } from "../../../hook/func/formatTransactionHistory";


function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

const TransactionHistoryTemplate = () => {
  const { warehouse_id } = useParams(); 
  const dispatch = useAppDispatch();

  const { valueTabView: value, listTransactionHistoryIn, listTransactionHistoryOut } = useAppSelector(a => a.transactionHistory);


  const loadData = () => {
    axiosPrivate.get(`/item-movement-groups/summary/${warehouse_id}`)
      .then((response) => {
        dispatch(setListTransactionHistoryIn(agrupadoPorRangoFecha(response.data)));
      });
    
    axiosPrivate.get(`/sale-groups/summary/${warehouse_id}`)
      .then((response) => {
        dispatch(setListTransactionHistoryOut(agrupadoPorRangoFecha( response.data)));
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <HeaderTransactionHistory />

      <main className="py-4 min-h-[calc(100vh-113px-67px)]">
        <TabPanel value={value} index={0}>
          <WrapperHistoryTransaction listTrasactionHistory={listTransactionHistoryIn} entry={true} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <WrapperHistoryTransaction listTrasactionHistory={listTransactionHistoryOut} entry={false} />
        </TabPanel>

      </main>
    </>
  );
};


export default TransactionHistoryTemplate;