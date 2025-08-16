import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";

const CardItemEntryTransaction = ({ item }: { item: IInventoryMovements }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow min-h-[80px]">
      <div className="aspect-square bg-cover rounded-lg size-16 "
      >
        <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[var(--text-primary)] text-base font-medium line-clamp-1">{item.item_name}</p>
        <p className="text-[var(--text-secondary)] text-sm line-clamp-1">Cantidad: {formatNumber(item.quantity)} und</p>
        <p className="text-[var(--text-secondary)] text-xs line-clamp-1">Costo de compra: {formatMoney(item.purchase_price)}</p>
        <p className="text-[var(--text-secondary)] text-xs line-clamp-1">Precio de venta: {formatMoney(item.sale_price)}</p>
      </div>
      <div className="text-right">
        <p className="text-[var(--accent-color)] text-sm font-medium"> {formatMoney(item.purchase_price * item.quantity)} </p>
        <p className="text-[var(--success-color)] text-sm font-medium"> {formatMoney(item.sale_price * item.quantity)} </p>
      </div>
    </div>
  );
}

export default CardItemEntryTransaction;