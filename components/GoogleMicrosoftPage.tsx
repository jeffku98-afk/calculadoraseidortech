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
} from "@nextui-org/react";
import { useGoogleMicrosoftStore } from "@/lib/google-microsoft-store";
import { calcularTiempoGoogleMicrosoft } from "@/lib/calcular-google-microsoft";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function GoogleMicrosoftPage() {
  const state = useGoogleMicrosoftStore();
  const resultado = calcularTiempoGoogleMicrosoft(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "Google a Microsoft",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      disclaimer: "El proceso es gradual y puede tardar días o semanas en buzones muy grandes. Para buzones pequeños (5 - 20 GB): 1 a 2 días, para buzones medianos (20 - 50 GB): 2 a 4 días, y para buzones grandes (100 GB a más): 5 a 10 días.",
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
          Google a Microsoft
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Google a Microsoft
        </h1>
        <p className="text-lg text-seidor-500">
          Migración de Google Workspace a Microsoft 365
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. PANEL */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">Panel</h3>
                <p className="text-sm text-seidor-500">
                  Selecciona el tipo de panel
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <RadioGroup
                value={state.panel}
                onValueChange={(value) =>
                  state.setPanel(value as "crear" | "existente")
                }
              >
                <Radio value="crear" description="3 horas de operación">
                  Crear
                </Radio>
                <Radio value="existente" description="1 hora de operación">
                  Existente
                </Radio>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* 2. DOMINIOS */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Dominios
                </h3>
                <p className="text-sm text-seidor-500">
                  1 hora por cada dominio
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Cantidad de dominios"
                placeholder="Ej: 2"
                value={state.cantidadDominios.toString()}
                onValueChange={(value) =>
                  state.setCantidadDominios(parseInt(value) || 0)
                }
                min={0}
                description={
                  state.cantidadDominios > 0
                    ? `${state.cantidadDominios} ${
                        state.cantidadDominios === 1 ? "hora" : "horas"
                      }`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* 3. USUARIOS */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Usuarios
                </h3>
                <p className="text-sm text-seidor-500">
                  5 minutos por cada usuario
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Cantidad de usuarios"
                placeholder="Ej: 50"
                value={state.cantidadUsuarios.toString()}
                onValueChange={(value) =>
                  state.setCantidadUsuarios(parseInt(value) || 0)
                }
                min={0}
                description={
                  state.cantidadUsuarios > 0
                    ? `${state.cantidadUsuarios * 5} minutos total`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* 4. CONFIGURACIÓN DE TENANT */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Configuración de Tenant
                </h3>
                <p className="text-sm text-seidor-500">
                  Selecciona el tipo de configuración
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <RadioGroup
                value={state.configuracionTenant}
                onValueChange={(value) =>
                  state.setConfiguracionTenant(value as "google" | "microsoft")
                }
              >
                <Radio value="google" description="3 horas de operación">
                  Google
                </Radio>
                <Radio value="microsoft" description="10 horas de operación">
                  Microsoft
                </Radio>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* 5. CONFIGURACIÓN DE BITTITAN */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Configuración de BitTitan
                </h3>
                <p className="text-sm text-seidor-500">
                  Selecciona los servicios a migrar
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <Switch
                isSelected={state.mailbox}
                onValueChange={state.setMailbox}
              >
                <div>
                  <p className="font-semibold text-seidor-400">Mailbox</p>
                  <p className="text-sm text-seidor-500">5 horas</p>
                </div>
              </Switch>
              <Switch
                isSelected={state.onedrive}
                onValueChange={state.setOnedrive}
              >
                <div>
                  <p className="font-semibold text-seidor-400">OneDrive</p>
                  <p className="text-sm text-seidor-500">5 horas</p>
                </div>
              </Switch>
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
                  Seguridad y reglas personalizadas
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* SEGURIDAD */}
              <div className="space-y-3">
                <h3 className="text-md font-semibold text-seidor-400">
                  Seguridad
                </h3>
                <div className="bg-seidor-50 p-4 rounded-lg space-y-3">
                  <Switch
                    size="sm"
                    isSelected={state.listaBlancaNegra}
                    onValueChange={state.setListaBlancaNegra}
                  >
                    <div>
                      <p className="text-sm font-medium text-seidor-400">
                        Creación de Lista Blanca y/o Lista Negra
                      </p>
                      <p className="text-xs text-seidor-500">2 horas</p>
                    </div>
                  </Switch>

                  <div className="space-y-2">
                    <Switch
                      size="sm"
                      isSelected={state.bloqueoIPs}
                      onValueChange={state.setBloqueoIPs}
                    >
                      <div>
                        <p className="text-sm font-medium text-seidor-400">
                          Bloqueo de IPs
                        </p>
                        <p className="text-xs text-seidor-500">
                          5 minutos por IP
                        </p>
                      </div>
                    </Switch>
                    {state.bloqueoIPs && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de IPs a bloquear"
                        placeholder="Ej: 10"
                        value={state.cantidadIPs.toString()}
                        onValueChange={(value) =>
                          state.setCantidadIPs(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6"
                        description={
                          state.cantidadIPs > 0
                            ? `${state.cantidadIPs * 5} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <Divider />

              {/* CREACIÓN DE REGLAS */}
              <div>
                <Switch
                  isSelected={state.crearReglas}
                  onValueChange={state.setCrearReglas}
                >
                  <div>
                    <p className="font-semibold text-seidor-400">
                      Creación de reglas
                    </p>
                    <p className="text-sm text-seidor-500">
                      15 minutos por regla
                    </p>
                  </div>
                </Switch>
                {state.crearReglas && (
                  <div className="mt-3 ml-6">
                    <Input
                      size="sm"
                      type="number"
                      label="Cantidad de reglas"
                      placeholder="Ej: 8"
                      value={state.cantidadReglas.toString()}
                      onValueChange={(value) =>
                        state.setCantidadReglas(parseInt(value) || 0)
                      }
                      min={0}
                      description={
                        state.cantidadReglas > 0
                          ? `${state.cantidadReglas * 15} minutos total`
                          : ""
                      }
                    />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* ALMACENAMIENTO */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Almacenamiento</h2>
                <p className="text-sm opacity-90">
                  Configuración de licencias y políticas
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* LICENCIA TENANT */}
              <div>
                <h3 className="text-md font-semibold text-seidor-400 mb-3">
                  Licencia del Tenant
                </h3>
                <RadioGroup
                  value={state.licenciaTenant}
                  onValueChange={(value) =>
                    state.setLicenciaTenant(value as "estandar" | "premium")
                  }
                >
                  <Radio value="estandar">Estándar</Radio>
                  <Radio value="premium">
                    <div className="flex items-center gap-2">
                      <span>Premium</span>
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        Premium
                      </span>
                    </div>
                  </Radio>
                </RadioGroup>
              </div>

              <Divider />

              {/* OPCIONES ESTÁNDAR */}
              <div className="space-y-3">
                <h3 className="text-md font-semibold text-seidor-400">
                  Opciones de Retención
                </h3>
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
                      <p className="text-xs text-seidor-500">1 hora</p>
                    </div>
                  </Switch>

                  <div className="space-y-2">
                    <Switch
                      size="sm"
                      isSelected={state.politicasRetencion}
                      onValueChange={state.setPoliticasRetencion}
                    >
                      <div>
                        <p className="text-sm font-medium text-seidor-400">
                          Políticas de retención
                        </p>
                        <p className="text-xs text-seidor-500">
                          5 minutos por usuario
                        </p>
                      </div>
                    </Switch>
                    {state.politicasRetencion && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de usuarios"
                        placeholder="Ej: 30"
                        value={state.usuariosPoliticasRetencion.toString()}
                        onValueChange={(value) =>
                          state.setUsuariosPoliticasRetencion(
                            parseInt(value) || 0
                          )
                        }
                        min={0}
                        className="ml-6"
                        description={
                          state.usuariosPoliticasRetencion > 0
                            ? `${state.usuariosPoliticasRetencion * 5} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>

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
                          5 minutos por usuario
                        </p>
                      </div>
                    </Switch>
                    {state.habilitarArchivado && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de usuarios"
                        placeholder="Ej: 30"
                        value={state.usuariosArchivado.toString()}
                        onValueChange={(value) =>
                          state.setUsuariosArchivado(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6"
                        description={
                          state.usuariosArchivado > 0
                            ? `${state.usuariosArchivado * 5} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* OPCIONES PREMIUM */}
              {state.licenciaTenant === "premium" && (
                <>
                  <Divider />
                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-semibold text-seidor-400">
                        Opciones Premium
                      </h3>
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        Premium
                      </span>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                      <Switch
                        size="sm"
                        isSelected={state.autoExpandingArchivado}
                        onValueChange={state.setAutoExpandingArchivado}
                      >
                        <div>
                          <p className="text-sm font-medium text-seidor-400">
                            Auto-expanding archivado
                          </p>
                          <p className="text-xs text-seidor-500">
                            5 minutos por usuario
                          </p>
                        </div>
                      </Switch>
                      {state.autoExpandingArchivado && (
                        <Input
                          size="sm"
                          type="number"
                          label="Cantidad de usuarios"
                          placeholder="Ej: 30"
                          value={state.usuariosAutoExpanding.toString()}
                          onValueChange={(value) =>
                            state.setUsuariosAutoExpanding(
                              parseInt(value) || 0
                            )
                          }
                          min={0}
                          className="ml-6"
                          description={
                            state.usuariosAutoExpanding > 0
                              ? `${state.usuariosAutoExpanding * 5} minutos total`
                              : ""
                          }
                        />
                      )}
                    </div>
                  </div>
                </>
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
                    El proceso es gradual y puede tardar días o semanas en
                    buzones muy grandes. Para buzones pequeños (5 - 20 GB): 1 a
                    2 días, para buzones medianos (20 - 50 GB): 2 a 4 días, y
                    para buzones grandes (100 GB a más): 5 a 10 días.
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
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}