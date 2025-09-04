import ListItemToInventoryMovements from "./ListItemToInventoryMovements";

const FormCreateNewInventoryWarehouse = ({ typeMovement }: {
  typeMovement: 'entrada' | 'salida';
}) => {
  return (
    <main className="p-4 space-y-6">
      {/* <div>
        <h2 className="text-[var(--text-primary)] text-base font-medium leading-tight mb-2">Tipo de movimiento</h2>

        <div className="flex space-x-3">
          <label className="flex-1 text-sm font-medium leading-normal flex items-center justify-center rounded-lg border border-[var(--border-color)] px-4 h-12 text-[var(--text-primary)] has-[:checked]:border-2 has-[:checked]:border-[var(--primary-color)] has-[:checked]:bg-blue-50 relative cursor-pointer transition-all duration-200 ease-in-out">
            <input
              className="sr-only"
              name="movement_type"
              type="radio"
              value="entrada"
              checked={typeMovement === 'entrada'}
              onChange={handleTypeMovementChange}
            />
            Entrada
          </label>
          <label className="flex-1 text-sm font-medium leading-normal flex items-center justify-center rounded-lg border border-[var(--border-color)] px-4 h-12 text-[var(--text-primary)] has-[:checked]:border-2 has-[:checked]:border-[var(--primary-color)] has-[:checked]:bg-blue-50 relative cursor-pointer transition-all duration-200 ease-in-out">
            <input
              className="sr-only"
              name="movement_type"
              type="radio"
              value="salida"
              checked={typeMovement === 'salida'}
              onChange={handleTypeMovementChange}
            />
            Salida
          </label>
        </div>
      </div> */}


      <ListItemToInventoryMovements type={typeMovement} />
    </main>
  );
};

export default FormCreateNewInventoryWarehouse;