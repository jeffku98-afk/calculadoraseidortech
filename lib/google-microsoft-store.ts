import { create } from "zustand";

export interface GoogleMicrosoftState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Configuración de Tenant
  configuracionTenant: "google" | "microsoft";
  
  // Configuración de BitTitan
  mailbox: boolean;
  onedrive: boolean;
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad
  listaBlancaNegra: boolean;
  bloqueoIPs: boolean;
  cantidadIPs: number;
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  
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

interface GoogleMicrosoftActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setConfiguracionTenant: (config: "google" | "microsoft") => void;
  setMailbox: (activo: boolean) => void;
  setOnedrive: (activo: boolean) => void;
  setListaBlancaNegra: (activo: boolean) => void;
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
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

const initialState: GoogleMicrosoftState = {
  panel: "crear",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  configuracionTenant: "google",
  mailbox: false,
  onedrive: false,
  listaBlancaNegra: false,
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
  licenciaTenant: "estandar",
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
};

export const useGoogleMicrosoftStore = create<
  GoogleMicrosoftState & GoogleMicrosoftActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setConfiguracionTenant: (configuracionTenant) => set({ configuracionTenant }),
  setMailbox: (mailbox) => set({ mailbox }),
  setOnedrive: (onedrive) => set({ onedrive }),
  setListaBlancaNegra: (listaBlancaNegra) => set({ listaBlancaNegra }),
  setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
  setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
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