import { TenantNuevoState } from "./tenant-nuevo-store";

export interface TiempoCalculado {
  horas: number;
  minutos: number;
  total: number; // en minutos
  desglose: {
    concepto: string;
    tiempo: string;
    detalle?: string;
  }[];
}

export function calcularTiempoTenantNuevo(
  state: TenantNuevoState
): TiempoCalculado {
  const desglose: TiempoCalculado["desglose"] = [];
  let totalMinutos = 0;

  // 1. CREACIÓN DE TENANT - FIJO: 2 horas
  totalMinutos += 120; // 2 horas
  desglose.push({
    concepto: "Creación de Tenant",
    tiempo: "2 horas",
  });

  // 2. USUARIOS - 5 minutos por usuario
  if (state.cantidadUsuarios > 0) {
    const minutosUsuarios = state.cantidadUsuarios * 5;
    totalMinutos += minutosUsuarios;
    const horas = Math.floor(minutosUsuarios / 60);
    const minutos = minutosUsuarios % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Crear usuarios y asignar licencias",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadUsuarios} usuarios (5 min c/u)`,
    });
  }

  // 3. SUBDOMINIOS - 1 hora por subdominio
  if (state.cantidadSubdominios > 0) {
    const minutosSubdominios = state.cantidadSubdominios * 60;
    totalMinutos += minutosSubdominios;
    desglose.push({
      concepto: "Creación de subdominios",
      tiempo: `${state.cantidadSubdominios} ${
        state.cantidadSubdominios === 1 ? "hora" : "horas"
      }`,
      detalle: `${state.cantidadSubdominios} ${
        state.cantidadSubdominios === 1 ? "subdominio" : "subdominios"
      } (1h c/u)`,
    });
  }

  // 4. LISTAS DE DISTRIBUCIÓN - 15 minutos por lista
  if (state.crearListas && state.cantidadListas > 0) {
    const minutosListas = state.cantidadListas * 15;
    totalMinutos += minutosListas;
    const horas = Math.floor(minutosListas / 60);
    const minutos = minutosListas % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Creación de listas de distribución",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadListas} ${
        state.cantidadListas === 1 ? "lista" : "listas"
      } (15 min c/u)`,
    });
  }

  // 6. LISTAS BLANCA/NEGRA - 1 minuto por dominio
  if (state.listasBlancaNegra && state.cantidadDominiosListas > 0) {
    const minutosListasBN = state.cantidadDominiosListas * 1;
    totalMinutos += minutosListasBN;
    const horas = Math.floor(minutosListasBN / 60);
    const minutos = minutosListasBN % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Creación de lista blanca/lista negra",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadDominiosListas} ${
        state.cantidadDominiosListas === 1 ? "dominio" : "dominios"
      } (1 min c/u)`,
    });
  }

  // 7. CREACIÓN DE REGLAS - 15 minutos por regla
  if (state.crearReglas && state.cantidadReglas > 0) {
    const minutosReglas = state.cantidadReglas * 15;
    totalMinutos += minutosReglas;
    const horas = Math.floor(minutosReglas / 60);
    const minutos = minutosReglas % 60;
    let tiempoTexto = "";
    if (horas > 0) {
      tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
      if (minutos > 0) tiempoTexto += ` ${minutos} min`;
    } else {
      tiempoTexto = `${minutos} min`;
    }
    desglose.push({
      concepto: "Creación de reglas",
      tiempo: tiempoTexto,
      detalle: `${state.cantidadReglas} reglas (15 min c/u)`,
    });
  }

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return {
    horas,
    minutos,
    total: totalMinutos,
    desglose,
  };
}

export function formatearTiempo(horas: number, minutos: number): string {
  if (horas === 0 && minutos === 0) return "0 minutos";
  if (horas === 0) return `${minutos} minutos`;
  if (minutos === 0) return `${horas} ${horas === 1 ? "hora" : "horas"}`;
  return `${horas} ${horas === 1 ? "hora" : "horas"} y ${minutos} minutos`;
}