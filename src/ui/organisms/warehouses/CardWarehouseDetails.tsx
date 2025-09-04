import { Link } from "react-router-dom";
import type { IWarehouse } from "../../../interface/WarehousesInterface";

const CardWarehousesDetail = ({ warehouse }: { warehouse: IWarehouse }) => {
  return (
    <div className="p-4 @container">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--divider-color)] bg-[var(--surface-color)] p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[var(--primary-text-color)] text-2xl font-bold leading-tight tracking-[-0.015em] text-center">{warehouse.name}</p>
          <p className="text-[var(--secondary-text-color)] text-base font-normal leading-normal text-center mt-1">{warehouse.location}</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Link to={`/transaction/history/${warehouse.id}`}>
          <button
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ver historial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardWarehousesDetail;