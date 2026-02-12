"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";
import { usePSTMicrosoftStore } from "@/lib/pst-microsoft-store";
import { calcularTiempoPSTMicrosoft } from "@/lib/calcular-pst-microsoft";
import { generarPDF, obtenerFechaActual } from "@/lib/generar-pdf";
import { useSession } from "next-auth/react";

export function PSTMicrosoftPage() {
  const state = usePSTMicrosoftStore();
  const resultado = calcularTiempoPSTMicrosoft(state);
  const { data: session } = useSession();

  const handleDescargarPDF = async () => {
    await generarPDF({
      titulo: "PST a Microsoft",
      fecha: obtenerFechaActual(),
      horas: resultado.horas,
      minutos: resultado.minutos,
      desglose: resultado.desglose,
      disclaimer: "Las horas operacionales corren desde la recepción del PST.",
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
          PST a Microsoft
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          PST a Microsoft
        </h1>
        <p className="text-lg text-seidor-500">
          Migración de archivos PST a Microsoft 365
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

          {/* 2. USUARIOS */}
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

          {/* 3. TAMAÑO MÁXIMO */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold text-seidor-400">
                  Tamaño Máximo
                </h3>
                <p className="text-sm text-seidor-500">
                  Tamaño de referencia para el tiempo de migración
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* Input y botón en la misma fila */}
              <div className="flex gap-3 items-end">
                <Input
                  type="number"
                  label="Tamaño máximo"
                  placeholder="Ej: 100"
                  value={state.tamanoMaximoGB.toString()}
                  onValueChange={(value) =>
                    state.setTamanoMaximoGB(parseFloat(value) || 0)
                  }
                  min={0}
                  step={0.1}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">GB</span>
                    </div>
                  }
                  className="flex-1"
                />
                <Button
                  color="primary"
                  variant="flat"
                  as="a"
                  href="https://massive.io/es/recursos/calculadora-de-transferencia-de-archivos/"
                  target="_blank"
                  rel="noopener noreferrer"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  }
                >
                  Ver tiempo aproximado de Migración
                </Button>
              </div>

              {/* Consideración */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-blue-700">
                    Consideración:
                  </span>{" "}
                  Se toma este tamaño como referencia del tiempo aproximado que
                  tomará la migración.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-50 border-l-4 border-yellow-500">
            <CardBody>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1"
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
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1 text-yellow-800">
                    Importante:
                  </p>
                  <p className="leading-relaxed">
                    Las horas operacionales corren desde la recepción del PST.
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
                <div className="bg-white/10 p-3 rounded-lg text-sm mb-4">
                  <p className="font-semibold mb-1">Tamaño de referencia:</p>
                  <p className="text-2xl font-bold">
                    {state.tamanoMaximoGB > 0
                      ? `${state.tamanoMaximoGB} GB`
                      : "No especificado"}
                  </p>
                </div>
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