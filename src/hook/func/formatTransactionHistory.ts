import type { IAgrupacionMovimiento, IItemMovementGroupSaleAndPurchase } from "../../interface/TransactionHistoryInterface";

// 📌 Formateador de fechas en español
function formatearFechaES(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
  });
}

// 📌 Obtiene lunes de la semana
function getInicioSemana(dateStr: string): Date {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0: domingo, 1: lunes...
  const diff = (day === 0 ? -6 : 1) - day; // diferencia hasta lunes
  const lunes = new Date(date);
  lunes.setDate(date.getDate() + diff);
  lunes.setHours(0, 0, 0, 0);
  return lunes;
}

// 📌 Obtiene domingo de la semana
function getFinSemana(inicio: Date): Date {
  const domingo = new Date(inicio);
  domingo.setDate(inicio.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);
  return domingo;
}

// 📌 Formato final tipo: "Semana del 01 de julio al 07 de julio"
function formatearRangoSemana(inicio: Date, fin: Date): string {
  return `Semana del ${formatearFechaES(inicio)} al ${formatearFechaES(fin)}`;
}

export function agrupadoPorRangoFecha(lista: IItemMovementGroupSaleAndPurchase[]): IAgrupacionMovimiento[] {
  const semanasMap = new Map<string, IItemMovementGroupSaleAndPurchase[]>();

  lista.forEach((item) => {
    const inicio = getInicioSemana(item.created_at);
    const fin = getFinSemana(inicio);

    const key = `${inicio.toISOString()}|${fin.toISOString()}`;

    if (!semanasMap.has(key)) {
      semanasMap.set(key, []);
    }
    semanasMap.get(key)!.push(item);
  });

  const grupos: IAgrupacionMovimiento[] = [];

  semanasMap.forEach((items, key) => {
    const [inicioStr, finStr] = key.split("|");
    const inicio = new Date(inicioStr);
    const fin = new Date(finStr);

    const nombreSemana = formatearRangoSemana(inicio, fin);
    grupos.push({ name: nombreSemana, listMovements: items });
  });

  // Ordenar por la primera fecha de los elementos
  grupos.sort((a, b) => {
    const fechaA = new Date(a.listMovements[0].created_at).getTime();
    const fechaB = new Date(b.listMovements[0].created_at).getTime();
    return fechaA - fechaB;
  });

  return grupos;
}
