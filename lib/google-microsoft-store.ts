import { create } from "zustand";

export interface GoogleMicrosoftState {
  // Panel
  panel: "crear" | "existente";
  
  // Dominios
  cantidadDominios: number;
  
  // Usuarios
  cantidadUsuarios: number;
  
  // Configuración de Tenant (BitTitan o Nativa)
  configuracionTenant: "bittitan" | "nativa";
  
  // Nombre del Cliente
  nombreCliente: string;
  
  // CONFIGURACIONES ADICIONALES
  // Seguridad - MODIFICADO
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number; // 1 min por dominio
  listasDistribucion: boolean;
  cantidadListasDistribucion: number; // 15 min por lista
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean; // Para el modal
  
  // ALMACENAMIENTO
  // Opciones de Retención y Archivado
  crearPoliticasRetencion: boolean;
  politicasRetencion: boolean;
  usuariosPoliticasRetencion: number;
  habilitarArchivado: boolean;
  usuariosArchivado: number;
  
  // Auto-expanding archivado
  autoExpandingArchivado: boolean;
  usuariosAutoExpanding: number;
  
  // NUEVO: Forzar archivado
  forzarArchivado: boolean;
  usuariosForzarArchivado: number;
  
  // Monitoreo de usuarios
  monitoreoUsuarios: number;
  
  // Informe de Migración - NUEVO
  informeMigracion: boolean;
  frecuenciaInforme: "semanal" | "mensual";

  // DRIVE
  tamañoDrives: number;
  drivesExceden1000GB: number;
  
  // UNIDADES COMPARTIDAS
  tamañoUnidadesCompartidas: number;
  cantidadUnidadesCompartidas: number;
  
  // CORREO ELECTRÓNICO
  tamañoBuzones: number;
  buzonesExceden50GB: number;
  listasGruposMigrar: number;
}

interface GoogleMicrosoftActions {
  setPanel: (panel: "crear" | "existente") => void;
  setCantidadDominios: (cantidad: number) => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setConfiguracionTenant: (config: "bittitan" | "nativa") => void;
  setNombreCliente: (nombre: string) => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void;
  setListasDistribucion: (activo: boolean) => void;
  setCantidadListasDistribucion: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void;
  setCrearPoliticasRetencion: (crear: boolean) => void;
  setPoliticasRetencion: (activo: boolean) => void;
  setUsuariosPoliticasRetencion: (cantidad: number) => void;
  setHabilitarArchivado: (activo: boolean) => void;
  setUsuariosArchivado: (cantidad: number) => void;
  setAutoExpandingArchivado: (activo: boolean) => void;
  setUsuariosAutoExpanding: (cantidad: number) => void;
  setForzarArchivado: (activo: boolean) => void;
  setUsuariosForzarArchivado: (cantidad: number) => void;
  setMonitoreoUsuarios: (cantidad: number) => void;
  setInformeMigracion: (activo: boolean) => void;
  setFrecuenciaInforme: (frecuencia: "semanal" | "mensual") => void;
  setTamañoDrives: (value: number) => void;
  setDrivesExceden1000GB: (value: number) => void;
  setTamañoUnidadesCompartidas: (value: number) => void;
  setCantidadUnidadesCompartidas: (value: number) => void;
  setTamañoBuzones: (value: number) => void;
  setBuzonesExceden50GB: (value: number) => void;
  setListasGruposMigrar: (value: number) => void;
  
  reset: () => void;
}

const initialState: GoogleMicrosoftState = {
  panel: "crear",
  cantidadDominios: 0,
  cantidadUsuarios: 0,
  configuracionTenant: "bittitan",
  nombreCliente: "",
  listasBlancaNegra: false,
  cantidadDominiosListas: 0,
  listasDistribucion: false,
  cantidadListasDistribucion: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false,
  crearPoliticasRetencion: false,
  politicasRetencion: false,
  usuariosPoliticasRetencion: 0,
  habilitarArchivado: false,
  usuariosArchivado: 0,
  autoExpandingArchivado: false,
  usuariosAutoExpanding: 0,
  forzarArchivado: false,
  usuariosForzarArchivado: 0,
  monitoreoUsuarios: 0,
  informeMigracion: false,
  frecuenciaInforme: "semanal",
  tamañoDrives: 0,
  drivesExceden1000GB: 0,
  tamañoUnidadesCompartidas: 0,
  cantidadUnidadesCompartidas: 0,
  tamañoBuzones: 0,
  buzonesExceden50GB: 0,
  listasGruposMigrar: 0,
};

export const useGoogleMicrosoftStore = create<
  GoogleMicrosoftState & GoogleMicrosoftActions
>((set) => ({
  ...initialState,

  setPanel: (panel) => set({ panel }),
  setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }),
  setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
  setConfiguracionTenant: (configuracionTenant) => set({ configuracionTenant }),
  setNombreCliente: (nombreCliente) => set({ nombreCliente }),
  setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
  setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }),
  setListasDistribucion: (listasDistribucion) => set({ listasDistribucion }),
  setCantidadListasDistribucion: (cantidadListasDistribucion) => set({ cantidadListasDistribucion }),
  setCrearReglas: (crearReglas) => set({ crearReglas }),
  setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
  setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }),
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
  setForzarArchivado: (forzarArchivado) => set({ forzarArchivado }),
  setUsuariosForzarArchivado: (usuariosForzarArchivado) => set({ usuariosForzarArchivado }),
  setMonitoreoUsuarios: (monitoreoUsuarios) => set({ monitoreoUsuarios }),
  setInformeMigracion: (informeMigracion) => set({ informeMigracion }),
  setFrecuenciaInforme: (frecuenciaInforme) => set({ frecuenciaInforme }),
  setTamañoDrives: (tamañoDrives) => set({ tamañoDrives }),
  setDrivesExceden1000GB: (drivesExceden1000GB) => set({ drivesExceden1000GB }),
  setTamañoUnidadesCompartidas: (tamañoUnidadesCompartidas) => set({ tamañoUnidadesCompartidas }),
  setCantidadUnidadesCompartidas: (cantidadUnidadesCompartidas) => set({ cantidadUnidadesCompartidas }),
  setTamañoBuzones: (tamañoBuzones) => set({ tamañoBuzones }),
  setBuzonesExceden50GB: (buzonesExceden50GB) => set({ buzonesExceden50GB }),
  setListasGruposMigrar: (listasGruposMigrar) => set({ listasGruposMigrar }),
  
  reset: () => set(initialState),
}));