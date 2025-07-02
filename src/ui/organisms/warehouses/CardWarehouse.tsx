import { Link } from "react-router-dom";
import type { IWarehouse } from "../../../interface/WarehousesInterface";

const CardWarehouses = ({ warehouse }: { warehouse: IWarehouse }) => {
  return (
    <Link
      to={`/Warehouses/${warehouse.id}`}
      className="flex items-center gap-4 rounded-xl bg-[var(--card-background-color)] p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-center rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)] shrink-0 size-12">
        <span className="material-icons-outlined text-2xl">warehouse</span>
      </div>

      <div className="flex-grow">
        <p className="text-zinc-900 text-base font-medium leading-normal">{warehouse.name}</p>
        <p className="text-[var(--secondary-text-color)] text-sm font-normal leading-normal">{warehouse.location}</p>
      </div>
      <span className="material-icons-outlined text-slate-400">chevron_right</span>
    </Link>
  );
};

export default CardWarehouses;