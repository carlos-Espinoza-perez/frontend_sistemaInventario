const HeaderDashboard = () => {
  return (
    <header className="sticky top-0 z-20 bg-[var(--surface-color)] shadow-md">
      <div className="mx-auto flex max-w-md items-center p-4">
        <h1 className="text-[var(--text-primary)] text-xl font-medium leading-tight">
          Inventario
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <button className="text-[var(--text-secondary)] p-2">
            <span className="material-icons-outlined">notifications</span>
          </button>
          <button className="text-[var(--text-secondary)] p-2">
            <span className="material-icons-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;