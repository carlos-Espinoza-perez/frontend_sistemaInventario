import InventoryCreateTemplate from "../../templates/inventory/InventoryCreateTemplate";

const InventoryCreate = ({ typeMovement }: { typeMovement: 'entrada' | 'salida'; }) => {
  return (
    <InventoryCreateTemplate typeMovement={typeMovement} />
  );
};

export default InventoryCreate;