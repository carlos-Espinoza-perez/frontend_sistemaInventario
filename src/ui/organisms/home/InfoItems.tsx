import { useEffect, useState } from "react";
import type { IInfoItems } from "../../../interface/HomeInterface";
import { axiosPrivate } from "../../../services/AxiosInstance";
import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import { Link } from "react-router-dom";

const InfoItems = () => {
  const [infoItems, setInfoItems] = useState<IInfoItems>();

  const getInfoItems = async () => {
    axiosPrivate
      .get("/inventory/summary")
      .then((response) => setInfoItems(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfoItems();
  }, []);

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* <div className="flex flex-col items-start gap-1 rounded-lg bg-[var(--surface-color)] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[var(--primary-color)]">
            inventory_2
          </span>
          <p className="text-sm font-normal text-[var(--text-secondary)]">
            Total de productos
          </p>
        </div>
        <p className="text-2xl font-semibold text-[var(--text-primary)]">
          {formatNumber(infoItems?.total_items || 0)} und
        </p>
      </div> */}
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
      <div className="col-span-1 sm:col-span-2 flex flex-col items-start gap-1 rounded-lg bg-[var(--surface-color)] p-4 shadow-sm ring-1 ring-[var(--error-color)]/50">
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
    </section>
  );
};

export default InfoItems;