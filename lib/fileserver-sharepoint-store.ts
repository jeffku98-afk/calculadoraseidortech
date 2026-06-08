import { create } from "zustand";

export interface FileServerSharePointState {
  // Nombre del Cliente
  nombreCliente: string;

  // ─────────────────────────────────────────────
  // SECCIÓN 2: PREPARAR MIGRACIÓN Y DESTINO
  // ─────────────────────────────────────────────
  cantidadSitios: number;

  // ─────────────────────────────────────────────
  // SECCIÓN 3: EJECUCIÓN DE MIGRACIÓN
  // ─────────────────────────────────────────────
  pesoMigracion: number;
  unidadPesoMigracion: "GB" | "TB";

  // ─────────────────────────────────────────────
  // SECCIÓN 6: TIEMPO ESTIMADO DE MIGRACIÓN
  // 6 minutos por GB (no suma al total por defecto)
  // ─────────────────────────────────────────────
  pesoTiempoMigracion: number;
  unidadPesoTiempoMigracion: "GB" | "TB";
  incluirTiempoMigracion: boolean; // Switch: incluir en PDF y total
}

interface FileServerSharePointActions {
  setNombreCliente: (nombre: string) => void;
  setCantidadSitios: (cantidad: number) => void;
  setPesoMigracion: (peso: number) => void;
  setUnidadPesoMigracion: (unidad: "GB" | "TB") => void;
  setPesoTiempoMigracion: (peso: number) => void;
  setUnidadPesoTiempoMigracion: (unidad: "GB" | "TB") => void;
  setIncluirTiempoMigracion: (incluir: boolean) => void;
  reset: () => void;
}

const initialState: FileServerSharePointState = {
  nombreCliente: "",
  cantidadSitios: 0,
  pesoMigracion: 0,
  unidadPesoMigracion: "GB",
  pesoTiempoMigracion: 0,
  unidadPesoTiempoMigracion: "GB",
  incluirTiempoMigracion: false,
};

export const useFileServerSharePointStore = create<
  FileServerSharePointState & FileServerSharePointActions
>((set) => ({
  ...initialState,

  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
  setCantidadSitios: (cantidadSitios) => set({ cantidadSitios }),
  setPesoMigracion: (pesoMigracion) => set({ pesoMigracion }),
  setUnidadPesoMigracion: (unidadPesoMigracion) => set({ unidadPesoMigracion }),
  setPesoTiempoMigracion: (pesoTiempoMigracion) => set({ pesoTiempoMigracion }),
  setUnidadPesoTiempoMigracion: (unidadPesoTiempoMigracion) => set({ unidadPesoTiempoMigracion }),
  setIncluirTiempoMigracion: (incluirTiempoMigracion) => set({ incluirTiempoMigracion }),
  reset: () => set(initialState),
}));