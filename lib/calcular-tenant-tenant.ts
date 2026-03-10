import { TenantTenantState } from "./tenant-tenant-store";

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

export function calcularTiempoTenantTenant(
  state: TenantTenantState
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

  // 3. USUARIOS - 1 minuto por usuario - RENOMBRADO
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

  // 4. SITIOS DE SHAREPOINT (ÚNICA DE ESTE MÓDULO - NO TOCAR)
  if (state.sitiosSharepoint && state.cantidadSitios > 0) {
    const minutosSitios = state.cantidadSitios * 60; // 1 hora por sitio
    totalMinutos += minutosSitios;
    desglose.push({
      concepto: "Migración de sitios de SharePoint",
      tiempo: `${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "hora" : "horas"
      }`,
      detalle: `${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "sitio" : "sitios"
      } (1h c/u)`,
    });
  }

  // 5. CONFIGURACIÓN DE PERMISOS (ÚNICA DE ESTE MÓDULO - NO TOCAR)
  if (
    state.sitiosSharepoint &&
    state.configuracionPermisos &&
    state.usuariosPorSitio > 0 &&
    state.cantidadSitios > 0
  ) {
    const minutosPermisos = state.usuariosPorSitio * state.cantidadSitios * 5;
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
      concepto: "Configuración de permisos de sitios",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosPorSitio} usuarios × ${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "sitio" : "sitios"
      } (5 min c/u)`,
    });
  }

  // CONFIGURACIONES ADICIONALES

  // 7. SEGURIDAD - Listas Blanca/Negra - MODIFICADO: 1 min por dominio
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

  // 8. SEGURIDAD - Listas de Distribución - NUEVO
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

  // 9. SEGURIDAD - Bloqueo de IPs (NO TOCAR)
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

  // 10. CREACIÓN DE REGLAS
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

  // 11. HERRAMIENTAS (ÚNICA DE ESTE MÓDULO - NO TOCAR)
  if (state.herramientaNativa) {
    totalMinutos += 180; // 3 horas
    desglose.push({
      concepto: "Configuración de herramienta nativa",
      tiempo: "3 horas",
    });
  }

  if (state.usarShareGate) {
    totalMinutos += 120; // 2 horas
    desglose.push({
      concepto: "Configuración de ShareGate",
      tiempo: "2 horas",
    });
  }

  // ALMACENAMIENTO - SIN LICENCIAS

  // 12. CREAR POLÍTICAS DE RETENCIÓN
  if (state.crearPoliticasRetencion) {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Crear políticas de retención",
      tiempo: "1 hora",
    });
  }

  // 13. POLÍTICAS DE RETENCIÓN (usuarios) - RENOMBRADO
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
      concepto: "Asignar políticas de retención",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosPoliticasRetencion} usuarios (5 min c/u)`,
    });
  }

  // 14. HABILITAR ARCHIVADO
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

  // 15. AUTO-EXPANDING ARCHIVADO - SIN VERIFICACIÓN DE LICENCIA
  if (state.autoExpandingArchivado && state.usuariosAutoExpanding > 0) {
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
      concepto: "Auto-expanding archivado",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosAutoExpanding} usuarios (5 min c/u)`,
    });
  }

  // 16. FORZAR ARCHIVADO - NUEVO
  if (state.forzarArchivado && state.usuariosForzarArchivado > 0) {
    const minutosForzar = state.usuariosForzarArchivado * 1;
    totalMinutos += minutosForzar;
    const horas = Math.floor(minutosForzar / 60);
    const minutos = minutosForzar % 60;
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
      detalle: `${state.usuariosForzarArchivado} usuarios (1 min c/u)`,
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