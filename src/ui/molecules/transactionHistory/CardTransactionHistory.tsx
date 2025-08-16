import { Link } from "react-router-dom";
import type { IItemMovementGroupSaleAndPurchase } from "../../../interface/TransactionHistoryInterface";

const CardTransactionHistory = ({ item }: { item: IItemMovementGroupSaleAndPurchase }) => {
  const link = item.entry ? `/Transaction/Entry/${item.id}` : `/Transaction/Exit/${item.id}`
  return (
    <Link to={link}>
      <div className="flex items-center gap-4 p-4 border-b border-[var(--border-color)] cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="size-12">
          <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
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