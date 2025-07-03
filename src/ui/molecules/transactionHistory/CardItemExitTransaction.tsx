import { useState } from "react";
import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import type { ISale } from "../../../interface/ISaleInterface";
import { axiosPrivate } from "../../../services/AxiosInstance";

const CardItemExitTransaction = ({ item, callback }: { item: ISale, callback: () => void }) => {
  const [paid, setPaid] = useState(item.paid);
  
  const handlePagar = () => {
    axiosPrivate.patch(`/sales/${item.id}/paid`)
      .then(() => {
        callback();
        setPaid(true);
      });
  };


  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow min-h-[80px]">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shadow"
        style={{
          backgroundImage: `url('https://picsum.photos/56/56?random=${item.id}')`
        }}
      ></div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[var(--text-primary)] text-base font-medium line-clamp-1">{item.item_name}</p>
        <p className="text-[var(--text-secondary)] text-sm line-clamp-1">Cantidad: {formatNumber(item.quantity)} und</p>
        <p className="text-[var(--text-secondary)] text-xs line-clamp-1">Precio de venta: {formatMoney(item.sale_price)}</p>
      </div>
      <div className="text-right">
        <p className={
          `text-sm font-medium ${paid ? "text-[var(--success-color)]" : "text-[var(--accent-color)]"}`
        }> {formatMoney(item.sale_price * item.quantity)} </p>
        <p className={
          `text-xs line-clamp-1 ${paid ? "text-[var(--success-color)]" : "text-[var(--accent-color)]"}`
        }>{paid ? "Pagado" : "Pendiente"}</p>
        {
          !paid && (
            <button
              className="inline-flex items-center justify-center rounded-md border border-transparent 
                bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white
                shadow-sm hover:bg-blue-600 focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ padding: "6px 16px", marginTop: "6px" }}
              onClick={handlePagar}
            >
              Pagar
            </button>
          )
        }
      </div>
    </div>
  );
}

export default CardItemExitTransaction;