import { create } from "zustand";

export type MenuItem = "nuevo-tenant" | "migracion" | "backup-acronis";
export type MigrationType =
  | "google-microsoft"
  | "microsoft-google"
  | "tenant-tenant"
  | "pst-microsoft"
  | "onpremise-microsoft"
  | null;

interface NavigationState {
  currentMenu: MenuItem;
  selectedMigration: MigrationType;
  setCurrentMenu: (menu: MenuItem) => void;
  setSelectedMigration: (migration: MigrationType) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentMenu: "migracion",
  selectedMigration: "google-microsoft", // Pre-seleccionado por defecto
  setCurrentMenu: (menu) =>
    set({
      currentMenu: menu,
      selectedMigration: menu === "migracion" ? "google-microsoft" : null,
    }),
  setSelectedMigration: (migration) => set({ selectedMigration: migration }),
}));