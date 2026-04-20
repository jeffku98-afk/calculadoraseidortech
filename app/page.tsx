"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MigrationPage } from "@/components/MigrationPage";
import { TenantNuevoPage } from "@/components/TenantNuevoPage";
import { GoogleMicrosoftPage } from "@/components/GoogleMicrosoftPage";
import { MicrosoftGooglePage } from "@/components/MicrosoftGooglePage";
import { BackupAcronisPage } from "@/components/BackupAcronisPage";
import { TenantTenantPage } from "@/components/TenantTenantPage";
import { PSTMicrosoftPage } from "@/components/PSTMicrosoftPage";
import { FileServerSharePointPage } from "@/components/FileServerSharePointPage";
import { TiempoMigracionPage } from "@/components/TiempoMigracionPage";
import { ConfiguracionTenantPage } from "@/components/ConfiguracionTenantPage";
import { useNavigationStore } from "@/lib/store";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { currentMenu, selectedMigration, setSelectedMigration } =
    useNavigationStore();

  // Función para volver a la selección de migraciones
  const handleBackToMigrationSelection = () => {
    setSelectedMigration(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-seidor-50 to-seidor-100/30">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {currentMenu === "nuevo-tenant" && <TenantNuevoPage />}

          {currentMenu === "migracion" && (
            <>
              {selectedMigration && (
                <div className="p-6 bg-gradient-to-r from-seidor-50 to-white">
                  <Button
                    color="primary"
                    variant="solid"
                    size="lg"
                    onPress={handleBackToMigrationSelection}
                    className="font-semibold shadow-md hover:shadow-lg transition-shadow"
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
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    }
                  >
                    Ver todas las opciones de migración
                  </Button>
                </div>
              )}

              {/* Selector de migraciones o módulo específico */}
              {!selectedMigration && <MigrationPage />}
              {selectedMigration === "google-microsoft" && (
                <GoogleMicrosoftPage />
              )}
              {selectedMigration === "microsoft-google" && (
                <MicrosoftGooglePage />
              )}
              {selectedMigration === "tenant-tenant" && (
                <TenantTenantPage />
              )}
              {selectedMigration === "pst-microsoft" && (
                <PSTMicrosoftPage />
              )}
              
              {/* File Server a Exchange - En construcción */}
              {selectedMigration === "fileserver-exchange" && (
                <div className="p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-3xl font-bold text-seidor-400">
                        File Server a Exchange
                      </h1>
                      <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full">
                        En construcción
                      </span>
                    </div>
                    <p className="text-seidor-500 text-lg">
                      Este módulo está actualmente en desarrollo.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Próximamente podrás calcular el tiempo de migración de File Server a Microsoft Exchange.
                    </p>
                  </div>
                </div>
              )}

              {/* File Server a SharePoint */}
              {selectedMigration === "fileserver-sharepoint" && (
                <FileServerSharePointPage />
              )}
            </>
          )}

          {currentMenu === "backup-acronis" && <BackupAcronisPage />}

          {currentMenu === "tiempo-migracion" && <TiempoMigracionPage />}

          {currentMenu === "configuracion-tenant" && <ConfiguracionTenantPage />}
        </main>
      </div>
    </div>
  );
}