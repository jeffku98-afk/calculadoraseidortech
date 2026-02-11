import { create } from "zustand";

export interface PSTMicrosoftState {
  // Panel
  panel: "crear" | "existente";
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Tamaño máximo (referencial)
  tamanoMaximoGB: number;
}

interface PSTMicrosoftActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setTamanoMaximoGB: (tamano: number) => void;
  reset: () => void;
}

const initialState: PSTMicrosoftState = {
  panel: "crear",
  cantidadUsuarios: 0,
  tamanoMaximoGB: 0,
};

export const usePSTMicrosoftStore = create<
  PSTMicrosoftState & PSTMicrosoftActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setTamanoMaximoGB: (tamanoMaximoGB) => set({ tamanoMaximoGB }),
  reset: () => set(initialState),
}));