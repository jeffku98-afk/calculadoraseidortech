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
import { useTenantNuevoStore } from "@/lib/tenant-nuevo-store";
import { calcularTiempoTenantNuevo } from "@/lib/calcular-tiempo";
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
        <span className="text-seidor-400 font-semibold">Nuevo Tenant</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Nuevo Tenant
        </h1>
        <p className="text-lg text-seidor-500">
          Configura los parámetros para calcular las horas de operación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. TAREA */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Tipo de Tarea
                </h3>
                <p className="text-sm text-seidor-500">
                  Selecciona si es un tenant nuevo o existente
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <RadioGroup
                value={state.tarea}
                onValueChange={(value) =>
                  state.setTarea(value as "creacion" | "existente")
                }
              >
                <Radio value="creacion" description="3 horas de operación">
                  Creación de tenant
                </Radio>
                <Radio value="existente" description="1 hora de operación">
                  Tenant existente
                </Radio>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* 2. CANTIDAD DE USUARIOS */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Cantidad de Usuarios
                </h3>
                <p className="text-sm text-seidor-500">
                  Cada 10 usuarios = 1 hora
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                label="Número de usuarios"
                placeholder="Ej: 25"
                value={state.cantidadUsuarios.toString()}
                onValueChange={(value) =>
                  state.setCantidadUsuarios(parseInt(value) || 0)
                }
                min={0}
                description={
                  state.cantidadUsuarios > 0
                    ? `${Math.ceil(state.cantidadUsuarios / 10)} ${
                        Math.ceil(state.cantidadUsuarios / 10) === 1
                          ? "hora"
                          : "horas"
                      } de configuración`
                    : ""
                }
              />
            </CardBody>
          </Card>

          {/* 3. SUBDOMINIOS */}
          <Card>
            <CardBody>
              <Switch
                isSelected={state.crearSubdominios}
                onValueChange={state.setCrearSubdominios}
              >
                <div>
                  <p className="font-semibold text-seidor-400">
                    Creación de subdominios
                  </p>
                  <p className="text-sm text-seidor-500">1 hora adicional</p>
                </div>
              </Switch>
            </CardBody>
          </Card>

          {/* 4. LISTAS DE DISTRIBUCIÓN */}
          <Card>
            <CardHeader className="pb-3">
              <div className="w-full">
                <Switch
                  isSelected={state.crearListas}
                  onValueChange={state.setCrearListas}
                >
                  <div>
                    <p className="font-semibold text-seidor-400">
                      Creación de listas de distribución
                    </p>
                    <p className="text-sm text-seidor-500">
                      Configura listas y seguridad
                    </p>
                  </div>
                </Switch>
              </div>
            </CardHeader>
            {state.crearListas && (
              <CardBody className="pt-0 space-y-4">
                <Divider />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Cantidad de listas"
                    placeholder="Ej: 5"
                    value={state.cantidadListas.toString()}
                    onValueChange={(value) =>
                      state.setCantidadListas(parseInt(value) || 0)
                    }
                    min={0}
                  />
                  <Input
                    type="number"
                    label="Usuarios por lista"
                    placeholder="Ej: 10"
                    value={state.usuariosPorLista.toString()}
                    onValueChange={(value) =>
                      state.setUsuariosPorLista(parseInt(value) || 0)
                    }
                    min={0}
                  />
                </div>

                <div className="bg-seidor-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm font-semibold text-seidor-400">
                    Configuraciones de seguridad
                  </p>

                  {/* Lista Blanca/Negra */}
                  <div className="space-y-2">
                    <Switch
                      size="sm"
                      isSelected={state.listaBlancaNegra}
                      onValueChange={state.setListaBlancaNegra}
                    >
                      <div>
                        <p className="text-sm font-medium text-seidor-400">
                          Lista Blanca / Lista Negra
                        </p>
                        <p className="text-xs text-seidor-500">
                          5 minutos por dominio
                        </p>
                      </div>
                    </Switch>
                    {state.listaBlancaNegra && (
                      <Input
                        size="sm"
                        type="number"
                        label="Cantidad de dominios"
                        placeholder="Ej: 20"
                        value={state.cantidadDominios.toString()}
                        onValueChange={(value) =>
                          state.setCantidadDominios(parseInt(value) || 0)
                        }
                        min={0}
                        className="ml-6"
                        description={
                          state.cantidadDominios > 0
                            ? `${state.cantidadDominios * 5} minutos total`
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
              </CardBody>
            )}
          </Card>

          {/* 5. REGLAS */}
          <Card>
            <CardHeader className="pb-3">
              <div className="w-full">
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
              </div>
            </CardHeader>
            {state.crearReglas && (
              <CardBody className="pt-0">
                <Divider className="mb-4" />
                <Input
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
              </CardBody>
            )}
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