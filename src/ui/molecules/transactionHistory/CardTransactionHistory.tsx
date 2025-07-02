import { Link } from "react-router-dom";
import type { IItemMovementGroupSaleAndPurchase } from "../../../interface/TransactionHistoryInterface";

const CardTransactionHistory = ({ item }: { item: IItemMovementGroupSaleAndPurchase }) => {
  const link = item.entry ? `/Transaction/Entry/${item.id}` : `/Transaction/Exit/${item.id}`
  return (
    <Link to={link}>
      <div className="flex items-center gap-4 p-4 border-b border-[var(--border-color)] cursor-pointer hover:bg-gray-50 transition-colors">
        <img alt="Item A" className="rounded-lg size-12 object-cover"
          src={`https://picsum.photos/56/56?random=${item.id}`} />
        <div className="flex-1">
          <p className="text-[var(--text-primary)] text-base font-medium leading-normal">{item.note || "Movimiento de inventario"}</p>
          <p className="text-[var(--text-secondary)] text-sm font-normal leading-normal">{item.total_items} Und</p>
        </div>
        <span className="material-icons-outlined text-[var(--text-secondary)]">
          chevron_right
        </span>
      </div>
    </Link>
  );
};

export default CardTransactionHistory;