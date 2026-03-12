import { create } from "zustand";


export type MigrationType =
  | "google-microsoft"
  | "microsoft-google"
  | "tenant-tenant"
  | "pst-microsoft"
  | "fileserver-exchange"        
  | "fileserver-sharepoint"      
  | "tenant-nuevo"
  | "configuracion-tenant";


export type MenuType =
  | "nuevo-tenant"
  | "migracion"
  | "backup-acronis"
  | "tiempo-migracion"
  | "configuracion-tenant";

export type MenuItem = MenuType;

interface NavigationState {
  currentMenu: MenuType;
  selectedMigration: MigrationType | null;
  setCurrentMenu: (menu: MenuType) => void;
  setSelectedMigration: (migration: MigrationType | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentMenu: "nuevo-tenant",
  selectedMigration: null,
  setCurrentMenu: (menu) => set({ currentMenu: menu, selectedMigration: null }),
  setSelectedMigration: (migration) => set({ selectedMigration: migration }),
}));