"use client";

import { Card, CardBody } from "@nextui-org/react";
import { MigrationOption } from "@/lib/migration-options";
import { MigrationType } from "@/lib/store";

interface MigrationCardProps {
  option: MigrationOption;
  isSelected: boolean;
  onSelect: (id: MigrationType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  calendar: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
    </svg>
  ),
  swap: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  ),
  server: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
};

export function MigrationCard({ option, isSelected, onSelect }: MigrationCardProps) {
  return (
    <Card
      isPressable
      onPress={() => onSelect(option.id)}
      className={`
        transition-all duration-300 hover:-translate-y-1
        ${
          isSelected
            ? "border-2 border-seidor-300 bg-gradient-to-br from-white to-seidor-50 shadow-lg"
            : "border-2 border-transparent hover:border-seidor-100 shadow-md"
        }
      `}
    >
      <CardBody className="p-6">
        <div
          className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          bg-gradient-to-br from-seidor-300 to-seidor-200
          shadow-lg
          ${isSelected ? "shadow-seidor-300/50" : "shadow-seidor-300/30"}
        `}
        >
          <div className="text-white">{iconMap[option.icon]}</div>
        </div>
        <h3 className="text-lg font-semibold text-seidor-400 mb-2">
          {option.title}
        </h3>
        <p className="text-sm text-seidor-500 leading-relaxed">
          {option.description}
        </p>
      </CardBody>
    </Card>
  );
}