import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import CardDetailEntryTransaction from "../../organisms/transactionHistory/CardDetailEntryTransaction";
import ContentDetailEntryTransaction from "../../organisms/transactionHistory/ContentDetailEntryTransaction";

const EntryTransactionTemplate = () => {
  return (
    <>
      <HeaderActionBack title="Ingreso de inventario"/>
    
      <main className="p-4 space-y-6">
        <CardDetailEntryTransaction />

        <ContentDetailEntryTransaction />
      </main>
    </>
  );
};

export default EntryTransactionTemplate;