import { MigrationType } from "./store";

export interface MigrationOption {
  id: MigrationType;
  title: string;
  description: string;
  icon: string;
  underConstruction?: boolean;
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
    id: "fileserver-exchange",
    title: "File Server a Exchange",
    description:
      "Migración de File Server a Microsoft Exchange (anteriormente On Premise a Microsoft)",
    icon: "server",
    underConstruction: true, // Módulo en construcción
  },
  {
    id: "fileserver-sharepoint",
    title: "File Server a SharePoint",
    description:
      "Migración de File Server a SharePoint Online",
    icon: "folder",
    underConstruction: true, // Módulo en construcción
  },
];