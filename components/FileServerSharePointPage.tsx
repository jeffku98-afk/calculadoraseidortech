"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
  Chip,
  Switch,
} from "@nextui-org/react";
import { useFileServerSharePointStore } from "@/lib/fileserver-sharepoint-store";
import { calcularTiempoFileServerSharePoint } from "@/lib/calcular-fileserver-sharepoint";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function FileServerSharePointPage() {
  const state = useFileServerSharePointStore();
  const resultado = calcularTiempoFileServerSharePoint(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "File Server a SharePoint",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      nombreCliente: state.nombreCliente || undefined,
      disclaimer:
        "Los tiempos de migración pueden variar según la velocidad de red, la cantidad de archivos y la complejidad de la estructura de permisos.",
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
    });
  };

  // ── Helpers de cálculo para mostrar en tiempo real ──────────────────────
  const pesoEnTB =
    state.pesoMigracion > 0
      ? state.unidadPesoMigracion === "GB"
        ? state.pesoMigracion / 1024
        : state.pesoMigracion
      : 0;
  const horasMonitoreo = pesoEnTB > 0 ? Math.max(2, pesoEnTB * 2) : 0;
  const esMinimoAplicado = pesoEnTB > 0 && pesoEnTB < 1;

  const minutosPreparacion =
    state.cantidadSitios * 15 + 120; // sitios + agente
  const horasPreparacionH = Math.floor(minutosPreparacion / 60);
  const minutosPreparacionM = minutosPreparacion % 60;

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span>Migración</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">File Server a SharePoint</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          File Server a SharePoint
        </h1>
        <p className="text-lg text-seidor-500">
          Migración de File Server on-premise a SharePoint Online
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── FORMULARIO ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* NOMBRE DEL CLIENTE */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Nombre del Cliente</h2>
                <p className="text-sm opacity-90">Aparecerá en el PDF generado</p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="text"
                label="Nombre del cliente"
                placeholder="Ej: Empresa ABC S.A."
                value={state.nombreCliente}
                onValueChange={state.setNombreCliente}
                className="max-w-md"
              />
            </CardBody>
          </Card>

          {/* ── SECCIÓN 1: LEVANTAMIENTO DE INFORMACIÓN ─────────── */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold">
                    1. Levantamiento de información
                  </h2>
                  <p className="text-sm opacity-90">Tiempo fijo</p>
                </div>
                <Chip
                  size="lg"
                  className="bg-white/20 text-white font-bold border border-white/30"
                >
                  2.5 horas
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-3">
                {[
                  {
                    label: "Inventario del file server",
                    desc: "Tamaño, cantidad de archivos, profundidad de rutas",
                    tiempo: "1 hora",
                  },
                  {
                    label: "Revisión de estructura de permisos NTFS",
                    desc: "Análisis de permisos y grupos de acceso",
                    tiempo: "1 hora",
                  },
                  {
                    label: "Definición de taxonomía destino en SPO",
                    desc: "Estructura de bibliotecas y carpetas en SharePoint Online",
                    tiempo: "30 min",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="ml-3 bg-seidor-50 text-seidor-400 font-semibold shrink-0"
                    >
                      {item.tiempo}
                    </Chip>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-seidor-400">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">ℹ️ Tiempo fijo:</span> Esta sección tiene
                  una duración fija de <strong>2.5 horas</strong> independientemente del
                  tamaño de la migración.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* ── SECCIÓN 2: PREPARAR MIGRACIÓN Y DESTINO ─────────── */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold">
                    2. Preparar migración y destino
                  </h2>
                  <p className="text-sm opacity-90">
                    2 horas fijas + 15 min por sitio
                  </p>
                </div>
                {(state.cantidadSitios > 0 || true) && (
                  <Chip
                    size="lg"
                    className="bg-white/20 text-white font-bold border border-white/30"
                  >
                    {minutosPreparacionM > 0
                      ? `${horasPreparacionH}h ${minutosPreparacionM}min`
                      : `${horasPreparacionH} horas`}
                  </Chip>
                )}
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              {/* 2a. Creación de sitios */}
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      Creación del sitio SharePoint y configuración de permisos SPO
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Grupos y niveles de acceso — 15 minutos por sitio
                    </p>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="ml-3 bg-seidor-50 text-seidor-400 font-semibold shrink-0"
                  >
                    15 min/sitio
                  </Chip>
                </div>

                <Input
                  type="number"
                  label="Cantidad de sitios a crear"
                  placeholder="Ej: 4"
                  value={state.cantidadSitios.toString()}
                  onValueChange={(value) =>
                    state.setCantidadSitios(parseInt(value) || 0)
                  }
                  min={0}
                  className="max-w-xs"
                  description={
                    state.cantidadSitios > 0
                      ? `${state.cantidadSitios} sitios × 15 min = ${state.cantidadSitios * 15} minutos`
                      : ""
                  }
                  endContent={
                    <span className="text-gray-500 text-sm">sitios</span>
                  }
                />
              </div>

              <Divider />

              {/* 2b. Agente */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    Instalar agente y configurar credenciales
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Configuración del agente de migración en el servidor origen
                  </p>
                </div>
                <Chip
                  size="sm"
                  variant="flat"
                  className="ml-3 bg-seidor-50 text-seidor-400 font-semibold shrink-0"
                >
                  2 horas
                </Chip>
              </div>
            </CardBody>
          </Card>

          {/* ── SECCIÓN 3: EJECUCIÓN DE MIGRACIÓN ───────────────── */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold">
                    3. Ejecución de migración
                  </h2>
                  <p className="text-sm opacity-90">
                    3 horas fijas + 2 horas por TB (mínimo 2h)
                  </p>
                </div>
                {state.pesoMigracion > 0 && (
                  <Chip
                    size="lg"
                    className="bg-white/20 text-white font-bold border border-white/30"
                  >
                    {(() => {
                      const total = Math.round(horasMonitoreo * 60) + 180; // monitoreo + logs
                      const h = Math.floor(total / 60);
                      const m = total % 60;
                      return m > 0 ? `${h}h ${m}min` : `${h} horas`;
                    })()}
                  </Chip>
                )}
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              {/* 3a. Monitoreo */}
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      Monitoreo de migración
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      2 horas por TB — tiempo mínimo 2 horas
                    </p>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="ml-3 bg-seidor-50 text-seidor-400 font-semibold shrink-0"
                  >
                    2h/TB
                  </Chip>
                </div>

                {/* Input de peso */}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    label="Peso total a migrar"
                    placeholder="Ej: 500"
                    value={state.pesoMigracion.toString()}
                    onValueChange={(value) =>
                      state.setPesoMigracion(parseFloat(value) || 0)
                    }
                    min={0}
                    step="0.1"
                    className="flex-1"
                  />
                  <div className="w-24">
                    <select
                      value={state.unidadPesoMigracion}
                      onChange={(e) =>
                        state.setUnidadPesoMigracion(
                          e.target.value as "GB" | "TB"
                        )
                      }
                      className="w-full h-[56px] px-3 rounded-lg border-2 border-gray-300 focus:border-seidor-400 focus:outline-none bg-white text-sm"
                    >
                      <option value="GB">GB</option>
                      <option value="TB">TB</option>
                    </select>
                  </div>
                </div>

                {/* Resultado del cálculo de monitoreo */}
                {state.pesoMigracion > 0 && (
                  <div className="p-4 bg-gradient-to-br from-seidor-50 to-blue-50 rounded-lg border border-seidor-100 space-y-2">
                    <h4 className="font-bold text-seidor-400 text-sm">
                      Estimación de monitoreo:
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-gray-600">Peso en TB:</span>
                        <span className="font-semibold text-seidor-400">
                          {pesoEnTB.toFixed(3)} TB
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-gray-600">Velocidad:</span>
                        <span className="font-semibold text-seidor-400">
                          2 horas / TB
                        </span>
                      </div>
                      {esMinimoAplicado && (
                        <div className="flex justify-between p-2 bg-amber-50 rounded border border-amber-200">
                          <span className="text-amber-700 text-xs">
                            ⚠️ Se aplica tiempo mínimo de 2 horas
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between p-3 bg-seidor-400 text-white rounded-lg">
                        <span className="font-semibold">Tiempo de monitoreo:</span>
                        <span className="font-bold text-lg">
                          {horasMonitoreo % 1 === 0
                            ? `${horasMonitoreo} ${horasMonitoreo === 1 ? "hora" : "horas"}`
                            : `${Math.floor(horasMonitoreo)}h ${Math.round((horasMonitoreo % 1) * 60)}min`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Divider />

              {/* 3b. Revisar logs */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    Revisión de logs
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Verificación de errores y advertencias post-ejecución
                  </p>
                </div>
                <Chip
                  size="sm"
                  variant="flat"
                  className="ml-3 bg-seidor-50 text-seidor-400 font-semibold shrink-0"
                >
                  3 horas
                </Chip>
              </div>
            </CardBody>
          </Card>

          {/* ── SECCIÓN 4: VALIDACIÓN POST-MIGRACIÓN ────────────── */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold">
                    4. Validación post-migración
                  </h2>
                  <p className="text-sm opacity-90">Tiempo fijo</p>
                </div>
                <Chip
                  size="lg"
                  className="bg-white/20 text-white font-bold border border-white/30"
                >
                  2 horas
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-3">
                {[
                  {
                    label: "Validación de integridad",
                    desc: "Archivos y carpetas migrados correctamente",
                  },
                  {
                    label: "Verificación de permisos",
                    desc: "Grupos y niveles de acceso correctos en SPO",
                  },
                  {
                    label: "Validación de accesos",
                    desc: "Pruebas de acceso por parte de usuarios",
                  },
                  {
                    label: "Desactivación / redireccionamiento del file server origen",
                    desc: "Redirección de usuarios al nuevo destino en SharePoint",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="w-5 h-5 rounded-full bg-seidor-400 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-seidor-400">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">ℹ️ Tiempo fijo:</span> 2 horas para completar todas las actividades de validación.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* ── SECCIÓN 5: INFORME Y PRESENTACIÓN ───────────────── */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold">
                    5. Elaborar informe y presentación
                  </h2>
                  <p className="text-sm opacity-90">Tiempo fijo</p>
                </div>
                <Chip
                  size="lg"
                  className="bg-white/20 text-white font-bold border border-white/30"
                >
                  2 horas
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-5 h-5 rounded-full bg-seidor-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    Documentación y entrega
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Elaboración del informe final y presentación de resultados al cliente
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* ── SECCIÓN 6: TIEMPO ESTIMADO DE MIGRACIÓN ─────────── */}
          <Card className="border-2 border-indigo-100">
            <CardHeader className="bg-gradient-to-r from-indigo-400 to-indigo-300 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tiempo Estimado de Migración
                  </h2>
                  <p className="text-sm opacity-90">
                    6 minutos por GB
                  </p>
                </div>
                {state.pesoTiempoMigracion > 0 && (() => {
                  const gb = state.unidadPesoTiempoMigracion === "TB"
                    ? state.pesoTiempoMigracion * 1024
                    : state.pesoTiempoMigracion;
                  const mins = Math.round(gb * 6);
                  const h = Math.floor(mins / 60);
                  const m = mins % 60;
                  const texto = m > 0 ? `${h}h ${m}min` : `${h} horas`;
                  return (
                    <Chip size="lg" className="bg-white/20 text-white font-bold border border-white/30">
                      {texto}
                    </Chip>
                  );
                })()}
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              {/* Switch */}
              <div className="pb-4 border-b border-gray-200">
                <Switch
                  isSelected={state.incluirTiempoMigracion}
                  onValueChange={state.setIncluirTiempoMigracion}
                >
                  <div>
                    <p className="font-semibold text-indigo-700">
                      Incluir en el tiempo total estimado
                    </p>
                    <p className="text-sm text-gray-600">
                      Si se activa, este tiempo se sumará al total y aparecerá en el PDF
                    </p>
                  </div>
                </Switch>
              </div>

              {/* Input de peso */}
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      Peso total a migrar
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Se calculan 6 minutos por cada GB
                    </p>
                  </div>
                  <Chip size="sm" variant="flat" className="ml-3 bg-indigo-50 text-indigo-600 font-semibold shrink-0">
                    6 min/GB
                  </Chip>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    label="Peso total a migrar"
                    placeholder="Ej: 500"
                    value={state.pesoTiempoMigracion.toString()}
                    onValueChange={(value) =>
                      state.setPesoTiempoMigracion(parseFloat(value) || 0)
                    }
                    min={0}
                    step="0.1"
                    className="flex-1"
                  />
                  <div className="w-24">
                    <select
                      value={state.unidadPesoTiempoMigracion}
                      onChange={(e) =>
                        state.setUnidadPesoTiempoMigracion(e.target.value as "GB" | "TB")
                      }
                      className="w-full h-[56px] px-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white text-sm"
                    >
                      <option value="GB">GB</option>
                      <option value="TB">TB</option>
                    </select>
                  </div>
                </div>

                {/* Resultado */}
                {state.pesoTiempoMigracion > 0 && (() => {
                  const pesoEnGB = state.unidadPesoTiempoMigracion === "TB"
                    ? state.pesoTiempoMigracion * 1024
                    : state.pesoTiempoMigracion;
                  const minutosMigracion = Math.round(pesoEnGB * 6);
                  const horas = Math.floor(minutosMigracion / 60);
                  const mins = minutosMigracion % 60;
                  const dias = (minutosMigracion / 60 / 8).toFixed(1); // días laborales de 8h

                  return (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg space-y-2">
                      <h4 className="font-bold text-indigo-800 text-sm mb-3">
                        Resultado del cálculo:
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-white rounded">
                          <span className="text-gray-600">Peso en GB:</span>
                          <span className="font-semibold text-indigo-700">
                            {pesoEnGB.toLocaleString("es", { maximumFractionDigits: 2 })} GB
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-white rounded">
                          <span className="text-gray-600">Velocidad de cálculo:</span>
                          <span className="font-semibold text-indigo-700">6 min / GB</span>
                        </div>
                        <Divider className="my-1" />
                        <div className="p-3 bg-indigo-600 text-white rounded-lg">
                          <div className="text-xs opacity-90 mb-1">Tiempo estimado de migración:</div>
                          <div className="text-2xl font-bold">
                            {horas > 0 && mins > 0 ? `${horas} horas ${mins} min` :
                             horas > 0 ? `${horas} ${horas === 1 ? "hora" : "horas"}` :
                             `${mins} min`}
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            ≈ {dias} días laborales (8h/día)
                          </div>
                        </div>
                        {!state.incluirTiempoMigracion && (
                          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                            ⚠️ Este tiempo <strong>no se suma</strong> al total. Activa el switch para incluirlo.
                          </div>
                        )}
                        {state.incluirTiempoMigracion && (
                          <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                            ✓ Este tiempo <strong>se incluye</strong> en el total estimado y en el PDF.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Info */}
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                <p className="text-sm text-indigo-900">
                  <span className="font-semibold">ℹ️ Nota:</span> Este cálculo estima el tiempo
                  de transferencia a razón de <strong>6 minutos por GB</strong>. El tiempo real
                  puede variar según la velocidad de red y la estructura de los archivos.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Botones */}
          <div className="flex gap-3">
            <Button
              color="danger"
              variant="flat"
              onPress={state.reset}
              startContent={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Limpiar formulario
            </Button>
            <Button
              className="bg-seidor-400 text-white hover:bg-seidor-500"
              onPress={handleDescargarPDF}
              startContent={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            >
              Descargar PDF
            </Button>
          </div>
        </div>

        {/* ── RESUMEN LATERAL ─────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            {/* Total */}
            <Card className="bg-gradient-to-br from-seidor-400 to-seidor-300 text-white">
              <CardHeader>
                <h3 className="text-xl font-bold">Tiempo Total Estimado</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center py-4">
                  <div className="text-5xl font-bold mb-1">{resultado.horas}</div>
                  <div className="text-xl mb-1">
                    {resultado.horas === 1 ? "hora" : "horas"}
                  </div>
                  {resultado.minutos > 0 && (
                    <div className="text-3xl font-semibold">
                      {resultado.minutos} min
                    </div>
                  )}
                </div>
                <Divider className="bg-white/30 my-4" />
                {/* Desglose por sección */}
                <div className="space-y-2">
                  {[
                    { label: "Levantamiento", min: 150 },
                    {
                      label: "Preparar migración",
                      min: state.cantidadSitios * 15 + 120,
                    },
                    {
                      label: "Ejecución",
                      min: state.pesoMigracion > 0
                        ? Math.round(horasMonitoreo * 60) + 180
                        : 180,
                    },
                    { label: "Validación", min: 120 },
                    { label: "Informe", min: 120 },
                    ...(state.incluirTiempoMigracion && state.pesoTiempoMigracion > 0
                      ? [{
                          label: "Tiempo migración",
                          min: Math.round(
                            (state.unidadPesoTiempoMigracion === "TB"
                              ? state.pesoTiempoMigracion * 1024
                              : state.pesoTiempoMigracion) * 6
                          ),
                        }]
                      : []),
                  ].map((s, i) => {
                    const h = Math.floor(s.min / 60);
                    const m = s.min % 60;
                    const texto = m > 0 ? `${h}h ${m}min` : `${h} ${h === 1 ? "hora" : "horas"}`;
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg text-sm"
                      >
                        <span className="opacity-90">{s.label}</span>
                        <span className="font-semibold">{texto}</span>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Detalle completo */}
            <Card className="max-h-[400px] overflow-y-auto">
              <CardHeader>
                <h4 className="font-semibold text-seidor-400">
                  Desglose detallado
                </h4>
              </CardHeader>
              <CardBody className="p-3">
                <div className="space-y-2">
                  {resultado.desglose.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      Completa el formulario para ver el desglose
                    </p>
                  ) : (
                    resultado.desglose.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded-lg text-sm border border-gray-100"
                      >
                        <div className="font-semibold text-seidor-400">
                          {item.concepto}
                        </div>
                        <div className="text-gray-600">{item.tiempo}</div>
                        {item.detalle && (
                          <div className="text-xs text-gray-400 mt-0.5">
                            {item.detalle}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}