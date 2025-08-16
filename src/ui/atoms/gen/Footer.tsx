import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: "dashboard", label: "Inicio", path: "/" },
    { icon: "warehouse", label: "Bodegas", path: "/warehouses" },
    { icon: "auto_awesome", label: "Asistente", path: "/assistant" },
  ];

  return (
    <footer className="sticky bottom-0 z-20 bg-[var(--surface-color)] border-t border-gray-200 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.05)] rounded-t-lg">
      <nav className="mx-auto flex max-w-md items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-md py-2 transition-colors ${isActive
                  ? "text-[var(--primary-color)] hover:bg-blue-50"
                  : "text-[var(--text-secondary)] hover:bg-gray-100"
                }`}
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <p className="text-xs font-medium">{item.label}</p>
            </Link>
          );
        })}
      </nav>
      <div className="h-safe-area-bottom bg-[var(--surface-color)]" />
    </footer>
  );
};

export default Footer;
