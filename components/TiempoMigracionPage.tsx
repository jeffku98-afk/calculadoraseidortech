"use client";

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

export function TiempoMigracionPage() {
  const handleOpenCalculator = () => {
    window.open(
      "https://massive.io/es/recursos/calculadora-de-transferencia-de-archivos/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">
          Tiempo Aproximado de Migración
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Tiempo Aproximado de Migración
        </h1>
        <p className="text-lg text-seidor-500">
          Calcule el tiempo estimado de transferencia de datos
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Card de Consideraciones */}
        <Card className="border-2 border-seidor-200">
          <CardHeader className="bg-gradient-to-r from-seidor-400 to-seidor-300 text-white">
            <div>
              <h2 className="text-xl font-bold">Consideraciones Importantes</h2>
              <p className="text-sm opacity-90">
                Factores que afectan el tiempo de migración
              </p>
            </div>
          </CardHeader>
          <CardBody className="p-6 space-y-4">
            {/* Consideración Principal */}
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
                  <p className="font-semibold text-blue-900 mb-2 text-lg">
                    Velocidad de Internet del Cliente
                  </p>
                  <p className="text-blue-800 leading-relaxed">
                    El tiempo aproximado de migración dependerá{" "}
                    <strong>única y exclusivamente</strong> de la velocidad de
                    internet del cliente.
                  </p>
                </div>
              </div>
            </div>

            {/* Factores Adicionales */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-seidor-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-seidor-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-seidor-400 mb-1">
                      Velocidad de Subida
                    </h3>
                    <p className="text-sm text-seidor-500">
                      Mayor velocidad de upload = transferencia más rápida
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-seidor-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-seidor-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-seidor-400 mb-1">
                      Volumen de Datos
                    </h3>
                    <p className="text-sm text-seidor-500">
                      Cantidad total de información a transferir
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-seidor-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-seidor-400 flex-shrink-0 mt-0.5"
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
                  <div>
                    <h3 className="font-semibold text-seidor-400 mb-1">
                      Horario de Migración
                    </h3>
                    <p className="text-sm text-seidor-500">
                      Fuera de horario laboral para mejor rendimiento
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-seidor-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-seidor-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-seidor-400 mb-1">
                      Estabilidad de Conexión
                    </h3>
                    <p className="text-sm text-seidor-500">
                      Conexión estable evita interrupciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Card de Calculadora */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardBody className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-seidor-400 mb-2">
                Calculadora de Transferencia
              </h3>
              <p className="text-seidor-500 max-w-2xl mx-auto">
                Utiliza la calculadora externa para estimar el tiempo
                exacto de transferencia según sus parámetros específicos
              </p>
            </div>

            <Button
              color="success"
              size="lg"
              className="font-semibold"
              onPress={handleOpenCalculator}
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
              Abrir Calculadora de Transferencia
            </Button>

            <p className="text-xs text-seidor-500 mt-3">
              Se abrirá en una nueva pestaña
            </p>
          </CardBody>
        </Card>

        {/* Card Informativa */}
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-1">Nota Importante:</p>
                <p className="leading-relaxed">
                  Los tiempos estimados son aproximados y pueden variar según
                  las condiciones de red en tiempo real. Se recomienda realizar
                  pruebas previas con muestras pequeñas de datos para validar
                  los tiempos estimados.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}