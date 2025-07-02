const CardWarehouses = () => { 
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[var(--card-background-color)] p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-center rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)] shrink-0 size-12">
        <span className="material-icons-outlined text-2xl">warehouse</span>
      </div>
      <div className="flex-grow">
        <p className="text-zinc-900 text-base font-medium leading-normal">
          South Warehouse
        </p>
        <p className="text-[var(--secondary-text-color)] text-sm font-normal leading-normal">
          789 Pine Ln, Anytown
        </p>
      </div>
      <span className="material-icons-outlined text-slate-400">
        chevron_right
      </span>
    </div>
  );
};

export default CardWarehouses;