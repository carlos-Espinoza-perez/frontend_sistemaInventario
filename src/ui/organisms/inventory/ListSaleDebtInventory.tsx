import { useEffect, useState } from "react";
import type { IAgrupacionMovimiento } from "../../../interface/TransactionHistoryInterface";
import { agrupadoPorRangoFecha } from "../../../hook/func/formatTransactionHistory";
import { axiosPrivate } from "../../../services/AxiosInstance";
import WrapperHistoryTransaction from "../transactionHistory/WrapperHistoryTransaction";
import useDebounce from "../../../hook/func/useDebounce";

const ListSaleDebtInventory = () => {
  const [data, setData] = useState <IAgrupacionMovimiento[] > ([])
  const [filterText, setFilterText] = useState("");
  const debouncedFilter = useDebounce(filterText, 300); // 300ms debounce

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosPrivate.get(`/sale-groups/sumaryDebt`);
        setData(agrupadoPorRangoFecha(response.data));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Aplica el filtro con debounce
  const filteredData = data
    .map(group => {
      const filteredMovements = group.listMovements.filter(mov =>
        mov.note.toLowerCase().includes(debouncedFilter.toLowerCase())
      );

      return {
        ...group,
        listMovements: filteredMovements
      };
    })
    .filter(group => group.listMovements.length > 0);


  return (
    <main className="py-4">
      <div className="px-4">
        <input
          className={`form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border  bg-white h-12 placeholder:text-[var(--text-secondary)] px-3 text-sm font-normal leading-normal`}
          placeholder="Buscar fiados..."
          type="search"
          name="filter"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>

      <WrapperHistoryTransaction listTrasactionHistory={filteredData} entry={false} />
    </main>
  );
};

export default ListSaleDebtInventory;