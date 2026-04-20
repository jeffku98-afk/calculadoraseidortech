import { create } from "zustand";

export interface FileServerSharePointState {
  // Nombre del Cliente
  nombreCliente: string;
  
  // Creación de Sitios
  cantidadSitios: number;
  
  // Peso en GB para tiempo estimado de migración
  pesoGB: number;
}

interface FileServerSharePointActions {
  setNombreCliente: (nombre: string) => void;
  setCantidadSitios: (cantidad: number) => void;
  setPesoGB: (peso: number) => void;
  reset: () => void;
}

const initialState: FileServerSharePointState = {
  nombreCliente: "",
  cantidadSitios: 0,
  pesoGB: 0,
};

export const useFileServerSharePointStore = create<
  FileServerSharePointState & FileServerSharePointActions
>((set) => ({
  ...initialState,

  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
  setCantidadSitios: (cantidadSitios) => set({ cantidadSitios }),
  setPesoGB: (pesoGB) => set({ pesoGB }),
  reset: () => set(initialState),
}));