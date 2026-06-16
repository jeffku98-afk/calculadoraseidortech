import { create } from "zustand";

export interface TenantTenantState {
  // Panel
  panel: "crear" | "existente";
  
  // Nombre del cliente
  nombreCliente: string;
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Sitios de SharePoint (ÚNICA DE ESTE MÓDULO)
  sitiosSharepoint: boolean;
  cantidadSitios: number;
  configuracionPermisos: boolean;
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number;
  listasDistribucion: boolean;
  cantidadListasDistribucion: number;
  bloqueoIPs: boolean;
  cantidadIPs: number;
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean;
  
  // Herramientas (ÚNICA DE ESTE MÓDULO)
  // ShareGate y Nativa son mutuamente excluyentes (selección única)
  herramientaMigracion: "sharegate" | "nativa";
  herramientaNativa: boolean; // Derivado de herramientaMigracion === "nativa"
  usarShareGate: boolean; // Derivado de herramientaMigracion === "sharegate"
  usarBitTitan: boolean; // Independiente: Calculadora BitTitan
  
  // ALMACENAMIENTO - SIN LICENCIAS
  crearPoliticasRetencion: boolean;
  politicasRetencion: boolean;
  usuariosPoliticasRetencion: number;
  habilitarArchivado: boolean;
  usuariosArchivado: number;
  autoExpandingArchivado: boolean;
  usuariosAutoExpanding: number;
  forzarArchivado: boolean;
  usuariosForzarArchivado: number;
  
  // Informe de Migración
  informeMigracion: boolean;
  frecuenciaInforme: "semanal" | "mensual";

  // NUEVO: Monitoreo de usuarios
  monitoreoUsuarios: number;

  // NUEVO: Incremental de buzones por semana
  incrementalBuzonesSemana: number;

  // NUEVO: Calculadora BitTitan
  pesoTotalMigracion: number;
  unidadPesoMigracion: "GB" | "TB";
  cantidadUsuariosMigracion: number;
  incluirTiempoMigracion: boolean;

  // NUEVO: CONSIDERACIONES ADICIONALES - NO SUMAN HORAS
  // CORREO ELECTRÓNICO
  tamañoBuzones: number;
  buzonesExceden50GB: number;
  listasGruposMigrar: number;
}

interface TenantTenantActions {
  setPanel: (panel: "crear" | "existente") => void;
  setNombreCliente: (nombre: string) => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setSitiosSharepoint: (activo: boolean) => void;
  setCantidadSitios: (cantidad: number) => void;
  setConfiguracionPermisos: (activo: boolean) => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void;
  setListasDistribucion: (activo: boolean) => void;
  setCantidadListasDistribucion: (cantidad: number) => void;
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void;
  setHerramientaNativa: (activo: boolean) => void;
  setUsarShareGate: (activo: boolean) => void;
  setHerramientaMigracion: (herramienta: "sharegate" | "nativa") => void;
  setUsarBitTitan: (activo: boolean) => void; // NUEVO
  setCrearPoliticasRetencion: (crear: boolean) => void;
  setPoliticasRetencion: (activo: boolean) => void;
  setUsuariosPoliticasRetencion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setUsuariosArchivado: (cantidad: number) => void;
  setAutoExpandingArchivado: (activo: boolean) => void;
  setUsuariosAutoExpanding: (cantidad: number) => void;
  setForzarArchivado: (activo: boolean) => void;
  setUsuariosForzarArchivado: (cantidad: number) => void;
  setInformeMigracion: (activo: boolean) => void;
  setFrecuenciaInforme: (frecuencia: "semanal" | "mensual") => void;
  // NUEVO
  setMonitoreoUsuarios: (cantidad: number) => void;
  setIncrementalBuzonesSemana: (gb: number) => void;
  setPesoTotalMigracion: (peso: number) => void;
  setUnidadPesoMigracion: (unidad: "GB" | "TB") => void;
  setCantidadUsuariosMigracion: (cantidad: number) => void;
  setIncluirTiempoMigracion: (incluir: boolean) => void;
  // Consideraciones Adicionales
  setTamañoBuzones: (value: number) => void;
  setBuzonesExceden50GB: (value: number) => void;
  setListasGruposMigrar: (value: number) => void;
  reset: () => void;
}

