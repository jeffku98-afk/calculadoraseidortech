import { create } from "zustand";

export interface MicrosoftGoogleState {
  // Panel
  panel: "crear" | "existente";
  
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
}

interface MicrosoftGoogleActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setConfiguracionTenant: (config: "google" | "microsoft") => void;
  setMailbox: (activo: boolean) => void;
  setOnedrive: (activo: boolean) => void;
  setListaBlancaNegra: (activo: boolean) => void;
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  reset: () => void;
}

const initialState: MicrosoftGoogleState = {
  panel: "crear",
  cantidadUsuarios: 0,
  configuracionTenant: "google",
  mailbox: false,
  onedrive: false,
  listaBlancaNegra: false,
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
};

export const useMicrosoftGoogleStore = create<
  MicrosoftGoogleState & MicrosoftGoogleActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setConfiguracionTenant: (configuracionTenant) => set({ configuracionTenant }),
  setMailbox: (mailbox) => set({ mailbox }),
  setOnedrive: (onedrive) => set({ onedrive }),
  setListaBlancaNegra: (listaBlancaNegra) => set({ listaBlancaNegra }),
  setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
  setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  reset: () => set(initialState),
}));