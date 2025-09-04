import { useNavigate } from "react-router-dom";

const HeaderActionBack = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const goToBack = () => navigate(-1);

  return (
    <header className="sticky top-0 z-10 bg-[var(--surface-color)] shadow-sm">
      <div className="flex items-center p-4">
        <button
          aria-label="Back"
          className="text-[var(--primary-text-color)] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
          onClick={goToBack}
        >
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h1 className="text-[var(--primary-text-color)] text-xl font-semibold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default HeaderActionBack;