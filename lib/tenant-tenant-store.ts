import { create } from "zustand";

export interface TenantTenantState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Sitios de SharePoint
  sitiosSharepoint: boolean;
  cantidadSitios: number;
  configuracionPermisos: boolean;
  usuariosPorSitio: number;
  pesoTotalTB: number;
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad
  listaBlancaNegra: boolean;
  bloqueoIPs: boolean;
  cantidadIPs: number;
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  
  // Herramientas
  herramientaNativa: boolean;
  usarShareGate: boolean;
  
  // ALMACENAMIENTO
  // Licencia
  licenciaTenant: "estandar" | "premium";
  
  // Opciones Estándar
  crearPoliticasRetencion: boolean;
  politicasRetencion: boolean;
  usuariosPoliticasRetencion: number;
  habilitarArchivado: boolean;
  usuariosArchivado: number;
  
  // Opciones Premium
  autoExpandingArchivado: boolean;
  usuariosAutoExpanding: number;
}

interface TenantTenantActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setSitiosSharepoint: (activo: boolean) => void;
  setCantidadSitios: (cantidad: number) => void;
  setConfiguracionPermisos: (activo: boolean) => void;
  setUsuariosPorSitio: (cantidad: number) => void;
  setPesoTotalTB: (peso: number) => void;
  setListaBlancaNegra: (activo: boolean) => void;
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setHerramientaNativa: (activo: boolean) => void;
  setUsarShareGate: (activo: boolean) => void;
  setLicenciaTenant: (licencia: "estandar" | "premium") => void;
  setCrearPoliticasRetencion: (crear: boolean) => void;
  setPoliticasRetencion: (activo: boolean) => void;
  setUsuariosPoliticasRetencion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setUsuariosArchivado: (cantidad: number) => void;
  setAutoExpandingArchivado: (activo: boolean) => void;
  setUsuariosAutoExpanding: (cantidad: number) => void;
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
  pesoTotalTB: 0,
  listaBlancaNegra: false,
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
  herramientaNativa: false,
  usarShareGate: false,
  licenciaTenant: "estandar",
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
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
  setPesoTotalTB: (pesoTotalTB) => set({ pesoTotalTB }),
  setListaBlancaNegra: (listaBlancaNegra) => set({ listaBlancaNegra }),
  setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
  setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setHerramientaNativa: (herramientaNativa) => set({ herramientaNativa }),
  setUsarShareGate: (usarShareGate) => set({ usarShareGate }),
  setLicenciaTenant: (licenciaTenant) => set({ licenciaTenant }),
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
  reset: () => set(initialState),
}));