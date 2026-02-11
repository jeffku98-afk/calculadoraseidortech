import { create } from "zustand";

export interface BackupAcronisState {
  // Plataforma del proyecto
  plataforma: "google" | "microsoft" | null;
  
  // Cuentas a adicionar (ambas plataformas)
  cantidadUsuarios: number;
  
  // Opciones de Microsoft
  sitiosSharepoint: boolean;
  cantidadSitios: number;
  equiposTeams: boolean;
  cantidadEquipos: number;
}

interface BackupAcronisActions {
  setPlataforma: (plataforma: "google" | "microsoft" | null) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setSitiosSharepoint: (activo: boolean) => void;
  setCantidadSitios: (cantidad: number) => void;
  setEquiposTeams: (activo: boolean) => void;
  setCantidadEquipos: (cantidad: number) => void;
  reset: () => void;
}

const initialState: BackupAcronisState = {
  plataforma: null,
  cantidadUsuarios: 0,
  sitiosSharepoint: false,
  cantidadSitios: 0,
  equiposTeams: false,
  cantidadEquipos: 0,
};

export const useBackupAcronisStore = create<
  BackupAcronisState & BackupAcronisActions
>((set) => ({
  ...initialState,

  setPlataforma: (plataforma) => set({ plataforma }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setSitiosSharepoint: (sitiosSharepoint) => set({ sitiosSharepoint }),
  setCantidadSitios: (cantidadSitios) => set({ cantidadSitios }),
  setEquiposTeams: (equiposTeams) => set({ equiposTeams }),
  setCantidadEquipos: (cantidadEquipos) => set({ cantidadEquipos }),
  reset: () => set(initialState),
}));