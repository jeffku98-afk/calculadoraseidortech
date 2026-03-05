import { create } from "zustand";

export interface TenantNuevoState {
  // Tarea (solo muestra, siempre es creación con 2h fijas)
  tarea: "creacion";
  
  // Usuarios - RENOMBRADO
  cantidadUsuarios: number; // 5 min por usuario
  
  // Subdominios - MODIFICADO: ahora es cantidad
  cantidadSubdominios: number; // 1 hora por subdominio
  
  // Listas de distribución
  crearListas: boolean;
  cantidadListas: number; // 15 min por lista
  
  // Lista Blanca/Negra - MODIFICADO: ahora es cantidad de dominios
  listasBlancaNegra: boolean;
  cantidadDominiosListas: number; // 1 min por dominio
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
  mostrarAdvertenciaReglas: boolean; // NUEVO: Para el modal
}

interface TenantNuevoActions {
  setTarea: (tarea: "creacion") => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setCantidadSubdominios: (cantidad: number) => void;
  setCrearListas: (crear: boolean) => void;
  setCantidadListas: (cantidad: number) => void;
  setListasBlancaNegra: (activo: boolean) => void;
  setCantidadDominiosListas: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  setMostrarAdvertenciaReglas: (mostrar: boolean) => void;
  reset: () => void;
}

const initialState: TenantNuevoState = {
  tarea: "creacion",
  cantidadUsuarios: 0,
  cantidadSubdominios: 0,
  crearListas: false,
  cantidadListas: 0,
  listasBlancaNegra: false,
  cantidadDominiosListas: 0,
  crearReglas: false,
  cantidadReglas: 0,
  mostrarAdvertenciaReglas: false,
};

export const useTenantNuevoStore = create<TenantNuevoState & TenantNuevoActions>(
  (set) => ({
    ...initialState,
    
    setTarea: (tarea) => set({ tarea }),
    setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
    setCantidadSubdominios: (cantidadSubdominios) => set({ cantidadSubdominios }),
    setCrearListas: (crearListas) => set({ crearListas }),
    setCantidadListas: (cantidadListas) => set({ cantidadListas }),
    setListasBlancaNegra: (listasBlancaNegra) => set({ listasBlancaNegra }),
    setCantidadDominiosListas: (cantidadDominiosListas) => set({ cantidadDominiosListas }),
    setCrearReglas: (crearReglas) => set({ crearReglas }),
    setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
    setMostrarAdvertenciaReglas: (mostrarAdvertenciaReglas) => set({ mostrarAdvertenciaReglas }),
    reset: () => set(initialState),
  })
);