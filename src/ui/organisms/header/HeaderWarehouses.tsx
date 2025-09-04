import { Link } from "react-router-dom";

const HeaderWarehouses = () => {
  return (
    <header className="sticky top-0 z-10 bg-[var(--card-background-color)] shadow-sm rounded-b-lg">
      <div className="flex flex-col gap-3 p-4 pb-3">
        <div className="flex items-center h-12 justify-between">
          <h1 className="text-zinc-900 text-2xl font-semibold leading-tight">
            Lista de bodegas
          </h1>
          <Link to="/Warehouses/Create">
            <button className="flex items-center justify-center rounded-full h-10 w-10 bg-[var(--primary-color)] text-white hover:bg-blue-600 transition-colors">
              <span className="material-icons-outlined text-2xl">add</span>
            </button>
          </Link>

        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="material-icons-outlined text-[var(--placeholder-color)] text-xl">
              search
            </span>
          </div>
          <input
            className="form-input block w-full rounded-lg border-0 bg-[var(--input-background-color)] py-2.5 pl-10 pr-3 text-zinc-900 placeholder:text-[var(--placeholder-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Buscar por nombre..."
            type="search"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderWarehouses;