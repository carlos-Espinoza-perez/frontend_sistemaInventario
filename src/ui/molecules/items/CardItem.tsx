import formatMoney, { formatNumber } from "../../../hook/func/formatMoney";
import type { IInventoryGrouped } from "../../../interface/InventoryInterface";

const CardItem = ({ item }: { item: IInventoryGrouped }) => { 
  return (
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 flex-shrink-0"
        style={{
          backgroundImage:
            `url("https://picsum.photos/56/56?random=${item.item_id}")`,
        }}
      ></div>
      <div className="flex-grow min-w-0">
        <p className="text-[var(--primary-text-color)] text-base font-medium leading-normal truncate">
          {item.item_name}
        </p>
        <p className="text-[var(--secondary-text-color)] text-sm font-normal leading-normal truncate">
          {formatNumber(item.total_quantity)} und (<span>{formatMoney(item.total_investment)}</span>)
        </p>
      </div>
      <span className="material-icons-outlined text-[var(--secondary-text-color)]">
        chevron_right
      </span>
    </div>
  );
};

export default CardItem;