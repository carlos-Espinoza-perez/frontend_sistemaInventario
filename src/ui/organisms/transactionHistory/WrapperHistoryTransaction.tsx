import type { IAgrupacionMovimiento } from "../../../interface/TransactionHistoryInterface";
import CardTransactionHistory from "../../molecules/transactionHistory/CardTransactionHistory";

const WrapperHistoryTransaction = ({ listTrasactionHistory, entry }: { listTrasactionHistory: IAgrupacionMovimiento[], entry: boolean }) => {
  return (
    <main className="flex-grow overflow-y-auto bg-[var(--bg-secondary)] p-4">
      <div className="space-y-6">
        {
          listTrasactionHistory.map((item, index) => (
            <div key={index}>
              <h2 className="text-[var(--text-secondary)] text-sm font-medium mb-2 px-2">{item.name}</h2>
              <div className="bg-[white] rounded-lg shadow-sm">
                {
                  item.listMovements.map((item, index) => (
                    <CardTransactionHistory key={index} item={{ ...item, entry }} />
                  ))
                }
              </div>              
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default WrapperHistoryTransaction;