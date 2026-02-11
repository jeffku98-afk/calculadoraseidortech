"use client";

import { MenuItem, useNavigationStore } from "@/lib/store";

interface MenuItemData {
  id: MenuItem;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItemData[] = [
  {
    id: "nuevo-tenant",
    label: "Nuevo Tenant",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "migracion",
    label: "Migración",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
  {
    id: "backup-acronis",
    label: "Backup Acronis",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { currentMenu, setCurrentMenu } = useNavigationStore();

  return (
    <aside className="w-72 bg-seidor-50 border-r-2 border-seidor-100">
      <div className="p-6">
        <h2 className="text-sm font-bold text-seidor-400 uppercase tracking-wider mb-4">
          Menú Principal
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentMenu(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 border-l-4
                ${
                  currentMenu === item.id
                    ? "bg-white border-seidor-300 text-seidor-300 font-semibold shadow-sm"
                    : "border-transparent text-seidor-400 hover:bg-white/50 hover:border-seidor-300/30"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}