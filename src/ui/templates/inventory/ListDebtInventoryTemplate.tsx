import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import ListSaleDebtInventory from "../../organisms/inventory/ListSaleDebtInventory";

const ListDebtInventoryTemplate = () => {
  return (
    <>
      <HeaderActionBack title={"Lista de fiados"} />
      <ListSaleDebtInventory />
    </>
  );
};

export default ListDebtInventoryTemplate;