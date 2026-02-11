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
    totalMinutos += 180; // 3 horas
    desglose.push({
      concepto: "Creación de panel",
      tiempo: "3 horas",
    });
  } else {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Panel existente",
      tiempo: "1 hora",
    });
  }

  // 2. USUARIOS - 5 minutos por usuario
  if (state.cantidadUsuarios > 0) {
    const minutosUsuarios = state.cantidadUsuarios * 5;
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
      concepto: "Configuración de usuarios",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadUsuarios} usuarios (5 min c/u)`,
    });
  }

  // 3. CONFIGURACIÓN DE TENANT
  if (state.configuracionTenant === "google") {
    totalMinutos += 180; // 3 horas
    desglose.push({
      concepto: "Configuración de tenant Google",
      tiempo: "3 horas",
    });
  } else {
    totalMinutos += 600; // 10 horas
    desglose.push({
      concepto: "Configuración de tenant Microsoft",
      tiempo: "10 horas",
    });
  }

  // 4. CONFIGURACIÓN DE BITTITAN
  if (state.mailbox) {
    totalMinutos += 300; // 5 horas
    desglose.push({
      concepto: "Configuración de Mailbox (BitTitan)",
      tiempo: "5 horas",
    });
  }
  if (state.onedrive) {
    totalMinutos += 300; // 5 horas
    desglose.push({
      concepto: "Configuración de OneDrive (BitTitan)",
      tiempo: "5 horas",
    });
  }

  // CONFIGURACIONES ADICIONALES

  // 5. SEGURIDAD - Lista Blanca/Negra
  if (state.listaBlancaNegra) {
    totalMinutos += 120; // 2 horas
    desglose.push({
      concepto: "Configuración de Lista Blanca/Negra",
      tiempo: "2 horas",
    });
  }

  // 6. SEGURIDAD - Bloqueo de IPs
  if (state.bloqueoIPs && state.cantidadIPs > 0) {
    const minutosIPs = state.cantidadIPs * 5;
    totalMinutos += minutosIPs;
    const horas = Math.floor(minutosIPs / 60);
    const minutos = minutosIPs % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Bloqueo de IPs",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadIPs} IPs (5 min c/u)`,
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