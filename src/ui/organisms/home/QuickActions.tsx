import { Link } from "react-router-dom";
import AddCategoryButton from "../category/AddCategoryButton";

const QuickActions = () => {
  return <></>;
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-medium leading-tight text-[var(--text-primary)]">
          Acciones rápidas
        </h2>
        <a className="text-sm font-medium text-[var(--primary-color)] hover:underline">
          Mostrar todas
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <button className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[var(--surface-color)] p-4 text-center shadow-sm hover:bg-gray-50">
          <Link to="/Item/Create">
            <span className="material-icons-outlined text-[var(--primary-color)]">
              add_circle_outline
            </span>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Agregar producto
            </p>
          </Link>
        </button>
        {/* <button className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[var(--surface-color)] p-4 text-center shadow-sm hover:bg-gray-50">
          <Link to="/Warehouses">
            <span className="material-icons-outlined text-[var(--primary-color)]">
              warehouse
            </span>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Administrar bodegas
            </p>
          </Link>
        </button> */}
        
        <AddCategoryButton />
        
        <button className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[var(--surface-color)] p-4 text-center shadow-sm hover:bg-gray-50">
          <span className="material-icons-outlined text-[var(--primary-color)]">
            assessment
          </span>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Ver reportes
          </p>
        </button>
      </div>
    </section>
  );
};

export default QuickActions;
