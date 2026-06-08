import { FileServerSharePointState } from "./fileserver-sharepoint-store";

export interface TiempoCalculado {
  horas: number;
  minutos: number;
  total: number; // en minutos
  desglose: {
    concepto: string;
    tiempo: string;
    detalle?: string;
    seccion?: string; // Para agrupar visualmente en el PDF
  }[];
}

// Helper para formatear minutos a texto "X horas Y min"
function formatMinutos(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h > 0 && m > 0) return `${h} ${h === 1 ? "hora" : "horas"} ${m} min`;
  if (h > 0) return `${h} ${h === 1 ? "hora" : "horas"}`;
  return `${m} min`;
}

export function calcularTiempoFileServerSharePoint(
  state: FileServerSharePointState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 1: LEVANTAMIENTO DE INFORMACIÓN — FIJO 2.5 HORAS
  // ─────────────────────────────────────────────────────────
  // 1a. Inventario del file server: 1 hora
  totalMinutos += 60;
  desglose.push({
    concepto: "Inventario del file server",
    tiempo: "1 hora",
    detalle: "Tamaño, cantidad de archivos, profundidad de rutas",
    seccion: "Levantamiento de información",
  });

  // 1b. Revisión de estructura de permisos NTFS: 1 hora
  totalMinutos += 60;
  desglose.push({
    concepto: "Revisión de estructura de permisos NTFS",
    tiempo: "1 hora",
    seccion: "Levantamiento de información",
  });

  // 1c. Definición de taxonomía destino en SPO: 30 min (0.5h)
  totalMinutos += 30;
  desglose.push({
    concepto: "Definición de taxonomía destino en SPO",
    tiempo: "30 min",
    seccion: "Levantamiento de información",
  });

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 2: PREPARAR MIGRACIÓN Y DESTINO — 2h fijo + sitios
  // ─────────────────────────────────────────────────────────
  // 2a. Creación de sitio SPO + configuración de permisos: 15 min por sitio
  if (state.cantidadSitios > 0) {
    const minutosSitios = state.cantidadSitios * 15;
    totalMinutos += minutosSitios;
    desglose.push({
      concepto: "Creación de sitio SharePoint y configuración de permisos SPO",
      tiempo: formatMinutos(minutosSitios),
      detalle: `${state.cantidadSitios} ${state.cantidadSitios === 1 ? "sitio" : "sitios"} (15 min c/u)`,
      seccion: "Preparar migración y destino",
    });
  }

  // 2b. Instalar agente y configurar credenciales: 2 horas fijo
  totalMinutos += 120;
  desglose.push({
    concepto: "Instalar agente y configurar credenciales",
    tiempo: "2 horas",
    seccion: "Preparar migración y destino",
  });

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 3: EJECUCIÓN DE MIGRACIÓN
  // ─────────────────────────────────────────────────────────
  // 3a. Monitoreo de migración: 2h por TB (mínimo 2h)
  if (state.pesoMigracion > 0) {
    // Convertir todo a TB para el cálculo
    const pesoEnTB = state.unidadPesoMigracion === "GB"
      ? state.pesoMigracion / 1024
      : state.pesoMigracion;

    // 2 horas por TB, mínimo 2 horas
    const horasMonitoreo = Math.max(2, pesoEnTB * 2);
    const minutosMonitoreo = Math.round(horasMonitoreo * 60);

    totalMinutos += minutosMonitoreo;

    // Formatear el peso para el detalle
    const pesoTexto = state.unidadPesoMigracion === "TB"
      ? `${state.pesoMigracion} TB`
      : `${state.pesoMigracion} GB (${pesoEnTB.toFixed(2)} TB)`;

    // Indicar si se aplicó el mínimo
    const esMinimoAplicado = pesoEnTB < 1;
    const detalleMonitoreo = esMinimoAplicado
      ? `${pesoTexto} — se aplica tiempo mínimo de 2 horas`
      : `${pesoTexto} × 2 horas/TB`;

    desglose.push({
      concepto: "Monitoreo de migración",
      tiempo: formatMinutos(minutosMonitoreo),
      detalle: detalleMonitoreo,
      seccion: "Ejecución de migración",
    });
  }

  // 3b. Revisar Logs: 3 horas fijo
  totalMinutos += 180;
  desglose.push({
    concepto: "Revisión de logs",
    tiempo: "3 horas",
    seccion: "Ejecución de migración",
  });

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 4: VALIDACIÓN POST-MIGRACIÓN — FIJO 2 HORAS
  // ─────────────────────────────────────────────────────────
  totalMinutos += 120;
  desglose.push({
    concepto: "Validación post-migración",
    tiempo: "2 horas",
    detalle: "Integridad de archivos/carpetas · Permisos · Validación de accesos · Desactivación/redireccionamiento del file server origen",
    seccion: "Validación post-migración",
  });

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 5: ELABORAR INFORME Y PRESENTACIÓN — FIJO 2 HORAS
  // ─────────────────────────────────────────────────────────
  totalMinutos += 120;
  desglose.push({
    concepto: "Elaborar informe y presentación",
    tiempo: "2 horas",
    seccion: "Informe y presentación",
  });

  // ─────────────────────────────────────────────────────────
  // SECCIÓN 6: TIEMPO ESTIMADO DE MIGRACIÓN — 6 min/GB
  // Solo se suma al total si incluirTiempoMigracion === true
  // ─────────────────────────────────────────────────────────
  if (state.pesoTiempoMigracion > 0 && state.incluirTiempoMigracion) {
    const pesoEnGB = state.unidadPesoTiempoMigracion === "TB"
      ? state.pesoTiempoMigracion * 1024
      : state.pesoTiempoMigracion;

    const minutosMigracion = Math.round(pesoEnGB * 6);
    totalMinutos += minutosMigracion;

    desglose.push({
      concepto: "Tiempo estimado de migración",
      tiempo: formatMinutos(minutosMigracion),
      detalle: `${state.pesoTiempoMigracion} ${state.unidadPesoTiempoMigracion} × 6 min/GB = ${pesoEnGB.toFixed(2)} GB`,
      seccion: "Tiempo estimado de migración",
    });
  }

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return {
    horas,
    minutos,
    total: totalMinutos,
    desglose,
  };
}

export function formatearTiempo(horas: number, minutos: number): string {
  if (horas === 0 && minutos === 0) return "0 minutos";
  if (horas === 0) return `${minutos} minutos`;
  if (minutos === 0) return `${horas} ${horas === 1 ? "hora" : "horas"}`;
  return `${horas} ${horas === 1 ? "hora" : "horas"} y ${minutos} minutos`;
}