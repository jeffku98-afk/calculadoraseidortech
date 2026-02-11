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

  // 1. TAREA: Creación de tenant o Tenant existente
  if (state.tarea === "creacion") {
    totalMinutos += 180; // 3 horas
    desglose.push({
      concepto: "Creación de tenant",
      tiempo: "3 horas",
    });
  } else {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Configuración de tenant existente",
      tiempo: "1 hora",
    });
  }

  // 2. CANTIDAD DE USUARIOS
  // Entre 1-10: 1h, 11-20: 2h, 21-30: 3h, etc.
  if (state.cantidadUsuarios > 0) {
    const horasUsuarios = Math.ceil(state.cantidadUsuarios / 10);
    totalMinutos += horasUsuarios * 60;
    desglose.push({
      concepto: "Configuración de usuarios",
      tiempo: `${horasUsuarios} ${horasUsuarios === 1 ? "hora" : "horas"}`,
      detalle: `${state.cantidadUsuarios} usuarios`,
    });
  }

  // 3. CREACIÓN DE SUBDOMINIOS
  if (state.crearSubdominios) {
    totalMinutos += 60; // 1 hora
    desglose.push({
      concepto: "Creación de subdominios",
      tiempo: "1 hora",
    });
  }

  // 4. CREACIÓN DE LISTAS DE DISTRIBUCIÓN
  if (state.crearListas) {
    // Tiempo base por listas (asumimos tiempo por cada lista)
    if (state.cantidadListas > 0) {
      desglose.push({
        concepto: "Creación de listas de distribución",
        tiempo: "Incluido en configuraciones",
        detalle: `${state.cantidadListas} listas, ${state.usuariosPorLista} usuarios por lista`,
      });
    }

    // Lista Blanca/Negra - ACTUALIZADO: 5 minutos por dominio
    if (state.listaBlancaNegra && state.cantidadDominios > 0) {
      const minutosDominios = state.cantidadDominios * 5;
      totalMinutos += minutosDominios;
      const horas = Math.floor(minutosDominios / 60);
      const minutos = minutosDominios % 60;
      let tiempoTexto = "";
      if (horas > 0) {
        tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
        if (minutos > 0) tiempoTexto += ` ${minutos} min`;
      } else {
        tiempoTexto = `${minutos} min`;
      }
      desglose.push({
        concepto: "Configuración de Lista Blanca/Negra",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadDominios} dominios (5 min c/u)`,
      });
    }

    // Bloqueo de IPs
    if (state.bloqueoIPs && state.cantidadIPs > 0) {
      const minutosPorIP = state.cantidadIPs * 5;
      totalMinutos += minutosPorIP;
      const horas = Math.floor(minutosPorIP / 60);
      const minutos = minutosPorIP % 60;
      let tiempoTexto = "";
      if (horas > 0) {
        tiempoTexto = `${horas} ${horas === 1 ? "hora" : "horas"}`;
        if (minutos > 0) tiempoTexto += ` ${minutos} min`;
      } else {
        tiempoTexto = `${minutos} min`;
      }
      desglose.push({
        concepto: "Bloqueo de IPs",
        tiempo: tiempoTexto,
        detalle: `${state.cantidadIPs} IPs (5 min c/u)`,
      });
    }
  }

  // 5. CREACIÓN DE REGLAS
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