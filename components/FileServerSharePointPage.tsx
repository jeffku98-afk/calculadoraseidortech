"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
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
        "Los tiempos de migración pueden variar según la velocidad de internet y la cantidad/estructura de archivos a migrar.",
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
    });
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span>Migración</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">
          File Server a SharePoint
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          File Server a SharePoint
        </h1>
        <p className="text-lg text-seidor-500">
          Migración de File Server a SharePoint Online
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* NOMBRE DEL CLIENTE */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Nombre del Cliente
                </h3>
                <p className="text-sm text-seidor-500">
                  Ingresa el nombre del cliente para este cálculo
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="text"
                label="Nombre del cliente"
                placeholder="Ej: Empresa ABC S.A."
                value={state.nombreCliente}
                onValueChange={(value) => state.setNombreCliente(value)}
                className="max-w-md"
                description="Este nombre aparecerá en el PDF generado"
              />
            </CardBody>
          </Card>

          {/* INSTALACIÓN Y CONFIGURACIÓN */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">
                  Instalación y Configuración
                </h2>
                <p className="text-sm opacity-90">Tiempo fijo de 1 hora</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">
                      SharePoint Migration Tools
                    </p>
                    <p className="leading-relaxed">
                      La instalación y configuración de SharePoint Migration
                      Tools tiene un tiempo fijo de <strong>1 hora</strong>. Este
                      tiempo se agrega automáticamente al cálculo total.
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* CREACIÓN DE SITIOS Y CARGA DE DATA */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Creación de sitios y carga de data
                </h3>
                <p className="text-sm text-seidor-500">
                  5 min por sitio + 15 min permisos + 15 min carga de data
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Cantidad de sitios"
                placeholder="Ej: 10"
                value={state.cantidadSitios.toString()}
                onValueChange={(value) =>
                  state.setCantidadSitios(parseInt(value) || 0)
                }
                min={0}
                className="max-w-md"
                description={
                  state.cantidadSitios > 0
                    ? `${state.cantidadSitios * 35} minutos total (5 min creación + 15 min permisos + 15 min carga de data por sitio)`
                    : ""
                }
              />
              {state.cantidadSitios > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-2">Desglose por sitio:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Creación del sitio: 5 minutos</li>
                      <li>• Permisos, seguimiento y monitoreo: 15 minutos</li>
                      <li>• Carga de data: 15 minutos</li>
                      <li className="font-semibold text-seidor-400">
                        Total por sitio: 35 minutos
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* TIEMPO ESTIMADO DE MIGRACIÓN */}
          <Card className="border-2 border-amber-200">
            <CardHeader className="bg-amber-50 pb-3">
              <div>
                <h2 className="text-xl font-bold text-amber-800">
                  Tiempo Estimado de Migración
                </h2>
                <p className="text-sm text-amber-700">
                  6 minutos por GB (solo referencia, no suma horas)
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                type="number"
                label="Peso total en GB"
                placeholder="Ej: 500"
                value={state.pesoGB.toString()}
                onValueChange={(value) => state.setPesoGB(parseInt(value) || 0)}
                min={0}
                className="max-w-md"
                endContent={
                  <span className="text-gray-500 text-sm">GB</span>
                }
                description={
                  state.pesoGB > 0
                    ? `Tiempo estimado: ${Math.floor((state.pesoGB * 6) / 60)} horas ${
                        (state.pesoGB * 6) % 60
                      } min`
                    : ""
                }
              />

              {resultado.tiempoMigracion && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-2">
                        Tiempo de migración estimado:
                      </p>
                      <p className="text-2xl font-bold text-amber-700">
                        {resultado.tiempoMigracion.horas > 0 && (
                          <>
                            {resultado.tiempoMigracion.horas}{" "}
                            {resultado.tiempoMigracion.horas === 1
                              ? "hora"
                              : "horas"}
                          </>
                        )}{" "}
                        {resultado.tiempoMigracion.minutos > 0 && (
                          <>{resultado.tiempoMigracion.minutos} min</>
                        )}
                      </p>
                      <p className="mt-2 text-xs opacity-90">
                        Este tiempo es solo de referencia y{" "}
                        <strong>NO suma</strong> a las horas de operación. El
                        tiempo real puede variar según la velocidad de internet y
                        la estructura de archivos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-blue-50 border-l-4 border-blue-500">
            <CardBody>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">
                    Información sobre tiempos de migración:
                  </p>
                  <p className="leading-relaxed">
                    Los tiempos de migración pueden variar según la velocidad de
                    internet y la cantidad/estructura de archivos a migrar.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              color="danger"
              variant="flat"
              onPress={state.reset}
              startContent={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
            >
              Reiniciar
            </Button>
            <Button
              color="primary"
              variant="solid"
              onPress={handleDescargarPDF}
              isDisabled={resultado.total === 0}
              startContent={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            >
              Descargar PDF
            </Button>
          </div>
        </div>

        {/* Resumen de Cálculo */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="bg-gradient-to-br from-seidor-400 to-seidor-300 text-white max-h-[calc(100vh-6rem)] overflow-y-auto">
              <CardHeader>
                <h3 className="text-xl font-bold">Tiempo Total Estimado</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold mb-2">
                    {resultado.horas}
                  </div>
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
                <div className="space-y-3">
                  <p className="font-semibold text-sm opacity-90">
                    Desglose de tiempo:
                  </p>
                  {resultado.desglose.length === 0 ? (
                    <p className="text-sm opacity-75 italic">
                      Completa el formulario para ver el desglose
                    </p>
                  ) : (
                    resultado.desglose.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/10 p-3 rounded-lg text-sm"
                      >
                        <div className="font-semibold">{item.concepto}</div>
                        <div className="opacity-90">{item.tiempo}</div>
                        {item.detalle && (
                          <div className="text-xs opacity-75 mt-1">
                            {item.detalle}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Tiempo de Migración (Referencia) */}
                {resultado.tiempoMigracion && (
                  <>
                    <Divider className="bg-white/30 my-4" />
                    <div className="bg-amber-500/20 p-4 rounded-lg">
                      <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Tiempo de Migración (Referencia)
                      </p>
                      <div className="text-2xl font-bold mb-1">
                        {resultado.tiempoMigracion.horas > 0 && (
                          <>
                            {resultado.tiempoMigracion.horas}{" "}
                            {resultado.tiempoMigracion.horas === 1
                              ? "hora"
                              : "horas"}
                          </>
                        )}{" "}
                        {resultado.tiempoMigracion.minutos > 0 && (
                          <>{resultado.tiempoMigracion.minutos} min</>
                        )}
                      </div>
                      <div className="text-xs opacity-75">
                        {resultado.tiempoMigracion.pesoGB} GB × 6 min
                      </div>
                      <div className="text-xs opacity-90 mt-2 italic">
                        * No suma a horas de operación
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}