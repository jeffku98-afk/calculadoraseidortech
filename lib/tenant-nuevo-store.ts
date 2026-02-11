import { create } from "zustand";

export interface TenantNuevoState {
  // Tarea
  tarea: "creacion" | "existente";
  
  // Cantidad de usuarios
  cantidadUsuarios: number;
  
  // Subdominios
  crearSubdominios: boolean;
  
  // Listas de distribución
  crearListas: boolean;
  cantidadListas: number;
  usuariosPorLista: number;
  listaBlancaNegra: boolean;
  cantidadDominios: number; // NUEVO: cantidad de dominios para lista blanca/negra
  bloqueoIPs: boolean;
  cantidadIPs: number;
  
  // Reglas
  crearReglas: boolean;
  cantidadReglas: number;
}

interface TenantNuevoActions {
  setTarea: (tarea: "creacion" | "existente") => void;
  setCantidadUsuarios: (cantidad: number) => void;
  setCrearSubdominios: (crear: boolean) => void;
  setCrearListas: (crear: boolean) => void;
  setCantidadListas: (cantidad: number) => void;
  setUsuariosPorLista: (cantidad: number) => void;
  setListaBlancaNegra: (activo: boolean) => void;
  setCantidadDominios: (cantidad: number) => void; // NUEVO
  setBloqueoIPs: (activo: boolean) => void;
  setCantidadIPs: (cantidad: number) => void;
  setCrearReglas: (crear: boolean) => void;
  setCantidadReglas: (cantidad: number) => void;
  reset: () => void;
}

const initialState: TenantNuevoState = {
  tarea: "creacion",
  cantidadUsuarios: 0,
  crearSubdominios: false,
  crearListas: false,
  cantidadListas: 0,
  usuariosPorLista: 0,
  listaBlancaNegra: false,
  cantidadDominios: 0, // NUEVO
  bloqueoIPs: false,
  cantidadIPs: 0,
  crearReglas: false,
  cantidadReglas: 0,
};

export const useTenantNuevoStore = create<TenantNuevoState & TenantNuevoActions>(
  (set) => ({
    ...initialState,
    
    setTarea: (tarea) => set({ tarea }),
    setCantidadUsuarios: (cantidadUsuarios) => set({ cantidadUsuarios }),
    setCrearSubdominios: (crearSubdominios) => set({ crearSubdominios }),
    setCrearListas: (crearListas) => set({ crearListas }),
    setCantidadListas: (cantidadListas) => set({ cantidadListas }),
    setUsuariosPorLista: (usuariosPorLista) => set({ usuariosPorLista }),
    setListaBlancaNegra: (listaBlancaNegra) => set({ listaBlancaNegra }),
    setCantidadDominios: (cantidadDominios) => set({ cantidadDominios }), // NUEVO
    setBloqueoIPs: (bloqueoIPs) => set({ bloqueoIPs }),
    setCantidadIPs: (cantidadIPs) => set({ cantidadIPs }),
    setCrearReglas: (crearReglas) => set({ crearReglas }),
    setCantidadReglas: (cantidadReglas) => set({ cantidadReglas }),
    reset: () => set(initialState),
  })
);