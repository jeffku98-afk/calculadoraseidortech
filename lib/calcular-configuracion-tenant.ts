import { ConfiguracionTenantState } from "./configuracion-tenant-store";

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

export function calcularTiempoConfiguracionTenant(
  state: ConfiguracionTenantState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // 1. CREACIÓN DE TENANT - 2 horas
  if (state.creacionTenant) {
    totalMinutos += 120; // 2 horas
    desglose.push({
      concepto: "Creación de Tenant",
      tiempo: "2 horas",
    });
  }

  // 2. MIGRACIÓN DE DOMINIO - 2 horas
  if (state.migracionDominio) {
    totalMinutos += 120; // 2 horas
    desglose.push({
      concepto: "Migración de Dominio",
      tiempo: "2 horas",
    });
  }

  // 3. CREACIÓN DE USUARIOS - 1 minuto por usuario
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
      concepto: "Creación de usuarios",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadUsuarios} usuarios (1 min c/u)`,
    });
  }

  // CONFIGURACIONES ADICIONALES

  // 4. CREAR POLÍTICAS DE RETENCIÓN - 30 minutos
  if (state.crearPoliticasRetencion) {
    totalMinutos += 30;
    desglose.push({
      concepto: "Crear políticas de retención",
      tiempo: "30 min",
    });
  }

  // 5. ASIGNACIÓN POR USUARIO - 5 minutos por usuario
  if (state.asignacionPorUsuario && state.cantidadAsignacion > 0) {
    const minutosAsignacion = state.cantidadAsignacion * 5;
    totalMinutos += minutosAsignacion;
    const horas = Math.floor(minutosAsignacion / 60);
    const minutos = minutosAsignacion % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Asignación por usuario",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadAsignacion} usuarios (5 min c/u)`,
    });
  }

  // 6. HABILITAR ARCHIVADO - 2 minutos por usuario
  if (state.habilitarArchivado && state.cantidadArchivado > 0) {
    const minutosArchivado = state.cantidadArchivado * 2;
    totalMinutos += minutosArchivado;
    const horas = Math.floor(minutosArchivado / 60);
    const minutos = minutosArchivado % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Habilitar archivado",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadArchivado} usuarios (2 min c/u)`,
    });
  }

  // 7. FORZAR ARCHIVADO - 1 minuto por usuario
  if (state.forzarArchivado && state.cantidadForzado > 0) {
    const minutosForzado = state.cantidadForzado * 1;
    totalMinutos += minutosForzado;
    const horas = Math.floor(minutosForzado / 60);
    const minutos = minutosForzado % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Forzar archivado",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadForzado} usuarios (1 min c/u)`,
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