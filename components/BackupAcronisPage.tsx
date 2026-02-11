"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Switch,
  RadioGroup,
  Radio,
  Button,
  Divider,
  Chip,
} from "@nextui-org/react";
import { useBackupAcronisStore } from "@/lib/backup-acronis-store";
import { calcularTiempoBackupAcronis } from "@/lib/calcular-backup-acronis";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";

export function BackupAcronisPage() {
  const state = useBackupAcronisStore();
  const resultado = calcularTiempoBackupAcronis(state);

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "Backup Acronis",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      disclaimer: "*El tiempo de sincronización para poder visualizar las cuentas en Acronis, dependerá de la cantidad de usuarios que se tenga en su tenant.",
    });
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">Backup Acronis</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Backup Acronis
        </h1>
        <p className="text-lg text-seidor-500">
          Configuración de copias de seguridad con Acronis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. PLATAFORMA DEL PROYECTO */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Plataforma del Proyecto
                </h3>
                <p className="text-sm text-seidor-500">
                  Selecciona la plataforma a respaldar
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <RadioGroup
                value={state.plataforma || ""}
                onValueChange={(value) =>
                  state.setPlataforma(
                    value as "google" | "microsoft" | null
                  )
                }
              >
                <Radio value="google">Google Workspace</Radio>
                <Radio value="microsoft">Microsoft 365</Radio>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* CONFIGURACIÓN SEGÚN PLATAFORMA */}
          
          {/* GOOGLE */}
          {state.plataforma === "google" && (
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <div>
                  <h3 className="text-lg font-semibold text-seidor-400">
                    Configuración de Google Workspace
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Cuentas a adicionar */}
                <Input
                  type="number"
                  label="Cuentas a adicionar"
                  placeholder="Ej: 50"
                  value={state.cantidadUsuarios.toString()}
                  onValueChange={(value) =>
                    state.setCantidadUsuarios(parseInt(value) || 0)
                  }
                  min={0}
                  description={
                    state.cantidadUsuarios > 0
                      ? `${state.cantidadUsuarios} minutos (1 min por usuario)`
                      : "1 minuto por usuario"
                  }
                />

                {/* Google Cloud Platform - Obligatorio */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
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
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">
                        Creación de proyecto en Google Cloud Platform
                      </p>
                      <p className="text-sm text-blue-800">
                        Este paso es obligatorio al seleccionar Google Workspace
                      </p>
                      <p className="text-sm font-semibold text-blue-900 mt-2">
                        Tiempo: 2 horas
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* MICROSOFT */}
          {state.plataforma === "microsoft" && (
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <div>
                  <h3 className="text-lg font-semibold text-seidor-400">
                    Configuración de Microsoft 365
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Cuentas a adicionar */}
                <Input
                  type="number"
                  label="Cuentas a adicionar"
                  placeholder="Ej: 50"
                  value={state.cantidadUsuarios.toString()}
                  onValueChange={(value) =>
                    state.setCantidadUsuarios(parseInt(value) || 0)
                  }
                  min={0}
                  description={
                    state.cantidadUsuarios > 0
                      ? `${state.cantidadUsuarios} minutos (1 min por usuario)`
                      : "1 minuto por usuario"
                  }
                />

                <Divider />

                {/* Sitios de SharePoint */}
                <div>
                  <Switch
                    isSelected={state.sitiosSharepoint}
                    onValueChange={state.setSitiosSharepoint}
                  >
                    <div>
                      <p className="font-semibold text-seidor-400">
                        Sitios de SharePoint
                      </p>
                      <p className="text-sm text-seidor-500">
                        2 minutos por sitio
                      </p>
                    </div>
                  </Switch>
                  {state.sitiosSharepoint && (
                    <div className="mt-3 ml-6">
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de sitios a adicionar"
                        placeholder="Ej: 15"
                        value={state.cantidadSitios.toString()}
                        onValueChange={(value) =>
                          state.setCantidadSitios(parseInt(value) || 0)
                        }
                        min={0}
                        description={
                          state.cantidadSitios > 0
                            ? `${state.cantidadSitios * 2} minutos total`
                            : ""
                        }
                      />
                    </div>
                  )}
                </div>

                <Divider />

                {/* Equipos de Teams */}
                <div>
                  <Switch
                    isSelected={state.equiposTeams}
                    onValueChange={state.setEquiposTeams}
                  >
                    <div>
                      <p className="font-semibold text-seidor-400">
                        Equipos de Teams
                      </p>
                      <p className="text-sm text-seidor-500">
                        2 minutos por equipo
                      </p>
                    </div>
                  </Switch>
                  {state.equiposTeams && (
                    <div className="mt-3 ml-6">
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de equipos a adicionar"
                        placeholder="Ej: 20"
                        value={state.cantidadEquipos.toString()}
                        onValueChange={(value) =>
                          state.setCantidadEquipos(parseInt(value) || 0)
                        }
                        min={0}
                        description={
                          state.cantidadEquipos > 0
                            ? `${state.cantidadEquipos * 2} minutos total`
                            : ""
                        }
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}

          {/* CONFIGURACIONES POR DEFECTO (siempre visibles) */}
          <Card className="border-2 border-seidor-300">
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  Configuraciones Incluidas
                </h3>
                <p className="text-sm opacity-90">
                  Estas configuraciones se incluyen por defecto
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-seidor-50 rounded-lg">
                <div>
                  <p className="font-semibold text-seidor-400">
                    Creación de tenant en Acronis
                  </p>
                  <p className="text-sm text-seidor-500">Configuración inicial</p>
                </div>
                <Chip color="primary" variant="flat">
                  30 min
                </Chip>
              </div>

              <div className="flex items-center justify-between p-3 bg-seidor-50 rounded-lg">
                <div>
                  <p className="font-semibold text-seidor-400">
                    Creación de planes de copia de seguridad
                  </p>
                  <p className="text-sm text-seidor-500">Políticas de respaldo</p>
                </div>
                <Chip color="primary" variant="flat">
                  30 min
                </Chip>
              </div>

              <div className="flex items-center justify-between p-3 bg-seidor-50 rounded-lg">
                <div>
                  <p className="font-semibold text-seidor-400">
                    Sincronización de cuentas
                  </p>
                  <p className="text-sm text-seidor-500">
                    Proceso de sincronización
                  </p>
                </div>
                <Chip color="primary" variant="flat">
                  2 horas
                </Chip>
              </div>
            </CardBody>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-amber-50 border-l-4 border-amber-500">
            <CardBody>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="text-sm text-amber-900">
                  <p className="font-semibold mb-1">
                    Tiempo de sincronización:
                  </p>
                  <p className="leading-relaxed">
                    *El tiempo de sincronización para poder visualizar las
                    cuentas en Acronis, dependerá de la cantidad de usuarios
                    que se tenga en su tenant.
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
            <Card className="bg-gradient-to-br from-seidor-400 to-seidor-300 text-white">
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
                      Selecciona una plataforma para ver el desglose
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
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}