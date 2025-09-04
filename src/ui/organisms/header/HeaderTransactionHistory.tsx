import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { setValueTabView } from "../../../features/TransactionHistorySlice";

const HeaderTransactionHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const tab = useAppSelector(a => a.transactionHistory.valueTabView);

  

  return (
    <header className="sticky top-0 z-10  shadow-sm bg-white">
      <div className="flex items-center p-4 pb-2 justify-between">
        <button
          className="text-[var(--text-primary)] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
          onClick={() => navigate(-1)}
        >
          <span className="material-icons-outlined text-2xl">
            arrow_back_ios_new
          </span>
        </button>
        <h1 className="text-[var(--text-primary)] text-xl font-semibold leading-tight tracking-tight flex-1 text-center">Historial de Transacciones</h1>
        <div className="size-10 shrink-0"></div>
      </div>
      <nav className="pb-0">
        <Tabs
          value={tab}
          onChange={(_, newValue) => dispatch(setValueTabView(newValue))}
          variant="fullWidth"
          sx={{
            height: "48px",
            borderBottom: "1px solid var(--border-color)",
            px: 2,
            minHeight: 0,
            "& .MuiTabs-indicator": {
              height: 3,
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          <Tab
            label={
              <p className="text-sm font-medium leading-normal tracking-wide">Entradas</p>
            }
            sx={{
              color: tab === 0 ? "var(--primary-color)" : "var(--text-secondary)",
              minHeight: 0,
              height: "48px",
              py: 3,
              borderBottom: tab === 0 ? "3px solid var(--primary-color)" : "3px solid transparent",
              transition: "color 0.2s, border-bottom 0.2s",
              flex: 1,
              "&:hover": {
                color: "var(--text-primary)",
                borderBottom: "3px solid var(--text-secondary)",
              },
            }}
          />
          <Tab
            label={
              <p className="text-sm font-medium leading-normal tracking-wide">Salidas</p>
            }
            sx={{
              color: tab === 1 ? "var(--primary-color)" : "var(--text-secondary)",
              minHeight: 0,
              py: 3,
              height: "48px",

              borderBottom: tab === 1 ? "3px solid var(--primary-color)" : "3px solid transparent",
              transition: "color 0.2s, border-bottom 0.2s",
              flex: 1,
              "&:hover": {
                color: "var(--text-primary)",
                borderBottom: "3px solid var(--text-secondary)",
              },
            }}
          />
        </Tabs>
      </nav>
    </header>
  );
};

export default HeaderTransactionHistory;