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
                <div className="p-4 bg-white border-b border-gray-200">
                  <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    onPress={handleBackToMigrationSelection}
                    startContent={
                      <svg
                        className="w-4 h-4"
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
              {selectedMigration === "onpremise-microsoft" && (
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-seidor-400">
                    On Premise a Microsoft
                  </h1>
                  <p className="text-seidor-500 mt-4">
                    Módulo en construcción...
                  </p>
                </div>
              )}
            </>
          )}

          {currentMenu === "backup-acronis" && <BackupAcronisPage />}
        </main>
      </div>
    </div>
  );
}