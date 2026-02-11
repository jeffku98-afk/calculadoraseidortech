"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigationStore } from "@/lib/store";

const migrationOptions = [
  {
    id: "google-microsoft" as const,
    title: "Google a Microsoft",
    description: "Migración de Google Workspace a Microsoft 365",
    icon: "🔄",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "microsoft-google" as const,
    title: "Microsoft a Google",
    description: "Migración de Microsoft 365 a Google Workspace",
    icon: "🔄",
    color: "from-green-500 to-green-600",
  },
  {
    id: "tenant-tenant" as const,
    title: "Tenant a Tenant",
    description: "Migración entre tenants de Microsoft 365",
    icon: "🏢",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "pst-microsoft" as const,
    title: "PST a Microsoft",
    description: "Importación de archivos PST a Microsoft 365",
    icon: "📁",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "onpremise-microsoft" as const,
    title: "On Premise a Microsoft",
    description: "Migración de Exchange Server a Microsoft 365",
    icon: "🖥️",
    color: "from-red-500 to-red-600",
  },
];

export function MigrationPage() {
  const { selectedMigration, setSelectedMigration } = useNavigationStore();

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-seidor-500 mb-6">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-seidor-400 font-semibold">Migración</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-seidor-400 mb-2">
          Tipos de Migración
        </h1>
        <p className="text-lg text-seidor-500">
          Selecciona el tipo de migración que deseas calcular
        </p>
      </div>

      {/* Migration Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {migrationOptions.map((option) => (
          <Card
            key={option.id}
            isPressable
            onPress={() => setSelectedMigration(option.id)}
            className={`transition-all duration-200 hover:scale-105 cursor-pointer ${
              selectedMigration === option.id
                ? "ring-4 ring-seidor-400 shadow-xl"
                : "hover:shadow-lg"
            }`}
          >
            <CardHeader
              className={`bg-gradient-to-r ${option.color} text-white p-6`}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{option.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{option.title}</h3>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <p className="text-seidor-500">{option.description}</p>
              {selectedMigration === option.id && (
                <div className="mt-4 flex items-center gap-2 text-seidor-400 font-semibold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Seleccionado</span>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
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
              Selecciona una opción para comenzar
            </p>
            <p className="text-sm text-blue-800">
              Haz clic en cualquier tarjeta para calcular las horas de
              operación de ese tipo de migración. Por defecto, "Google a
              Microsoft" está seleccionado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}