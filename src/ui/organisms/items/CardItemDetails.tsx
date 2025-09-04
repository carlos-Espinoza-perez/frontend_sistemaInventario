const CardItemDetails = () => {
  return (
    <section className="rounded-xl bg-[var(--surface-color)] shadow-lg overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col items-center text-white">
        <span className="material-icons-outlined text-6xl mb-3 opacity-80">
          inventory_2
        </span>
        <h2 className="text-2xl font-semibold">Laptop</h2>
        <p className="text-sm opacity-90">ITM-001</p>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <p className="text-xs text-[var(--text-secondary)] uppercase font-medium tracking-wider mb-1">
            Description
          </p>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            High-performance laptop with 16GB RAM and 512GB SSD. Model: XYZ-123.
            Ideal for demanding tasks and professional use.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-medium tracking-wider mb-1">
              Warehouse
            </p>
            <p className="text-base font-medium text-[var(--text-primary)]">
              Main Warehouse
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-medium tracking-wider mb-1">
              Quantity
            </p>
            <p className="text-base font-medium text-[var(--text-primary)]">
              10
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-medium tracking-wider mb-1">
              Value
            </p>
            <p className="text-base font-medium text-[var(--text-primary)]">
              $15,000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardItemDetails;