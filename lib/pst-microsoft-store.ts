import { create } from "zustand";

export interface PSTMicrosoftState {
  // Panel
  panel: "crear" | "existente";
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Tamaño máximo (referencial)
  tamanoMaximoGB: number;
  
  // Informe de Migración - NUEVO
  informeMigracion: boolean;
  frecuenciaInforme: "semanal" | "mensual";

  nombreCliente: string;
}

interface PSTMicrosoftActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setTamanoMaximoGB: (tamano: number) => void;
  setInformeMigracion: (activo: boolean) => void;
  setFrecuenciaInforme: (frecuencia: "semanal" | "mensual") => void;
  reset: () => void;
  setNombreCliente: (nombre: string) => void;
}

const initialState: PSTMicrosoftState = {
  panel: "crear",
  cantidadUsuarios: 0,
  tamanoMaximoGB: 0,
  informeMigracion: false,
  frecuenciaInforme: "semanal",
  nombreCliente: "",
};

export const usePSTMicrosoftStore = create<
  PSTMicrosoftState & PSTMicrosoftActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setTamanoMaximoGB: (tamanoMaximoGB) => set({ tamanoMaximoGB }),
  setInformeMigracion: (informeMigracion) => set({ informeMigracion }),
  setFrecuenciaInforme: (frecuenciaInforme) => set({ frecuenciaInforme }),
  reset: () => set(initialState),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
}));