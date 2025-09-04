import { useEffect, useState } from "react";
import type { IInfoItems } from "../../../interface/HomeInterface";
import { axiosPrivate } from "../../../services/AxiosInstance";
import formatMoney from "../../../hook/func/formatMoney";
import { Link } from "react-router-dom";
import FiltroFechaVentas, { type RangoFecha } from "../../molecules/home/FiltroFechaVentas";
import moment from "moment";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const InfoItems = () => {
  const [infoItems, setInfoItems] = useState<IInfoItems>({
    total_items: 0,
    total_investment: 0,
    total_debt: 0,
  });

  const [totalSale, setTotalSale] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [dataChart, setDataChart] = useState([]);
  
  // Default hace 30 dias
  const [rangos, setRangos] = useState<RangoFecha>({
    fechaInicio: moment().subtract(30, "days").format("YYYY-MM-DD"),
    fechaFin: moment().format("YYYY-MM-DD"),
  });

  const getInfoItems = async () => {
    axiosPrivate
      .get("/inventory/summary")
      .then((response) => {
        setInfoItems(response.data);
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    getInfoItems();
  }, []);

  useEffect(() => {

    axiosPrivate.get(`/inventory/summary_sales?dateStart=${rangos?.fechaInicio}&dateEnd=${rangos?.fechaFin}`)
      .then((response) => {
        setTotalSale(response.data.total_paid);
        setTotalProfit(response.data.total_profit);
      })
    
    axiosPrivate.get(`/inventory/summary_sales_by_day?dateStart=${rangos?.fechaInicio}&dateEnd=${rangos?.fechaFin}`)
      .then((response) => {
        setDataChart(response.data);
      })
  }, [rangos]);

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-start gap-1 rounded-lg bg-[var(--surface-color)] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[var(--success-color)]">
            attach_money
          </span>
          <p className="text-sm font-normal text-[var(--text-secondary)]">
            Valor de inventario
          </p>
        </div>
        <p className="text-2xl font-semibold text-[var(--text-primary)]">
          {formatMoney(infoItems?.total_investment || 0)}
        </p>
      </div>
      
      <div className="col-span-1 sm:col-span-2 flex flex-col items-start gap-1 rounded-lg bg-[var(--surface-color)] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[var(--error-color)]">
            warning_amber
          </span>
          <p className="text-sm font-normal text-[var(--error-color)]">
            Fiados pendientes
          </p>
        </div>
        <p className="text-2xl font-semibold text-[var(--error-color)]">
          {formatMoney(infoItems?.total_debt || 0)  }
        </p>
        <Link
          className="mt-1 text-sm font-medium text-[var(--primary-color)] hover:underline" to={"/Inventory/Debt"}        >
          Ver detalles
        </Link>
      </div>


      <div className="rounded-lg bg-[var(--surface-color)] p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
          <h2 className="text-base font-medium text-[var(--text-primary)]">Ventas realizadas</h2>
          <FiltroFechaVentas onChange={setRangos} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center size-10">
              <span className="material-icons-outlined text-4xl text-[var(--primary-color)]">paid</span>
            </div>
            <div>
              <p className="text-sm font-normal text-[var(--text-secondary)]">Total ventas</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">{formatMoney(totalSale || 0)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center size-10 rounded-full">
              <span className="material-icons-outlined text-4xl text-[var(--success-color)]">trending_up</span>
            </div>
            <div>
              <p className="text-sm font-normal text-[var(--text-secondary)]">Ganancias</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">{formatMoney(totalProfit || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[var(--surface-color)] py-2 px-2 shadow-sm h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dataChart}
            style={{
              fontSize: "12px",
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip formatter={(value) => formatMoney(value as number)}/>
              
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#0a65c2" />
            <Line type="monotone" dataKey="ganancias" stroke="#2e7d32" activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="fiados" stroke="#d32f2f" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default InfoItems;