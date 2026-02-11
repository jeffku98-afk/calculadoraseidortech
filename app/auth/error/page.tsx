"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Icono de error */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Acceso Denegado
        </h1>

        {/* Mensaje */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            {error === "AccessDenied" ? (
              <>
                Tu cuenta no tiene permisos para acceder a esta aplicación.
                <br />
                <br />
                Por favor, contacta al administrador del sistema si crees que
                esto es un error.
              </>
            ) : (
              <>
                Ocurrió un error durante el inicio de sesión.
                <br />
                <br />
                Error: {error || "Desconocido"}
              </>
            )}
          </p>
        </div>

        {/* Botón */}
        <Link
          href="/auth/signin"
          className="block w-full bg-seidor-400 hover:bg-seidor-300 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}