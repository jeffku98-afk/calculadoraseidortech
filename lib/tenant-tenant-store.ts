import { create } from "zustand";

export interface TenantTenantState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Sitios de SharePoint (ÚNICA DE ESTE MÓDULO)
  sitiosSharepoint: boolean;
  cantidadSitios: number;
  configuracionPermisos: boolean;
  // ELIMINADO: usuariosPorSitio (ahora es 5 min por sitio)
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number; // 1 min por dominio
  listasDistribucion: boolean;
  cantidadListasDistribucion: number; // 15 min por lista
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean; // Para el modal
  
  // Herramientas (ÚNICA DE ESTE MÓDULO)
  herramientaNativa: boolean;
  usarShareGate: boolean;
  
  // ALMACENAMIENTO - SIN LICENCIAS
  // Opciones de Retención y Archivado
  crearPoliticasRetencion: boolean;
  politicasRetencion: boolean;
  usuariosPoliticasRetencion: number;
  habilitarArchivado: boolean;
  usuariosArchivado: number;
  
  // Auto-expanding archivado
  autoExpandingArchivado: boolean;
  usuariosAutoExpanding: number;
  
  // Forzar archivado
  forzarArchivado: boolean;
  usuariosForzarArchivado: number;
  
  // Informe de Migración - NUEVO
  informeMigracion: boolean;
  frecuenciaInforme: "semanal" | "mensual";

  nombreCliente: string;
}

interface TenantTenantActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setSitiosSharepoint: (activo: boolean) => void;
  setCantidadSitios: (cantidad: number) => void;
  setConfiguracionPermisos: (activo: boolean) => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void;
  setListasDistribucion: (activo: boolean) => void;
  setCantidadListasDistribucion: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void;
  setHerramientaNativa: (activo: boolean) => void;
  setUsarShareGate: (activo: boolean) => void;
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
  reset: () => void;
  setNombreCliente: (nombre: string) => void;
}

const initialState: TenantTenantState = {
  panel: "crear",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  sitiosSharepoint: false,
  cantidadSitios: 0,
  configuracionPermisos: false,
  listasBlancaNegra: false,
  cantidadDominiosListas: 0,
  listasDistribucion: false,
  cantidadListasDistribucion: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false,
  herramientaNativa: false,
  usarShareGate: false,
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
  nombreCliente: "",
};

export const useTenantTenantStore = create<
  TenantTenantState & TenantTenantActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setSitiosSharepoint: (sitiosSharepoint) => set({ sitiosSharepoint }),
  setCantidadSitios: (cantidadSitios) => set({ cantidadSitios }),
  setConfiguracionPermisos: (configuracionPermisos) => set({ configuracionPermisos }),
  setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
  setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }),
  setListasDistribucion: (listasDistribucion) => set({ listasDistribucion }),
  setCantidadListasDistribucion: (cantidadListasDistribucion) => set({ cantidadListasDistribucion }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }),
  setHerramientaNativa: (herramientaNativa) => set({ herramientaNativa }),
  setUsarShareGate: (usarShareGate) => set({ usarShareGate }),
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
  reset: () => set(initialState),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
}));