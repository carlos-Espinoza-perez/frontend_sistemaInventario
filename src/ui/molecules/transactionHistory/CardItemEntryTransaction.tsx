import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import type { IInventoryMovements } from "../../../interface/InventoryInterface";

const CardItemEntryTransaction = ({ item }: { item: IInventoryMovements }) => {
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