import { GoogleMicrosoftState } from "./google-microsoft-store";

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

export function calcularTiempoGoogleMicrosoft(
  state: GoogleMicrosoftState
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

  // 3. USUARIOS - 5 minutos por usuario
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

  // 4. CONFIGURACIÓN DE TENANT
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

  // 5. CONFIGURACIÓN DE BITTITAN
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

  // 6. SEGURIDAD - Lista Blanca/Negra
  if (state.listaBlancaNegra) {
    totalMinutos += 120; // 2 horas
    desglose.push({
      concepto: "Configuración de Lista Blanca/Negra",
      tiempo: "2 horas",
    });
  }

  // 7. SEGURIDAD - Bloqueo de IPs
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

  // 8. CREACIÓN DE REGLAS
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

  // ALMACENAMIENTO

  // 9. CREAR POLÍTICAS DE RETENCIÓN
  if (state.crearPoliticasRetencion) {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Crear políticas de retención",
      tiempo: "1 hora",
    });
  }

  // 10. POLÍTICAS DE RETENCIÓN (usuarios)
  if (state.politicasRetencion && state.usuariosPoliticasRetencion > 0) {
    const minutosPolRet = state.usuariosPoliticasRetencion * 5;
    totalMinutos += minutosPolRet;
    const horas = Math.floor(minutosPolRet / 60);
    const minutos = minutosPolRet % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Políticas de retención",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosPoliticasRetencion} usuarios (5 min c/u)`,
    });
  }

  // 11. HABILITAR ARCHIVADO
  if (state.habilitarArchivado && state.usuariosArchivado > 0) {
    const minutosArch = state.usuariosArchivado * 5;
    totalMinutos += minutosArch;
    const horas = Math.floor(minutosArch / 60);
    const minutos = minutosArch % 60;
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
      detalle: `${state.usuariosArchivado} usuarios (5 min c/u)`,
    });
  }

  // 12. AUTO-EXPANDING ARCHIVADO (Premium)
  if (
    state.licenciaTenant === "premium" &&
    state.autoExpandingArchivado &&
    state.usuariosAutoExpanding > 0
  ) {
    const minutosAutoExp = state.usuariosAutoExpanding * 5;
    totalMinutos += minutosAutoExp;
    const horas = Math.floor(minutosAutoExp / 60);
    const minutos = minutosAutoExp % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Auto-expanding archivado (Premium)",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosAutoExpanding} usuarios (5 min c/u)`,
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