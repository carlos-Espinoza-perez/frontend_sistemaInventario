import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import type { IInventoryGrouped } from "../../../interface/InventoryInterface";

const CardItem = ({ item }: { item: IInventoryGrouped }) => { 
  return (
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 flex-shrink-0"
      >
        <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-[var(--primary-text-color)] text-base font-medium leading-normal truncate">
          {item.item_name}
        </p>
        <p className="text-[var(--secondary-text-color)] text-sm font-normal leading-normal truncate">
          <span className="text-[var(--success-color)] text-sm font-medium">Costo: {formatMoney(item.last_purchase_price || 0)},</span>
          <span className="text-[var(--accent-color)] text-sm font-medium"> Precio: {formatMoney(item.last_sale_price || 0)}</span>
        </p>
        <p className="text-[var(--secondary-text-color)] text-sm font-normal leading-normal truncate">
          {formatNumber(item.total_quantity)} und 
        </p>
      </div>
      <span className="material-icons-outlined text-[var(--secondary-text-color)]">
        chevron_right
      </span>
    </div>
  );
};

export default CardItem;