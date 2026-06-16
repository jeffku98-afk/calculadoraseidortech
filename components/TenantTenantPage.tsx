"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  RadioGroup,
  Radio,
  Switch,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useTenantTenantStore } from "@/lib/tenant-tenant-store";
import { calcularTiempoTenantTenant } from "@/lib/calcular-tenant-tenant";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function TenantTenantPage() {
  const state = useTenantTenantStore();
  const resultado = calcularTiempoTenantTenant(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "Tenant a Tenant",
      fecha: obtenerFechaActual(),
      nombreCliente: state.nombreCliente || undefined,
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      consideraciones: resultado.consideraciones,
      disclaimer:
        "El proceso es gradual y puede tardar días o semanas en buzones muy grandes.",
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
    });
  };

  // Handler para mostrar advertencia antes de activar reglas
  const handleToggleReglas = (value: boolean) => {
    if (value && !state.crearReglas) {
      state.setMostrarAdvertenciaReglas(true);
    } else {
      state.setCrearReglas(false);
      state.setCantidadReglas(0);
    }
  };

  const handleConfirmarReglas = () => {
    state.setCrearReglas(true);
    state.setMostrarAdvertenciaReglas(false);
  };

  const handleCancelarReglas = () => {
    state.setCrearReglas(false);
    state.setMostrarAdvertenciaReglas(false);
  };

  // Nota: el reseteo de opciones de sitios al cambiar a "nativa" 
  // ahora se maneja directamente en setHerramientaMigracion (store)

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span>Migración</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">Tenant a Tenant</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Tenant a Tenant
        </h1>
        <p className="text-lg text-seidor-500">
          Migración entre tenants de Microsoft 365
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
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
                placeholder="Ej: Empresa S.A."
                value={state.nombreCliente}
                onValueChange={state.setNombreCliente}
                className="max-w-md"
              />
            </CardBody>
          </Card>

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
                <Radio value="crear" description="2 horas de operación">
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
                placeholder="Ej: 5"
                value={state.cantidadDominios.toString()}
                onValueChange={(value) =>
                  state.setCantidadDominios(parseInt(value) || 0)
                }
                min={0}
                className="max-w-xs"
                description={
                  state.cantidadDominios > 0
                    ? `${state.cantidadDominios} ${state.cantidadDominios === 1 ? 'hora' : 'horas'} total`
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
                  Crear usuarios y asignar licencias
                </h3>
                <p className="text-sm text-seidor-500">
                  1 minuto por cada usuario
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
                className="max-w-xs"
                description={
                  state.cantidadUsuarios > 0
                    ? `${state.cantidadUsuarios * 1} minutos total`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* 4. HERRAMIENTAS - REORGANIZADO: ShareGate PRIMERO */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">
                  Herramientas
                </h2>
                <p className="text-sm opacity-90">
                  Selecciona las herramientas a utilizar
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <RadioGroup
                value={state.herramientaMigracion}
                onValueChange={(value) =>
                  state.setHerramientaMigracion(value as "sharegate" | "nativa")
                }
              >
                <Radio value="sharegate">
                  <div>
                    <p className="font-semibold text-seidor-400">ShareGate</p>
                    <p className="text-sm text-seidor-500">
                      Habilita migración de sitios de SharePoint
                    </p>
                  </div>
                </Radio>
                <Radio value="nativa">
                  <div>
                    <p className="font-semibold text-seidor-400">
                      Herramienta nativa de Microsoft
                    </p>
                    <p className="text-sm text-seidor-500">15 horas</p>
                  </div>
                </Radio>
              </RadioGroup>

              {/* Nota de advertencia para opción Nativa */}
              {state.herramientaMigracion === "nativa" && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">
                    Sujeto a limitaciones de la herramienta nativa.
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-seidor-100">
                <Switch
                  isSelected={state.usarBitTitan}
                  onValueChange={state.setUsarBitTitan}
                >
                  <div>
                    <p className="font-semibold text-indigo-700">BitTitan</p>
                    <p className="text-sm text-gray-500">
                      Habilita la calculadora de tiempo de migración BitTitan
                    </p>
                  </div>
                </Switch>
              </div>
            </CardBody>
          </Card>

          {/* 5. SITIOS DE SHAREPOINT - Controlado por ShareGate */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50 pb-3">
              <div>
                <h2 className="text-xl font-bold text-green-800">
                  Sitios de SharePoint
                </h2>
                <p className="text-sm text-green-700">
                  Migración y configuración de sitios
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {!state.usarShareGate && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Debes habilitar ShareGate para poder
                    migrar sitios de SharePoint.
                  </p>
                </div>
              )}

              {/* Opción 1: Migrar sitios de SharePoint */}
              <div className="space-y-2">
                <Switch
                  isSelected={state.sitiosSharepoint}
                  onValueChange={state.setSitiosSharepoint}
                  isDisabled={!state.usarShareGate}
                >
                  <div>
                    <p className="font-semibold text-seidor-400">
                      Migrar sitios de SharePoint
                    </p>
                    <p className="text-sm text-seidor-500">3 horas fijas</p>
                  </div>
                </Switch>
              </div>

              {/* Opción 2: Configuración de permisos - SIEMPRE VISIBLE */}
              <div className="space-y-2">
                <Switch
                  isSelected={state.configuracionPermisos}
                  onValueChange={state.setConfiguracionPermisos}
                  isDisabled={!state.usarShareGate}
                >
                  <div>
                    <p className="font-semibold text-seidor-400">
                      Configuración de permisos
                    </p>
                    <p className="text-sm text-seidor-500">
                      5 minutos por sitio
                    </p>
                  </div>
                </Switch>
                {state.configuracionPermisos && (
                  <Input
                    size="sm"
                    type="number"
                    label="Cantidad de sitios"
                    placeholder="Ej: 10"
                    value={state.cantidadSitios.toString()}
                    onValueChange={(value) =>
                      state.setCantidadSitios(parseInt(value) || 0)
                    }
                    min={0}
                    className="ml-6 max-w-xs"
                    description={
                      state.cantidadSitios > 0
                        ? `${state.cantidadSitios * 5} minutos total`
                        : ""
                    }
                  />
                )}
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
                  {/* Lista Blanca/Negra */}
                  <div className="space-y-2">
                    <Switch
                      size="sm"
                      isSelected={state.listasBlancaNegra}
                      onValueChange={state.setListasBlancaNegra}
                    >
                      <div>
                        <p className="text-sm font-medium text-seidor-400">
                          Creación de lista blanca/lista negra
                        </p>
                        <p className="text-xs text-seidor-500">
                          Cuentas, dominios e IPs - 1 minuto por dominio
                        </p>
                      </div>
                    </Switch>
                    {state.listasBlancaNegra && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de dominios"
                        placeholder="Ej: 10"
                        value={state.cantidadDominiosListas.toString()}
                        onValueChange={(value) =>
                          state.setCantidadDominiosListas(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6 max-w-xs"
                        description={
                          state.cantidadDominiosListas > 0
                            ? `${state.cantidadDominiosListas} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>

                  {/* Listas de Distribución */}
                  <div className="space-y-2">
                    <Switch
                      size="sm"
                      isSelected={state.listasDistribucion}
                      onValueChange={state.setListasDistribucion}
                    >
                      <div>
                        <p className="text-sm font-medium text-seidor-400">
                          Listas de distribución
                        </p>
                        <p className="text-xs text-seidor-500">
                          15 minutos por lista
                        </p>
                      </div>
                    </Switch>
                    {state.listasDistribucion && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de listas"
                        placeholder="Ej: 5"
                        value={state.cantidadListasDistribucion.toString()}
                        onValueChange={(value) =>
                          state.setCantidadListasDistribucion(
                            parseInt(value) || 0
                          )
                        }
                        min={0}
                        className="ml-6 max-w-xs"
                        description={
                          state.cantidadListasDistribucion > 0
                            ? `${state.cantidadListasDistribucion * 15} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>

                  {/* Bloqueo de IPs */}
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
                        label="Cantidad de IPs"
                        placeholder="Ej: 8"
                        value={state.cantidadIPs.toString()}
                        onValueChange={(value) =>
                          state.setCantidadIPs(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6 max-w-xs"
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
                  onValueChange={handleToggleReglas}
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
                      className="max-w-xs"
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
                  Configuración de políticas de retención y archivado
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
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
                          Asignar políticas de retención
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
                        className="ml-6 max-w-xs"
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
                        className="ml-6 max-w-xs"
                        description={
                          state.usuariosArchivado > 0
                            ? `${state.usuariosArchivado * 5} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>

                  <div className="space-y-2">
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
                          2 minutos por usuario
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
                          state.setUsuariosAutoExpanding(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6 max-w-xs"
                        description={
                          state.usuariosAutoExpanding > 0
                            ? `${state.usuariosAutoExpanding * 2} minutos total`
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
                        placeholder="Ej: 30"
                        value={state.usuariosForzarArchivado.toString()}
                        onValueChange={(value) =>
                          state.setUsuariosForzarArchivado(
                            parseInt(value) || 0
                          )
                        }
                        min={0}
                        className="ml-6 max-w-xs"
                        description={
                          state.usuariosForzarArchivado > 0
                            ? `${state.usuariosForzarArchivado} minutos total`
                            : ""
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* INFORME DE MIGRACIÓN - NUEVO */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">
                  Informe de Migración
                </h2>
                <p className="text-sm opacity-90">
                  1 hora por informe
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <Switch
                isSelected={state.informeMigracion}
                onValueChange={state.setInformeMigracion}
              >
                <div>
                  <p className="font-semibold text-seidor-400">
                    Generar informe de migración
                  </p>
                  <p className="text-sm text-seidor-500">
                    Informe detallado del proceso de migración
                  </p>
                </div>
              </Switch>

              {state.informeMigracion && (
                <div className="ml-6">
                  <RadioGroup
                    label="Frecuencia del informe"
                    value={state.frecuenciaInforme}
                    onValueChange={(value) =>
                      state.setFrecuenciaInforme(value as "semanal" | "mensual")
                    }
                    size="sm"
                  >
                    <Radio value="semanal">Semanal</Radio>
                    <Radio value="mensual">Mensual</Radio>
                  </RadioGroup>
                </div>
              )}
            </CardBody>
          </Card>

          {/* MONITOREO DE USUARIOS */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Monitoreo de Usuarios</h2>
                <p className="text-sm opacity-90">
                  10 minutos por cada usuario monitoreado
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Cantidad de usuarios a monitorear"
                placeholder="Ej: 50"
                value={state.monitoreoUsuarios.toString()}
                onValueChange={(value) =>
                  state.setMonitoreoUsuarios(parseInt(value) || 0)
                }
                min={0}
                className="max-w-xs"
                description={
                  state.monitoreoUsuarios > 0
                    ? `${state.monitoreoUsuarios * 10} minutos total`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* CONSIDERACIONES ADICIONALES */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Consideraciones Adicionales</h2>
                <p className="text-sm opacity-90">
                  Información complementaria (no suma horas)
                </p>
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-6">
              {/* CORREO ELECTRÓNICO */}
              <div className="space-y-4">
                <h4 className="font-bold text-seidor-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  CORREO ELECTRÓNICO
                </h4>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Tamaño total en GB de todos los buzones a migrar"
                    value={state.tamañoBuzones.toString()}
                    onValueChange={(value) =>
                      state.setTamañoBuzones(parseInt(value) || 0)
                    }
                    min="0"
                    endContent={<span className="text-gray-500 text-sm">GB</span>}
                    className="max-w-md"
                  />
                  <Input
                    type="number"
                    label="Buzones que exceden 50GB"
                    value={state.buzonesExceden50GB.toString()}
                    onValueChange={(value) =>
                      state.setBuzonesExceden50GB(parseInt(value) || 0)
                    }
                    min="0"
                    endContent={<span className="text-gray-500 text-sm">cuentas</span>}
                    className="max-w-md"
                  />
                  <Input
                    type="number"
                    label="Cantidad de listas y grupos a migrar"
                    value={state.listasGruposMigrar.toString()}
                    onValueChange={(value) =>
                      state.setListasGruposMigrar(parseInt(value) || 0)
                    }
                    min="0"
                    endContent={<span className="text-gray-500 text-sm">listas/grupos</span>}
                    className="max-w-md"
                  />
                </div>
              </div>

              {/* Nota informativa */}
              <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-blue-700">ℹ️ Nota:</span> Estas consideraciones son solo informativas y{" "}
                  <span className="font-semibold">no suman tiempo</span> al cálculo total. Aparecerán en el PDF generado como referencia.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* INCREMENTAL DE BUZONES POR SEMANA */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
              <div>
                <h2 className="text-xl font-bold">Incremental de buzones por semana</h2>
                <p className="text-sm opacity-90">
                  Información complementaria (no suma horas)
                </p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <Input
                type="number"
                label="Incremental semanal en GB"
                value={state.incrementalBuzonesSemana.toString()}
                onValueChange={(value) =>
                  state.setIncrementalBuzonesSemana(parseInt(value) || 0)
                }
                min="0"
                endContent={<span className="text-gray-500 text-sm">GB/semana</span>}
                className="max-w-md"
                description="Este dato es solo informativo y no afecta el cálculo de horas"
              />
            </CardBody>
          </Card>

          {/* CALCULADORA BITTITAN - Solo visible cuando BitTitan está seleccionado */}
          {state.usarBitTitan && (
            <Card className="border-2 border-indigo-100">
              <CardHeader className="bg-gradient-to-r from-indigo-400 to-indigo-300 text-white">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculadora BitTitan
                  </h2>
                  <p className="text-sm opacity-90">Estimación de tiempo de migración</p>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-6">
                {/* Switch para incluir en tiempo total */}
                <div className="pb-4 border-b border-gray-200">
                  <Switch
                    isSelected={state.incluirTiempoMigracion}
                    onValueChange={state.setIncluirTiempoMigracion}
                  >
                    <div>
                      <p className="font-semibold text-indigo-700">
                        Incluir tiempo de migración en el total
                      </p>
                      <p className="text-sm text-gray-600">
                        Si se activa, este tiempo se sumará al cálculo total y aparecerá en el PDF
                      </p>
                    </div>
                  </Switch>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      label="Peso total a migrar"
                      value={state.pesoTotalMigracion.toString()}
                      onValueChange={(value) =>
                        state.setPesoTotalMigracion(parseFloat(value) || 0)
                      }
                      min="0"
                      step="0.1"
                      className="flex-1"
                    />
                    <div className="w-24">
                      <select
                        value={state.unidadPesoMigracion}
                        onChange={(e) =>
                          state.setUnidadPesoMigracion(e.target.value as "GB" | "TB")
                        }
                        className="w-full h-[56px] px-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white text-sm"
                      >
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    type="number"
                    label="Cantidad de usuarios"
                    value={state.cantidadUsuariosMigracion.toString()}
                    onValueChange={(value) =>
                      state.setCantidadUsuariosMigracion(parseInt(value) || 0)
                    }
                    min="0"
                    endContent={<span className="text-gray-500 text-sm">usuarios</span>}
                    description="Número de usuarios a migrar (solo informativo)"
                    className="max-w-md"
                  />

                  {/* Resultados */}
                  {state.pesoTotalMigracion > 0 && state.cantidadUsuariosMigracion > 0 && (() => {
                    const pesoTotalEnGB = state.unidadPesoMigracion === "TB"
                      ? state.pesoTotalMigracion * 1024
                      : state.pesoTotalMigracion;
                    const velocidadTBPorMes = 3;
                    const velocidadGBPorMes = velocidadTBPorMes * 1024;
                    const velocidadGBPorDia = velocidadGBPorMes / 30;
                    const mesesEstimados = pesoTotalEnGB / velocidadGBPorMes;
                    const diasEstimados = mesesEstimados * 30;
                    const semanasEstimadas = diasEstimados / 7;

                    let tiempoFormateado = "";
                    if (mesesEstimados >= 1) {
                      const meses = Math.floor(mesesEstimados);
                      const diasRestantes = Math.round((mesesEstimados - meses) * 30);
                      tiempoFormateado = meses > 0
                        ? `${meses} ${meses === 1 ? "mes" : "meses"}${diasRestantes > 0 ? ` y ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}` : ""}`
                        : `${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}`;
                    } else if (diasEstimados >= 7) {
                      const semanas = Math.floor(semanasEstimadas);
                      const diasRestantes = Math.round(diasEstimados - semanas * 7);
                      tiempoFormateado = `${semanas} ${semanas === 1 ? "semana" : "semanas"}${diasRestantes > 0 ? ` y ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}` : ""}`;
                    } else {
                      tiempoFormateado = `${diasEstimados.toFixed(1)} ${diasEstimados < 2 ? "día" : "días"}`;
                    }

                    return (
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg space-y-3">
                        <h4 className="font-bold text-indigo-800 mb-3">Resultados del cálculo:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-gray-600">Velocidad BitTitan:</span>
                            <span className="font-semibold text-indigo-700">{velocidadTBPorMes} TB/mes</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-gray-600">Equivalente a:</span>
                            <span className="font-semibold text-indigo-700">{velocidadGBPorDia.toFixed(2)} GB/día</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-indigo-100 rounded border border-indigo-200">
                            <span className="text-gray-700">Peso total a migrar:</span>
                            <span className="font-semibold text-indigo-800">{pesoTotalEnGB.toFixed(2)} GB</span>
                          </div>
                          <Divider className="my-3" />
                          <div className="p-3 bg-indigo-600 text-white rounded-lg">
                            <div className="text-xs opacity-90 mb-1">Tiempo estimado de migración:</div>
                            <div className="text-2xl font-bold">{tiempoFormateado}</div>
                            <div className="text-xs opacity-75 mt-2 space-y-1">
                              <div>≈ {diasEstimados.toFixed(1)} días</div>
                              {diasEstimados >= 7 && <div>≈ {semanasEstimadas.toFixed(1)} semanas</div>}
                              {mesesEstimados >= 0.5 && <div>≈ {mesesEstimados.toFixed(2)} meses</div>}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-indigo-700 bg-indigo-50 p-3 rounded mt-3">
                          <strong>📌 Nota:</strong> Cálculo basado en {pesoTotalEnGB.toFixed(2)} GB a velocidad de 3 TB/mes de BitTitan ({state.cantidadUsuariosMigracion} {state.cantidadUsuariosMigracion === 1 ? "usuario" : "usuarios"}).
                          {state.incluirTiempoMigracion ? (
                            <span className="block mt-1 font-semibold text-indigo-800">
                              ✓ Este tiempo se sumará al total de horas operativas.
                            </span>
                          ) : (
                            <span className="block mt-1">
                              Este tiempo es solo referencial y no se suma al total.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Info adicional */}
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                  <p className="text-sm text-indigo-900">
                    <span className="font-semibold">ℹ️ Información:</span> Esta calculadora usa la velocidad
                    de BitTitan de <strong>3 TB por mes</strong>. El tiempo se calcula directamente sobre el peso
                    total a migrar. Los tiempos son estimados.
                  </p>
                </div>
              </CardBody>
            </Card>
          )}

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

      {/* MODAL DE ADVERTENCIA PARA REGLAS */}
      <Modal
        isOpen={state.mostrarAdvertenciaReglas}
        onClose={handleCancelarReglas}
        size="lg"
      >
        <ModalContent>
          <ModalHeader className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-amber-500"
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
            <span>Advertencia - Creación de Reglas</span>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Antes de habilitar la <strong>Creación de Reglas</strong>, tener
                en cuenta que esta opción puede tener riesgos, tales como:
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-amber-900 font-medium">
                  ⚠️ Forward de información sensible a usuario homónimo o no
                  autorizado
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Asegúrese de revisar todas las reglas antes de aplicarlas y
                verifique que los destinatarios sean correctos.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={handleCancelarReglas}
            >
              Cancelar
            </Button>
            <Button color="warning" onPress={handleConfirmarReglas}>
              Aceptar y continuar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}