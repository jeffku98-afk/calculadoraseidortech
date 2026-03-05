import { create } from "zustand";

export interface GoogleMicrosoftState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Configuración de Tenant (BitTitan o Nativa)
  configuracionTenant: "bittitan" | "nativa";
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad 
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number; // 1 min por dominio
  listasDistribucion: boolean;
  cantidadListasDistribucion: number; // 15 min por lista
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean; 
  
  // ALMACENAMIENTO
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
  
  // Monitoreo de usuarios
  monitoreoUsuarios: number;
}

interface GoogleMicrosoftActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setConfiguracionTenant: (config: "bittitan" | "nativa") => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void;
  setListasDistribucion: (activo: boolean) => void;
  setCantidadListasDistribucion: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void;
  setCrearPoliticasRetencion: (crear: boolean) => void;
  setPoliticasRetencion: (activo: boolean) => void;
  setUsuariosPoliticasRetencion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setUsuariosArchivado: (cantidad: number) => void;
  setAutoExpandingArchivado: (activo: boolean) => void;
  setUsuariosAutoExpanding: (cantidad: number) => void;
  setForzarArchivado: (activo: boolean) => void;
  setUsuariosForzarArchivado: (cantidad: number) => void;
  setMonitoreoUsuarios: (cantidad: number) => void;
  reset: () => void;
}

const initialState: GoogleMicrosoftState = {
  panel: "crear",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  configuracionTenant: "bittitan",
  listasBlancaNegra: false,
  cantidadDominiosListas: 0,
  listasDistribucion: false,
  cantidadListasDistribucion: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false,
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
  forzarArchivado: false,
  usuariosForzarArchivado: 0,
  monitoreoUsuarios: 0,
};

export const useGoogleMicrosoftStore = create<
  GoogleMicrosoftState & GoogleMicrosoftActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setConfiguracionTenant: (configuracionTenant) => set({ configuracionTenant }),
  setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
  setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }),
  setListasDistribucion: (listasDistribucion) => set({ listasDistribucion }),
  setCantidadListasDistribucion: (cantidadListasDistribucion) => set({ cantidadListasDistribucion }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }),
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
  setMonitoreoUsuarios: (monitoreoUsuarios) => set({ monitoreoUsuarios }),
  reset: () => set(initialState),
}));