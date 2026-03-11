import { PSTMicrosoftState } from "./pst-microsoft-store";

export interface TiempoCalculado {
  horas: number;
  minutos: number;
  total: number; // en minutos
  desglose: {
    concepto: string;
    tiempo: string;
    detalle?: string;
  }[];
}

export function calcularTiempoPSTMicrosoft(
  state: PSTMicrosoftState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // 1. PANEL - MODIFICADO: Crear ahora es 2 horas
  if (state.panel === "crear") {
    totalMinutos += 120; // 2 horas (antes 3)
    desglose.push({
      concepto: "Creación de panel",
      tiempo: "2 horas",
    });
  } else {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Panel existente",
      tiempo: "1 hora",
    });
  }

  // 2. USUARIOS - 1 minuto por usuario - RENOMBRADO
  if (state.cantidadUsuarios > 0) {
    const minutosUsuarios = state.cantidadUsuarios * 1;
    totalMinutos += minutosUsuarios;
    const horas = Math.floor(minutosUsuarios / 60);
    const minutos = minutosUsuarios % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Crear usuarios y asignar licencias",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadUsuarios} usuarios (1 min c/u)`,
    });
  }

  // NOTA: El tamaño máximo es solo referencial, no se suma al tiempo

  // 3. INFORME DE MIGRACIÓN - NUEVO
  if (state.informeMigracion) {
    totalMinutos += 60; // 1 hora por informe
    desglose.push({
      concepto: "Informe de migración",
      tiempo: "1 hora",
      detalle: `Frecuencia: ${state.frecuenciaInforme}`,
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