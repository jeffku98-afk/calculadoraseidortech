import { FileServerSharePointState } from "./fileserver-sharepoint-store";

export interface TiempoCalculado {
  horas: number;
  minutos: number;
  total: number; // en minutos
  desglose: {
    concepto: string;
    tiempo: string;
    detalle?: string;
  }[];
  // Tiempo de migración (NO suma a horas de operación)
  tiempoMigracion: {
    horas: number;
    minutos: number;
    total: number; // en minutos
    pesoGB: number;
  } | null;
}

export function calcularTiempoFileServerSharePoint(
  state: FileServerSharePointState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // 1. INSTALACIÓN Y CONFIGURACIÓN - FIJO 1 HORA
  totalMinutos += 60; // 1 hora
  desglose.push({
    concepto: "Instalación y configuración de SharePoint Migration Tools",
    tiempo: "1 hora",
    detalle: "Tiempo fijo de configuración",
  });

  // 2. CREACIÓN DE SITIOS - 5 minutos por sitio
  if (state.cantidadSitios > 0) {
    const minutosSitios = state.cantidadSitios * 5;
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
      concepto: "Creación de Sitios",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "sitio" : "sitios"
      } (5 min c/u)`,
    });
  }

  // 3. PERMISOS, SEGUIMIENTO Y MONITOREO - 15 minutos por sitio
  if (state.cantidadSitios > 0) {
    const minutosPermisos = state.cantidadSitios * 15;
    totalMinutos += minutosPermisos;
    const horas = Math.floor(minutosPermisos / 60);
    const minutos = minutosPermisos % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Permisos, Seguimiento y monitoreo de sitios",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "sitio" : "sitios"
      } (15 min c/u)`,
    });
  }

  // TIEMPO ESTIMADO DE MIGRACIÓN (NO SUMA A HORAS DE OPERACIÓN)
  let tiempoMigracion: TiempoCalculado["tiempoMigracion"] = null;
  if (state.pesoGB > 0) {
    const minutosMigracion = state.pesoGB * 6; // 6 minutos por GB
    const horasMigracion = Math.floor(minutosMigracion / 60);
    const minutosMigracionResto = minutosMigracion % 60;
    
    tiempoMigracion = {
      horas: horasMigracion,
      minutos: minutosMigracionResto,
      total: minutosMigracion,
      pesoGB: state.pesoGB,
    };
  }

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return {
    horas,
    minutos,
    total: totalMinutos,
    desglose,
    tiempoMigracion,
  };
}

export function formatearTiempo(horas: number, minutos: number): string {
  if (horas === 0 && minutos === 0) return "0 minutos";
  if (horas === 0) return `${minutos} minutos`;
  if (minutos === 0) return `${horas} ${horas === 1 ? "hora" : "horas"}`;
  return `${horas} ${horas === 1 ? "hora" : "horas"} y ${minutos} minutos`;
}