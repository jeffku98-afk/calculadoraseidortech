import { BackupAcronisState } from "./backup-acronis-store";

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

export function calcularTiempoBackupAcronis(
  state: BackupAcronisState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // TIEMPOS FIJOS (siempre se suman)
  
  // 1. CREACIÓN DE TENANT EN ACRONIS - 30 minutos
  totalMinutos += 30;
  desglose.push({
    concepto: "Creación de tenant en Acronis",
    tiempo: "30 min",
  });

  // 2. CREACIÓN DE PLANES DE COPIA DE SEGURIDAD - 30 minutos
  totalMinutos += 30;
  desglose.push({
    concepto: "Creación de planes de copia de seguridad",
    tiempo: "30 min",
  });

  // 3. SINCRONIZACIÓN DE CUENTAS - 2 horas
  totalMinutos += 120;
  desglose.push({
    concepto: "Sincronización de cuentas",
    tiempo: "2 horas",
  });

  // CONFIGURACIÓN SEGÚN PLATAFORMA

  if (state.plataforma === "google") {
    // GOOGLE
    
    // 4. CREACIÓN DE PROYECTO EN GOOGLE CLOUD PLATFORM - 2 horas (obligatorio)
    totalMinutos += 120;
    desglose.push({
      concepto: "Creación de proyecto en Google Cloud Platform",
      tiempo: "2 horas",
    });

    // 5. CUENTAS A ADICIONAR - 1 minuto por usuario
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
        concepto: "Cuentas a adicionar",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadUsuarios} usuarios (1 min c/u)`,
      });
    }
  } else if (state.plataforma === "microsoft") {
    // MICROSOFT
    
    // 4. CUENTAS A ADICIONAR - 1 minuto por usuario
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
        concepto: "Cuentas a adicionar",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadUsuarios} usuarios (1 min c/u)`,
      });
    }

    // 5. SITIOS DE SHAREPOINT - 2 minutos por sitio
    if (state.sitiosSharepoint && state.cantidadSitios > 0) {
      const minutosSitios = state.cantidadSitios * 2;
      totalMinutos += minutosSitios;
      const horas = Math.floor(minutosSitios / 60);
      const minutos = minutosSitios % 60;
      let tiempoTexto = "";
      if (horas > 0) {
        tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
        if (minutos > 0) tiempoTexto += ` ${minutos} min`;
      } else {
        tiempoTexto = `${minutos} min`;
      }
      desglose.push({
        concepto: "Sitios de SharePoint",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadSitios} sitios (2 min c/u)`,
      });
    }

    // 6. EQUIPOS DE TEAMS - 2 minutos por equipo
    if (state.equiposTeams && state.cantidadEquipos > 0) {
      const minutosEquipos = state.cantidadEquipos * 2;
      totalMinutos += minutosEquipos;
      const horas = Math.floor(minutosEquipos / 60);
      const minutos = minutosEquipos % 60;
      let tiempoTexto = "";
      if (horas > 0) {
        tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
        if (minutos > 0) tiempoTexto += ` ${minutos} min`;
      } else {
        tiempoTexto = `${minutos} min`;
      }
      desglose.push({
        concepto: "Equipos de Teams",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadEquipos} equipos (2 min c/u)`,
      });
    }
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