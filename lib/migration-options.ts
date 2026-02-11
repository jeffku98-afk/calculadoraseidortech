import { MigrationType } from "./store";

export interface MigrationOption {
  id: MigrationType;
  title: string;
  description: string;
  icon: string;
}

export const migrationOptions: MigrationOption[] = [
  {
    id: "google-microsoft",
    title: "Google a Microsoft",
    description:
      "Migración de Google Workspace (Gmail, Drive, Calendar) a Microsoft 365",
    icon: "calendar",
  },
  {
    id: "microsoft-google",
    title: "Microsoft a Google",
    description:
      "Migración de Microsoft 365 a Google Workspace incluyendo todos los servicios",
    icon: "swap",
  },
  {
    id: "tenant-tenant",
    title: "Tenant a Tenant",
    description:
      "Migración entre diferentes tenants de Microsoft 365 (fusiones, adquisiciones)",
    icon: "building",
  },
  {
    id: "pst-microsoft",
    title: "PST a Microsoft",
    description:
      "Importación de archivos PST (Outlook Data File) a buzones de Microsoft 365",
    icon: "document",
  },
  {
    id: "onpremise-microsoft",
    title: "On Premise a Microsoft",
    description:
      "Migración de Exchange Server on-premise a Microsoft 365 (Hybrid o Cutover)",
    icon: "server",
  },
];