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

  // 2. DOMINIOS - 1 HORA POR DOMINIO
  if (state.cantidadDominios > 0) {
    const minutosDominios = state.cantidadDominios * 60;
    totalMinutos += minutosDominios;
    const horas = Math.floor(minutosDominios / 60);
    const minutos = minutosDominios % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Migración de dominios",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadDominios} ${state.cantidadDominios === 1 ? "dominio" : "dominios"} (1 hora c/u)`,
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

  // 4. HERRAMIENTAS - Herramienta Nativa (ShareGate no suma tiempo)
  if (state.herramientaNativa) {
    totalMinutos += 180; // 3 horas
    desglose.push({
      concepto: "Herramienta nativa de Microsoft",
      tiempo: "3 horas",
    });
  }
  // NOTA: ShareGate no suma tiempo, solo controla si se pueden habilitar Sitios de SharePoint

  // 5. SITIOS DE SHAREPOINT (controlados por ShareGate)
  // Migración de sitios - MODIFICADO: 3 horas FIJAS
  if (state.sitiosSharepoint) {
    totalMinutos += 180; // 3 horas fijas
    desglose.push({
      concepto: "Migración de sitios de SharePoint",
      tiempo: "3 horas",
    });
  }

  // Configuración de permisos - MODIFICADO: 5 min por sitio
  if (state.configuracionPermisos && state.cantidadSitios > 0) {
    const minutosPermisos = state.cantidadSitios * 5;
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
      concepto: "Configuración de permisos",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadSitios} ${
        state.cantidadSitios === 1 ? "sitio" : "sitios"
      } (5 min c/u)`,
    });
  }

  // 6. LISTAS BLANCA/NEGRA - 1 minuto por dominio
  if (state.listasBlancaNegra && state.cantidadDominiosListas > 0) {
    const minutosListasBN = state.cantidadDominiosListas * 1;
    totalMinutos += minutosListasBN;
    const horas = Math.floor(minutosListasBN / 60);
    const minutos = minutosListasBN % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Creación de lista blanca/lista negra",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadDominiosListas} ${
        state.cantidadDominiosListas === 1 ? "dominio" : "dominios"
      } (1 min c/u)`,
    });
  }

  // 7. LISTAS DE DISTRIBUCIÓN - 15 minutos por lista
  if (state.listasDistribucion && state.cantidadListasDistribucion > 0) {
    const minutosListas = state.cantidadListasDistribucion * 15;
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
      concepto: "Listas de distribución",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadListasDistribucion} ${
        state.cantidadListasDistribucion === 1 ? "lista" : "listas"
      } (15 min c/u)`,
    });
  }

  // 9. CREACIÓN DE REGLAS - 15 minutos por regla
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

  // ALMACENAMIENTO - SIN LICENCIAS

  // 10. CREAR POLÍTICAS DE RETENCIÓN
  if (state.crearPoliticasRetencion) {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Crear políticas de retención",
      tiempo: "1 hora",
    });
  }

  // 11. POLÍTICAS DE RETENCIÓN (usuarios)
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

  // 12. HABILITAR ARCHIVADO
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

  // 13. AUTO-EXPANDING ARCHIVADO - MODIFICADO: 2 min por usuario
  if (state.autoExpandingArchivado && state.usuariosAutoExpanding > 0) {
    const minutosAutoExp = state.usuariosAutoExpanding * 2;
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
      detalle: `${state.usuariosAutoExpanding} usuarios (2 min c/u)`,
    });
  }

  // 14. FORZAR ARCHIVADO
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

  // 15. INFORME DE MIGRACIÓN - NUEVO
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