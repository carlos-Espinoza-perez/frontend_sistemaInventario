import { setCategoryFilterId, setGroupByItemsByItemId, setListItemFiltered, setWarehouseFilterId, toggleOrderDirection } from "../../../features/InventorySlice";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import type { IOption } from "../../../interface/GenInterface";
import FilterButtons from "../../molecules/gen/ButtonHeaderFilter";

const HeaderInventory = () => { 
  const dispatch = useAppDispatch();
  const listwarehouses = useAppSelector(a => a.warehouses.listWarehouses);
  const listCategories = useAppSelector(a => a.inventory.listCategoryByInventory);

  const listWarehousesOptions: IOption[] = [
    { label: "Todas", value: "0" },
    ...listwarehouses.map(warehouse => ({
      label: warehouse.name,
      value: warehouse.id.toString()
    }))
  ];

  const listCategoriesOptions: IOption[] = [
    { label: "Todas", value: "0" },
    ...listCategories.map(category => ({
      label: category.name,
      value: category.id.toString()
    }))
  ];

  const handleWarehouseChange = (option: IOption) => {
    dispatch(setWarehouseFilterId(Number(option.value)));
    dispatch(setListItemFiltered(null));
    dispatch(setGroupByItemsByItemId());
  };
  
  const handleCategoryChange = (option: IOption) => {
    dispatch(setCategoryFilterId(Number(option.value)));
    dispatch(setListItemFiltered(null));
    dispatch(setGroupByItemsByItemId());
  };

  const handleOrderChange = () => {
    dispatch(toggleOrderDirection());
    dispatch(setListItemFiltered(null));
    dispatch(setGroupByItemsByItemId());
  };

  return (
    <header className="sticky top-0 z-10 bg-[var(--surface-background)] shadow-sm">
      <div className="flex items-center px-4 py-3">
        <h1 className="text-[var(--text-primary)] text-xl font-semibold leading-tight flex-1 text-center">
          Inventario global
        </h1>
      </div>
      <div className="px-4 pb-3 pt-1 flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="material-icons-outlined text-[var(--text-secondary)]">
              search
            </span>
          </div>
          <input
            className="form-input block w-full rounded-lg border-[var(--outline)] bg-[var(--surface-container)] py-2.5 pl-10 pr-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm"
            placeholder="Buscar producto..."
            type="search"
          />
        </div>
        <button
          className="flex items-center justify-center rounded-lg h-10 w-10 shrink-0 border border-[var(--outline)] bg-[var(--surface-container)] text-[var(--text-secondary)] hover:bg-[var(--surface-container-high)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          onClick={handleOrderChange}
        >
          <span className="material-icons-outlined">filter_list</span>
        </button>
      </div>
      <div className="flex gap-2 px-4 pb-3 pt-[2px] overflow-x-auto">
        <FilterButtons
          label="Bodega"
          options={listWarehousesOptions}
          selectedOption="Todas"
          onChange={(option) => handleWarehouseChange(option)}
        />

        <FilterButtons
          label="Categoría"
          options={listCategoriesOptions}
          selectedOption="Todas"
          onChange={(option) => handleCategoryChange(option)}
        />
      </div>
    </header>
  );
};

export default HeaderInventory;