import { create } from "zustand";

export interface MicrosoftGoogleState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // CONFIGURACIÓN DE TENANT (fusionada - igual que Google→Microsoft)
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
  mostrarAdvertenciaReglas: boolean; // Para el modal
  
  // Monitoreo de usuarios
  monitoreoUsuarios: number;
  
  // Informe de Migración
  informeMigracion: boolean;
  frecuenciaInforme: "semanal" | "mensual";

  nombreCliente: string;
}

interface MicrosoftGoogleActions {
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
  setMonitoreoUsuarios: (cantidad: number) => void;
  setInformeMigracion: (activo: boolean) => void;
  setFrecuenciaInforme: (frecuencia: "semanal" | "mensual") => void;
  reset: () => void;
  setNombreCliente: (nombre: string) => void;
}

const initialState: MicrosoftGoogleState = {
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
  monitoreoUsuarios: 0,
  informeMigracion: false,
  frecuenciaInforme: "semanal",
  nombreCliente: "",
};

export const useMicrosoftGoogleStore = create<
  MicrosoftGoogleState & MicrosoftGoogleActions
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
  setMonitoreoUsuarios: (monitoreoUsuarios) => set({ monitoreoUsuarios }),
  setInformeMigracion: (informeMigracion) => set({ informeMigracion }),
  setFrecuenciaInforme: (frecuenciaInforme) => set({ frecuenciaInforme }),
  reset: () => set(initialState),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
}));