import moment from "moment-timezone";
import type { IAgrupacionMovimiento, IItemMovementGroupSaleAndPurchase } from "../../interface/TransactionHistoryInterface";

// 📌 Formateador de fechas en español
function formatearFechaES(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
  });
}

export function agrupadoPorRangoFecha(
  lista: IItemMovementGroupSaleAndPurchase[]
): IAgrupacionMovimiento[] {
  const diasMap = new Map<string, IItemMovementGroupSaleAndPurchase[]>();

  lista.forEach((item) => {
    // 🔽 Convertir created_at (UTC) → Managua (UTC-6)
    const fechaLocal = moment.utc(item.created_at).utcOffset(0).tz("America/Managua");
    console.log({ fechaLocal: fechaLocal.format("YYYY-MM-DD HH:mm"), created_at: item.created_at.toString() });

    // Eliminar hora para agrupar solo por fecha
    const key = fechaLocal.format("YYYY-MM-DD");

    if (!diasMap.has(key)) {
      diasMap.set(key, []);
    }
    diasMap.get(key)!.push({
      ...item,
      created_at: fechaLocal.toDate().toString(), // opcional: guardar ya convertido
    });
  });

  const grupos: IAgrupacionMovimiento[] = [];

  diasMap.forEach((items, key) => {
    // Usamos moment para formatear la fecha en español
    const fechaLocal = moment.tz(key, "YYYY-MM-DD", "America/Managua");
    const nombreDia = formatearFechaES(fechaLocal.toDate());

    grupos.push({ name: nombreDia, listMovements: items });
  });

  // 📌 Ordenar por fecha descendente (más reciente primero)
  grupos.sort((a, b) => {
    const fechaA = moment(a.listMovements[0].created_at).valueOf();
    const fechaB = moment(b.listMovements[0].created_at).valueOf();
    return fechaB - fechaA;
  });

  return grupos;
}