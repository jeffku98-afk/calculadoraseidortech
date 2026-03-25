"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Switch,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useTenantNuevoStore } from "@/lib/tenant-nuevo-store";
import { calcularTiempoTenantNuevo } from "@/lib/calcular-tenant-nuevo";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function TenantNuevoPage() {
  const state = useTenantNuevoStore();
  const resultado = calcularTiempoTenantNuevo(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "Nuevo Tenant",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      disclaimer:
        "Los tiempos son estimaciones basadas en configuraciones estándar. El tiempo real puede variar según la complejidad específica del tenant.",
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
      nombreCliente: state.nombreCliente || undefined,
    });
  };

  // Handler para mostrar advertencia antes de activar reglas
  const handleToggleReglas = (value: boolean) => {
    if (value && !state.crearReglas) {
      // Mostrar modal de advertencia
      state.setMostrarAdvertenciaReglas(true);
    } else {
      // Desactivar directamente
      state.setCrearReglas(false);
      state.setCantidadReglas(0);
    }
  };

  // Handler para confirmar creación de reglas
  const handleConfirmarReglas = () => {
    state.setCrearReglas(true);
    state.setMostrarAdvertenciaReglas(false);
  };

  // Handler para cancelar creación de reglas
  const handleCancelarReglas = () => {
    state.setCrearReglas(false);
    state.setMostrarAdvertenciaReglas(false);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">Nuevo Tenant</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Nuevo Tenant
        </h1>
        <p className="text-lg text-seidor-500">
          Creación de nuevo tenant de Microsoft 365
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
          
          {/* 1. CREACIÓN DE TENANT - FIJO */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Creación de Tenant
                </h3>
                <p className="text-sm text-seidor-500">2 horas</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="bg-seidor-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  La creación del tenant base tiene una duración fija de{" "}
                  <span className="font-semibold text-seidor-400">2 horas</span>.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* 2. USUARIOS - RENOMBRADO */}
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

          {/* 3. SUBDOMINIOS - MODIFICADO: AHORA ES CANTIDAD */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Creación de subdominios
                </h3>
                <p className="text-sm text-seidor-500">
                  1 hora por cada subdominio
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Cantidad de subdominios"
                placeholder="Ej: 3"
                value={state.cantidadSubdominios.toString()}
                onValueChange={(value) =>
                  state.setCantidadSubdominios(parseInt(value) || 0)
                }
                min={0}
                className="max-w-xs"
                description={
                  state.cantidadSubdominios > 0
                    ? `${state.cantidadSubdominios} ${
                        state.cantidadSubdominios === 1 ? "hora" : "horas"
                      }`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* 4. LISTAS DE DISTRIBUCIÓN */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Listas de distribución
                </h3>
                <p className="text-sm text-seidor-500">
                  Creación de listas de distribución
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <Switch
                isSelected={state.crearListas}
                onValueChange={state.setCrearListas}
              >
                <div>
                  <p className="font-semibold text-seidor-400">
                    Crear listas de distribución
                  </p>
                  <p className="text-sm text-seidor-500">
                    15 minutos por lista
                  </p>
                </div>
              </Switch>

              {state.crearListas && (
                <div className="ml-6 space-y-4">
                  <Input
                    type="number"
                    label="Cantidad de listas"
                    placeholder="Ej: 5"
                    value={state.cantidadListas.toString()}
                    onValueChange={(value) =>
                      state.setCantidadListas(parseInt(value) || 0)
                    }
                    min={0}
                    className="max-w-xs"
                    description={
                      state.cantidadListas > 0
                        ? `${state.cantidadListas * 15} minutos total`
                        : ""
                    }
                  />
                </div>
              )}
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
                  {/* Lista Blanca/Negra - MODIFICADO */}
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
                </div>
              </div>

              <Divider />

              {/* CREACIÓN DE REGLAS - CON ADVERTENCIA */}
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
                    específica del tenant.
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