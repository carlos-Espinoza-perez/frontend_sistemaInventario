import type { IAgrupacionMovimiento, IItemMovementGroupSaleAndPurchase } from "../../interface/TransactionHistoryInterface";

// 📌 Formateador de fechas en español
function formatearFechaES(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
  });
}

export function agrupadoPorRangoFecha(lista: IItemMovementGroupSaleAndPurchase[]): IAgrupacionMovimiento[] {
  const diasMap = new Map<string, IItemMovementGroupSaleAndPurchase[]>();

  lista.forEach((item) => {
    const fecha = new Date(item.created_at);
    fecha.setHours(0, 0, 0, 0); // Eliminar hora para agrupar solo por fecha
    const key = fecha.toISOString().split("T")[0]; // "YYYY-MM-DD"

    if (!diasMap.has(key)) {
      diasMap.set(key, []);
    }
    diasMap.get(key)!.push(item);
  });

  const grupos: IAgrupacionMovimiento[] = [];

  diasMap.forEach((items, key) => {
    const fecha = new Date(key);
    const nombreDia = formatearFechaES(fecha);
    grupos.push({ name: nombreDia, listMovements: items });
  });

  // 📌 Ordenar por fecha descendente (más reciente primero)
  grupos.sort((a, b) => {
    const fechaA = new Date(a.listMovements[0].created_at).getTime();
    const fechaB = new Date(b.listMovements[0].created_at).getTime();
    return fechaB - fechaA;
  });

  return grupos;
}
