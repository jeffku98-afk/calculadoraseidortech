"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-seidor-400 to-seidor-300 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
              <div className="relative h-8 w-24">
                <Image
                  src="/logo.png"
                  alt="SEIDOR Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Calculadora de Horas
            </h1>
          </div>

          {/* Usuario y logout */}
          {session?.user && (
            <div className="flex items-center gap-4">
              <div className="text-right text-white">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs opacity-90">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}