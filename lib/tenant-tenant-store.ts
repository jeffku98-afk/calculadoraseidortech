import { create } from "zustand";

export interface TenantTenantState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Sitios de SharePoint (ÚNICA DE ESTE MÓDULO - NO TOCAR)
  sitiosSharepoint: boolean;
  cantidadSitios: number;
  configuracionPermisos: boolean;
  usuariosPorSitio: number;
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad - MODIFICADO
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number; // NUEVO: 1 min por dominio
  listasDistribucion: boolean; // NUEVO
  cantidadListasDistribucion: number; // NUEVO: 15 min por lista
  bloqueoIPs: boolean;
  cantidadIPs: number;
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean; // NUEVO: Para el modal
  
  // Herramientas (ÚNICA DE ESTE MÓDULO - NO TOCAR)
  herramientaNativa: boolean;
  usarShareGate: boolean;
  
  // ALMACENAMIENTO - SIN LICENCIAS (como Google→Microsoft y Microsoft→Google)
  // Opciones de Retención y Archivado
  crearPoliticasRetencion: boolean;
  politicasRetencion: boolean;
  usuariosPoliticasRetencion: number;
  habilitarArchivado: boolean;
  usuariosArchivado: number;
  
  // Auto-expanding archivado (siempre disponible)
  autoExpandingArchivado: boolean;
  usuariosAutoExpanding: number;
  
  // Forzar archivado - NUEVO
  forzarArchivado: boolean;
  usuariosForzarArchivado: number;
}

interface TenantTenantActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setSitiosSharepoint: (activo: boolean) => void;
  setCantidadSitios: (cantidad: number) => void;
  setConfiguracionPermisos: (activo: boolean) => void;
  setUsuariosPorSitio: (cantidad: number) => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void; // NUEVO
  setListasDistribucion: (activo: boolean) => void; // NUEVO
  setCantidadListasDistribucion: (cantidad: number) => void; // NUEVO
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void; // NUEVO
  setHerramientaNativa: (activo: boolean) => void;
  setUsarShareGate: (activo: boolean) => void;
  setCrearPoliticasRetencion: (crear: boolean) => void;
  setPoliticasRetencion: (activo: boolean) => void;
  setUsuariosPoliticasRetencion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setUsuariosArchivado: (cantidad: number) => void;
  setAutoExpandingArchivado: (activo: boolean) => void;
  setUsuariosAutoExpanding: (cantidad: number) => void;
  setForzarArchivado: (activo: boolean) => void; // NUEVO
  setUsuariosForzarArchivado: (cantidad: number) => void; // NUEVO
  reset: () => void;
}

const initialState: TenantTenantState = {
  panel: "crear",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  sitiosSharepoint: false,
  cantidadSitios: 0,
  configuracionPermisos: false,
  usuariosPorSitio: 0,
  listasBlancaNegra: false,
  cantidadDominiosListas: 0, // NUEVO
  listasDistribucion: false, // NUEVO
  cantidadListasDistribucion: 0, // NUEVO
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false, // NUEVO
  herramientaNativa: false,
  usarShareGate: false,
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
  forzarArchivado: false, // NUEVO
  usuariosForzarArchivado: 0, // NUEVO
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
  setUsuariosPorSitio: (usuariosPorSitio) => set({ usuariosPorSitio }),
  setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
  setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }), // NUEVO
  setListasDistribucion: (listasDistribucion) => set({ listasDistribucion }), // NUEVO
  setCantidadListasDistribucion: (cantidadListasDistribucion) => set({ cantidadListasDistribucion }), // NUEVO
  setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
  setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }), // NUEVO
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
  setForzarArchivado: (forzarArchivado) => set({ forzarArchivado }), // NUEVO
  setUsuariosForzarArchivado: (usuariosForzarArchivado) => set({ usuariosForzarArchivado }), // NUEVO
  reset: () => set(initialState),
}));