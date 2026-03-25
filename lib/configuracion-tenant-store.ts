import { create } from "zustand";

export interface ConfiguracionTenantState {
  // Configuración Base (siempre activas)
  creacionTenant: boolean; // 2 horas
  migracionDominio: boolean; // 2 horas
  
  // Creación de usuarios
  cantidadUsuarios: number; // 1 min por usuario
  
  // Configuraciones Adicionales
  crearPoliticasRetencion: boolean; // 30 min
  asignacionPorUsuario: boolean;
  cantidadAsignacion: number; // 5 min por usuario
  habilitarArchivado: boolean;
  cantidadArchivado: number; // 2 min por usuario
  forzarArchivado: boolean;
  cantidadForzado: number; // 1 min por usuario

  nombreCliente: string;
}

interface ConfiguracionTenantActions {
  setCreacionTenant: (activo: boolean) => void;
  setMigracionDominio: (activo: boolean) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setCrearPoliticasRetencion: (activo: boolean) => void;
  setAsignacionPorUsuario: (activo: boolean) => void;
  setCantidadAsignacion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setCantidadArchivado: (cantidad: number) => void;
  setForzarArchivado: (activo: boolean) => void;
  setCantidadForzado: (cantidad: number) => void;
  reset: () => void;
  setNombreCliente: (nombre: string) => void;
}

const initialState: ConfiguracionTenantState = {
  creacionTenant: true,
  migracionDominio: true,
  cantidadUsuarios: 0,
  crearPoliticasRetencion: false,
  asignacionPorUsuario: false,
  cantidadAsignacion: 0,
  habilitarArchivado: false,
  cantidadArchivado: 0,
  forzarArchivado: false,
  cantidadForzado: 0,
  nombreCliente: "",
};

export const useConfiguracionTenantStore = create<
  ConfiguracionTenantState & ConfiguracionTenantActions
>((set) => ({
  ...initialState,

  setCreacionTenant: (creacionTenant) => set({ creacionTenant }),
  setMigracionDominio: (migracionDominio) => set({ migracionDominio }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setCrearPoliticasRetencion: (crearPoliticasRetencion) =>
    set({ crearPoliticasRetencion }),
  setAsignacionPorUsuario: (asignacionPorUsuario) =>
    set({ asignacionPorUsuario }),
  setCantidadAsignacion: (cantidadAsignacion) => set({ cantidadAsignacion }),
  setHabilitarArchivado: (habilitarArchivado) => set({ habilitarArchivado }),
  setCantidadArchivado: (cantidadArchivado) => set({ cantidadArchivado }),
  setForzarArchivado: (forzarArchivado) => set({ forzarArchivado }),
  setCantidadForzado: (cantidadForzado) => set({ cantidadForzado }),
  reset: () => set(initialState),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
}));