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
  consideraciones: {
    concepto: string;
    detalle: string;
  }[];
}

export function calcularTiempoTenantTenant(
  state: TenantTenantState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  const consideraciones: TiempoCalculado["consideraciones"] = [];
  let totalMinutos = 0;

  // 1. PANEL
  if (state.panel === "crear") {
    totalMinutos += 120;
    desglose.push({ concepto: "Creación de panel", tiempo: "2 horas" });
  } else {
    totalMinutos += 60;
    desglose.push({ concepto: "Panel existente", tiempo: "1 hora" });
  }

  // 2. DOMINIOS - 1 HORA POR DOMINIO
  if (state.cantidadDominios > 0) {
    const minutosDominios = state.cantidadDominios * 60;
    totalMinutos += minutosDominios;
    const horas = Math.floor(minutosDominios / 60);
    const minutos = minutosDominios % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
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
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Crear usuarios y asignar licencias",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadUsuarios} usuarios (1 min c/u)`,
    });
  }

  // 4. HERRAMIENTAS - Herramienta Nativa
  if (state.herramientaNativa) {
    totalMinutos += 900; // 15 horas
    desglose.push({
      concepto: "Herramienta nativa de Microsoft",
      tiempo: "15 horas",
      detalle: "Sujeto a limitaciones de la herramienta nativa",
    });
  }

  // 5. SITIOS DE SHAREPOINT
  if (state.sitiosSharepoint) {
    totalMinutos += 180;
    desglose.push({ concepto: "Migración de sitios de SharePoint", tiempo: "3 horas" });
  }

  if (state.configuracionPermisos && state.cantidadSitios > 0) {
    const minutosPermisos = state.cantidadSitios * 5;
    totalMinutos += minutosPermisos;
    const horas = Math.floor(minutosPermisos / 60);
    const minutos = minutosPermisos % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Configuración de permisos",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadSitios} ${state.cantidadSitios === 1 ? "sitio" : "sitios"} (5 min c/u)`,
    });
  }

  // 6. LISTAS BLANCA/NEGRA
  if (state.listasBlancaNegra && state.cantidadDominiosListas > 0) {
    const minutosListasBN = state.cantidadDominiosListas * 1;
    totalMinutos += minutosListasBN;
    const horas = Math.floor(minutosListasBN / 60);
    const minutos = minutosListasBN % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Creación de lista blanca/lista negra",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadDominiosListas} ${state.cantidadDominiosListas === 1 ? "dominio" : "dominios"} (1 min c/u)`,
    });
  }

  // 7. LISTAS DE DISTRIBUCIÓN
  if (state.listasDistribucion && state.cantidadListasDistribucion > 0) {
    const minutosListas = state.cantidadListasDistribucion * 15;
    totalMinutos += minutosListas;
    const horas = Math.floor(minutosListas / 60);
    const minutos = minutosListas % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Listas de distribución",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadListasDistribucion} ${state.cantidadListasDistribucion === 1 ? "lista" : "listas"} (15 min c/u)`,
    });
  }

  // 8. BLOQUEO DE IPs
  if (state.bloqueoIPs && state.cantidadIPs > 0) {
    const minutosBloqueo = state.cantidadIPs * 5;
    totalMinutos += minutosBloqueo;
    const horas = Math.floor(minutosBloqueo / 60);
    const minutos = minutosBloqueo % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Bloqueo de IPs",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadIPs} IPs (5 min c/u)`,
    });
  }

  // 9. CREACIÓN DE REGLAS
  if (state.crearReglas && state.cantidadReglas > 0) {
    const minutosReglas = state.cantidadReglas * 15;
    totalMinutos += minutosReglas;
    const horas = Math.floor(minutosReglas / 60);
    const minutos = minutosReglas % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Creación de reglas",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadReglas} reglas (15 min c/u)`,
    });
  }

  // 10. CREAR POLÍTICAS DE RETENCIÓN
  if (state.crearPoliticasRetencion) {
    totalMinutos += 60;
    desglose.push({ concepto: "Crear políticas de retención", tiempo: "1 hora" });
  }

  // 11. POLÍTICAS DE RETENCIÓN (usuarios)
  if (state.politicasRetencion && state.usuariosPoliticasRetencion > 0) {
    const minutosPolRet = state.usuariosPoliticasRetencion * 5;
    totalMinutos += minutosPolRet;
    const horas = Math.floor(minutosPolRet / 60);
    const minutos = minutosPolRet % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
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
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Habilitar archivado",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosArchivado} usuarios (5 min c/u)`,
    });
  }

  // 13. AUTO-EXPANDING ARCHIVADO - 2 min por usuario
  if (state.autoExpandingArchivado && state.usuariosAutoExpanding > 0) {
    const minutosAutoExp = state.usuariosAutoExpanding * 2;
    totalMinutos += minutosAutoExp;
    const horas = Math.floor(minutosAutoExp / 60);
    const minutos = minutosAutoExp % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
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
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Forzar archivado",
      tiempo: tiempoTexto,
      detalle: `${state.usuariosForzarArchivado} usuarios (1 min c/u)`,
    });
  }

  // 15. INFORME DE MIGRACIÓN
  if (state.informeMigracion) {
    totalMinutos += 60;
    desglose.push({
      concepto: "Informe de migración",
      tiempo: "1 hora",
      detalle: `Frecuencia: ${state.frecuenciaInforme}`,
    });
  }

  // 16. MONITOREO DE USUARIOS - 10 min por usuario
  if (state.monitoreoUsuarios > 0) {
    const minutosMonitoreo = state.monitoreoUsuarios * 10;
    totalMinutos += minutosMonitoreo;
    const horas = Math.floor(minutosMonitoreo / 60);
    const minutos = minutosMonitoreo % 60;
    let tiempoTexto = horas > 0
      ? `${horas} ${horas === 1 ? "hora" : "horas"}${minutos > 0 ? ` ${minutos} min` : ""}`
      : `${minutos} min`;
    desglose.push({
      concepto: "Monitoreo de usuarios",
      tiempo: tiempoTexto,
      detalle: `${state.monitoreoUsuarios} usuarios (10 min c/u)`,
    });
  }

  // CONSIDERACIONES ADICIONALES (NO SUMAN TIEMPO)

  // CORREO ELECTRÓNICO
  if (state.tamañoBuzones > 0) {
    consideraciones.push({
      concepto: "Tamaño total de buzones",
      detalle: `${state.tamañoBuzones} GB`,
    });
  }
  if (state.buzonesExceden50GB > 0) {
    consideraciones.push({
      concepto: "Buzones que exceden 50GB",
      detalle: `${state.buzonesExceden50GB} cuentas`,
    });
  }
  if (state.listasGruposMigrar > 0) {
    consideraciones.push({
      concepto: "Listas y grupos a migrar",
      detalle: `${state.listasGruposMigrar} listas/grupos`,
    });
  }

  // Incremental de buzones (solo informativo)
  if (state.incrementalBuzonesSemana > 0) {
    consideraciones.push({
      concepto: "Incremental semanal de buzones",
      detalle: `${state.incrementalBuzonesSemana} GB/semana`,
    });
  }

  // TIEMPO DE MIGRACIÓN BITTITAN (si está habilitado para incluir)
  if (state.usarBitTitan && state.incluirTiempoMigracion && state.pesoTotalMigracion > 0 && state.cantidadUsuariosMigracion > 0) {
    const pesoTotalEnGB = state.unidadPesoMigracion === "TB"
      ? state.pesoTotalMigracion * 1024
      : state.pesoTotalMigracion;

    // Velocidad BitTitan: 3 TB/mes
    const velocidadGBPorMes = 3 * 1024; // 3072 GB/mes

    const mesesEstimados = pesoTotalEnGB / velocidadGBPorMes;
    const diasEstimados = mesesEstimados * 30;
    const horasEstimadas = diasEstimados * 24;
    const minutosEstimados = Math.round(horasEstimadas * 60);

    totalMinutos += minutosEstimados;

    const horasMigracionFormato = Math.floor(horasEstimadas);
    const minutosMigracionFormato = Math.round((horasEstimadas - horasMigracionFormato) * 60);

    let tiempoTexto = horasMigracionFormato > 0
      ? `${horasMigracionFormato} ${horasMigracionFormato === 1 ? "hora" : "horas"}${minutosMigracionFormato > 0 ? ` ${minutosMigracionFormato} min` : ""}`
      : `${minutosMigracionFormato} min`;

    let detalleFormato = "";
    if (mesesEstimados >= 1) {
      const meses = Math.floor(mesesEstimados);
      const diasRestantes = Math.round((mesesEstimados - meses) * 30);
      detalleFormato = `${meses} ${meses === 1 ? "mes" : "meses"}${diasRestantes > 0 ? ` y ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}` : ""}`;
    } else if (diasEstimados >= 7) {
      const semanas = Math.floor(diasEstimados / 7);
      const diasRestantes = Math.round(diasEstimados - semanas * 7);
      detalleFormato = `${semanas} ${semanas === 1 ? "semana" : "semanas"}${diasRestantes > 0 ? ` y ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}` : ""}`;
    } else {
      detalleFormato = `${diasEstimados.toFixed(1)} ${diasEstimados < 2 ? "día" : "días"}`;
    }

    desglose.push({
      concepto: "Tiempo de migración BitTitan",
      tiempo: tiempoTexto,
      detalle: `${state.pesoTotalMigracion} ${state.unidadPesoMigracion} a 3 TB/mes (aprox. ${detalleFormato})`,
    });
  }

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return {
    horas,
    minutos,
    total: totalMinutos,
    desglose,
    consideraciones,
  };
}

export function formatearTiempo(horas: number, minutos: number): string {
  if (horas === 0 && minutos === 0) return "0 minutos";
  if (horas === 0) return `${minutos} minutos`;
  if (minutos === 0) return `${horas} ${horas === 1 ? "hora" : "horas"}`;
  return `${horas} ${horas === 1 ? "hora" : "horas"} y ${minutos} minutos`;
}