const initialState: TenantTenantState = {
  panel: "crear",
  nombreCliente: "",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  sitiosSharepoint: false,
  cantidadSitios: 0,
  configuracionPermisos: false,
  listasBlancaNegra: false,
  cantidadDominiosListas: 0,
  listasDistribucion: false,
  cantidadListasDistribucion: 0,
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false,
  herramientaMigracion: "sharegate",
  herramientaNativa: false,
  usarShareGate: true,
  usarBitTitan: false, // NUEVO
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
  forzarArchivado: false,
  usuariosForzarArchivado: 0,
  informeMigracion: false,
  frecuenciaInforme: "semanal",
  // NUEVO
  monitoreoUsuarios: 0,
  incrementalBuzonesSemana: 0,
  pesoTotalMigracion: 0,
  unidadPesoMigracion: "GB",
  cantidadUsuariosMigracion: 0,
  incluirTiempoMigracion: false,
  // Consideraciones Adicionales
  tamañoBuzones: 0,
  buzonesExceden50GB: 0,
  listasGruposMigrar: 0,
};

export const useTenantTenantStore = create<
  TenantTenantState & TenantTenantActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
  setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setSitiosSharepoint: (sitiosSharepoint) => set({ sitiosSharepoint }),
  setCantidadSitios: (cantidadSitios) => set({ cantidadSitios }),
  setConfiguracionPermisos: (configuracionPermisos) => set({ configuracionPermisos }),
  setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
  setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }),
  setListasDistribucion: (listasDistribucion) => set({ listasDistribucion }),
  setCantidadListasDistribucion: (cantidadListasDistribucion) => set({ cantidadListasDistribucion }),
  setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
  setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }),
  setHerramientaNativa: (herramientaNativa) => set({ herramientaNativa }),
  setUsarShareGate: (usarShareGate) => set({ usarShareGate }),
  setHerramientaMigracion: (herramientaMigracion) =>
    set({
      herramientaMigracion,
      usarShareGate: herramientaMigracion === "sharegate",
      herramientaNativa: herramientaMigracion === "nativa",
      // Si cambia a Nativa, resetear opciones de sitios (dependían de ShareGate)
      ...(herramientaMigracion === "nativa"
        ? { sitiosSharepoint: false, configuracionPermisos: false, cantidadSitios: 0 }
        : {}),
    }),
  setUsarBitTitan: (usarBitTitan) => set({ usarBitTitan }), // NUEVO
  setCrearPoliticasRetencion: (crearPoliticasRetencion) =>
    set({ crearPoliticasRetencion }),
  setPoliticasRetencion: (politicasRetencion) => set({ politicasRetencion }),
  setUsuariosPoliticasRetencion: (usuariosPoliticasRetencion) =>
    set({ usuariosPoliticasRetencion }),
  setHabilitarArchivado: (habilitarArchivado) => set({ habilitarArchivado }),
  setUsuariosArchivado: (usuariosArchivado) => set({ usuariosArchivado }),
  setAutoExpandingArchivado: (autoExpandingArchivado) =>
    set({ autoExpandingArchivado }),
  setUsuariosAutoExpanding: (usuariosAutoExpanding) =>
    set({ usuariosAutoExpanding }),
  setForzarArchivado: (forzarArchivado) => set({ forzarArchivado }),
  setUsuariosForzarArchivado: (usuariosForzarArchivado) => set({ usuariosForzarArchivado }),
  setInformeMigracion: (informeMigracion) => set({ informeMigracion }),
  setFrecuenciaInforme: (frecuenciaInforme) => set({ frecuenciaInforme }),
  // NUEVO
  setMonitoreoUsuarios: (monitoreoUsuarios) => set({ monitoreoUsuarios }),
  setIncrementalBuzonesSemana: (incrementalBuzonesSemana) => set({ incrementalBuzonesSemana }),
  setPesoTotalMigracion: (pesoTotalMigracion) => set({ pesoTotalMigracion }),
  setUnidadPesoMigracion: (unidadPesoMigracion) => set({ unidadPesoMigracion }),
  setCantidadUsuariosMigracion: (cantidadUsuariosMigracion) => set({ cantidadUsuariosMigracion }),
  setIncluirTiempoMigracion: (incluirTiempoMigracion) => set({ incluirTiempoMigracion }),
  // Consideraciones Adicionales
  setTamañoBuzones: (tamañoBuzones) => set({ tamañoBuzones }),
  setBuzonesExceden50GB: (buzonesExceden50GB) => set({ buzonesExceden50GB }),
  setListasGruposMigrar: (listasGruposMigrar) => set({ listasGruposMigrar }),
  reset: () => set(initialState),
}));