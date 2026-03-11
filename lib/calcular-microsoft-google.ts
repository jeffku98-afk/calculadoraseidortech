import { MicrosoftGoogleState } from "./microsoft-google-store";

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

export function calcularTiempoMicrosoftGoogle(
  state: MicrosoftGoogleState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // 1. PANEL
  if (state.panel === "crear") {
    totalMinutos += 120; // 2 horas
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

  // 2. DOMINIOS - 1 hora por dominio
  if (state.cantidadDominios > 0) {
    const minutosDominios = state.cantidadDominios * 60;
    totalMinutos += minutosDominios;
    desglose.push({
      concepto: "Configuración de dominios",
      tiempo: `${state.cantidadDominios} ${
        state.cantidadDominios === 1 ? "hora" : "horas"
      }`,
      detalle: `${state.cantidadDominios} ${
        state.cantidadDominios === 1 ? "dominio" : "dominios"
      } (1h c/u)`,
    });
  }

  // 3. USUARIOS - 1 minuto por usuario
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

  // 4. CONFIGURACIÓN DE TENANT - FUSIONADA (igual que Google→Microsoft)
  if (state.configuracionTenant === "bittitan") {
    totalMinutos += 780; // 13 horas (3h Google + 10h Microsoft)
    desglose.push({
      concepto: "Configuración de Tenant (BitTitan)",
      tiempo: "13 horas",
      detalle: "Configurar Google: 3 horas - Configurar Microsoft: 10 horas",
    });
  } else {
    // Nativa - Por definir (0 horas por ahora)
    desglose.push({
      concepto: "Configuración de Tenant (Nativa)",
      tiempo: "Por definir",
      detalle: "Tiempo a determinar según configuración específica",
    });
  }

  // CONFIGURACIONES ADICIONALES

  // 5. SEGURIDAD - Listas Blanca/Negra
  if (state.listasBlancaNegra && state.cantidadDominiosListas > 0) {
    const minutosListas = state.cantidadDominiosListas * 1;
    totalMinutos += minutosListas;
    const horas = Math.floor(minutosListas / 60);
    const minutos = minutosListas % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Listas blanca/negra (cuentas, dominios e IPs)",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadDominiosListas} ${
        state.cantidadDominiosListas === 1 ? "dominio" : "dominios"
      } (1 min c/u)`,
    });
  }

  // 6. SEGURIDAD - Listas de Distribución
  if (state.listasDistribucion && state.cantidadListasDistribucion > 0) {
    const minutosDistribucion = state.cantidadListasDistribucion * 15;
    totalMinutos += minutosDistribucion;
    const horas = Math.floor(minutosDistribucion / 60);
    const minutos = minutosDistribucion % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Listas de distribución",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadListasDistribucion} ${
        state.cantidadListasDistribucion === 1 ? "lista" : "listas"
      } (15 min c/u)`,
    });
  }

  // 7. CREACIÓN DE REGLAS
  if (state.crearReglas && state.cantidadReglas > 0) {
    const minutosReglas = state.cantidadReglas * 15;
    totalMinutos += minutosReglas;
    const horas = Math.floor(minutosReglas / 60);
    const minutos = minutosReglas % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Creación de reglas",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadReglas} reglas (15 min c/u)`,
    });
  }

  // 8. MONITOREO DE USUARIOS
  if (state.monitoreoUsuarios > 0) {
    const minutosMonitoreo = state.monitoreoUsuarios * 10;
    totalMinutos += minutosMonitoreo;
    const horas = Math.floor(minutosMonitoreo / 60);
    const minutos = minutosMonitoreo % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Monitoreo de usuarios",
      tiempo: tiempoTexto,
      detalle: `${state.monitoreoUsuarios} usuarios (10 min c/u)`,
    });
  }

  // 9. INFORME DE MIGRACIÓN - NUEVO
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