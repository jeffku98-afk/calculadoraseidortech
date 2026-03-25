"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Switch,
  Button,
  Divider,
} from "@nextui-org/react";
import { useConfiguracionTenantStore } from "@/lib/configuracion-tenant-store";
import { calcularTiempoConfiguracionTenant } from "@/lib/calcular-configuracion-tenant";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function ConfiguracionTenantPage() {
  const state = useConfiguracionTenantStore();
  const resultado = calcularTiempoConfiguracionTenant(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "Configuración de Tenant",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      disclaimer:
        "Los tiempos son estimaciones basadas en configuraciones estándar. El tiempo real puede variar según la complejidad específica del tenant y las políticas de la organización.",
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
      nombreCliente: state.nombreCliente || undefined,
    });
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">
          Configuración de Tenant
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Configuración de Tenant
        </h1>
        <p className="text-lg text-seidor-500">
          Configuración inicial y políticas del tenant
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
          
          {/* CONFIGURACIÓN BASE */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Configuración Base</h2>
                <p className="text-sm opacity-90">
                  Tareas fundamentales del tenant
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <Switch
                isSelected={state.creacionTenant}
                onValueChange={state.setCreacionTenant}
              >
                <div>
                  <p className="font-semibold text-seidor-400">
                    Creación de Tenant
                  </p>
                  <p className="text-sm text-seidor-500">2 horas</p>
                </div>
              </Switch>

              <Switch
                isSelected={state.migracionDominio}
                onValueChange={state.setMigracionDominio}
              >
                <div>
                  <p className="font-semibold text-seidor-400">
                    Migración de Dominio
                  </p>
                  <p className="text-sm text-seidor-500">2 horas</p>
                </div>
              </Switch>

              <Divider />

              <div>
                <h3 className="text-md font-semibold text-seidor-400 mb-3">
                  Creación de Usuarios
                </h3>
                <Input
                  type="number"
                  label="Cantidad de usuarios"
                  placeholder="Ej: 100"
                  value={state.cantidadUsuarios.toString()}
                  onValueChange={(value) =>
                    state.setCantidadUsuarios(parseInt(value) || 0)
                  }
                  min={0}
                  className="max-w-xs"
                  description={
                    state.cantidadUsuarios > 0
                      ? `${state.cantidadUsuarios} minutos total (1 min c/u)`
                      : "1 minuto por usuario"
                  }
                />
              </div>
            </CardBody>
          </Card>

          {/* CONFIGURACIONES ADICIONALES */}
          <Card className="border-2 border-seidor-200">
            <CardHeader className="bg-seidor-50">
              <div>
                <h2 className="text-xl font-bold text-seidor-400">
                  Configuraciones Adicionales
                </h2>
                <p className="text-sm text-seidor-500">
                  Políticas y configuraciones opcionales
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* POLÍTICAS DE RETENCIÓN */}
              <div className="bg-seidor-50 p-4 rounded-lg space-y-3">
                <Switch
                  size="sm"
                  isSelected={state.crearPoliticasRetencion}
                  onValueChange={state.setCrearPoliticasRetencion}
                >
                  <div>
                    <p className="text-sm font-medium text-seidor-400">
                      Crear políticas de retención
                    </p>
                    <p className="text-xs text-seidor-500">30 minutos</p>
                  </div>
                </Switch>

                <div className="space-y-2">
                  <Switch
                    size="sm"
                    isSelected={state.asignacionPorUsuario}
                    onValueChange={state.setAsignacionPorUsuario}
                  >
                    <div>
                      <p className="text-sm font-medium text-seidor-400">
                        Asignación por usuario
                      </p>
                      <p className="text-xs text-seidor-500">
                        5 minutos por usuario
                      </p>
                    </div>
                  </Switch>
                  {state.asignacionPorUsuario && (
                    <Input
                      size="sm"
                      type="number"
                      label="Cantidad de usuarios"
                      placeholder="Ej: 50"
                      value={state.cantidadAsignacion.toString()}
                      onValueChange={(value) =>
                        state.setCantidadAsignacion(parseInt(value) || 0)
                      }
                      min={0}
                      className="ml-6 max-w-xs"
                      description={
                        state.cantidadAsignacion > 0
                          ? `${state.cantidadAsignacion * 5} minutos total`
                          : ""
                      }
                    />
                  )}
                </div>
              </div>

              <Divider />

              {/* ARCHIVADO */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h3 className="text-md font-semibold text-seidor-400">
                  Opciones de Archivado
                </h3>

                <div className="space-y-2">
                  <Switch
                    size="sm"
                    isSelected={state.habilitarArchivado}
                    onValueChange={state.setHabilitarArchivado}
                  >
                    <div>
                      <p className="text-sm font-medium text-seidor-400">
                        Habilitar archivado
                      </p>
                      <p className="text-xs text-seidor-500">
                        2 minutos por usuario
                      </p>
                    </div>
                  </Switch>
                  {state.habilitarArchivado && (
                    <Input
                      size="sm"
                      type="number"
                      label="Cantidad de usuarios"
                      placeholder="Ej: 50"
                      value={state.cantidadArchivado.toString()}
                      onValueChange={(value) =>
                        state.setCantidadArchivado(parseInt(value) || 0)
                      }
                      min={0}
                      className="ml-6 max-w-xs"
                      description={
                        state.cantidadArchivado > 0
                          ? `${state.cantidadArchivado * 2} minutos total`
                          : ""
                      }
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Switch
                    size="sm"
                    isSelected={state.forzarArchivado}
                    onValueChange={state.setForzarArchivado}
                  >
                    <div>
                      <p className="text-sm font-medium text-seidor-400">
                        Forzar archivado
                      </p>
                      <p className="text-xs text-seidor-500">
                        1 minuto por usuario
                      </p>
                    </div>
                  </Switch>
                  {state.forzarArchivado && (
                    <Input
                      size="sm"
                      type="number"
                      label="Cantidad de usuarios"
                      placeholder="Ej: 50"
                      value={state.cantidadForzado.toString()}
                      onValueChange={(value) =>
                        state.setCantidadForzado(parseInt(value) || 0)
                      }
                      min={0}
                      className="ml-6 max-w-xs"
                      description={
                        state.cantidadForzado > 0
                          ? `${state.cantidadForzado * 1} minutos total`
                          : ""
                      }
                    />
                  )}
                </div>
              </div>
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
                    Información importante:
                  </p>
                  <p className="leading-relaxed">
                    Los tiempos son estimaciones basadas en configuraciones
                    estándar. El tiempo real puede variar según la complejidad
                    específica del tenant y las políticas de la organización.
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
                  <div className="text-5xl font-bold mb-2">{resultado.horas}</div>
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
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}