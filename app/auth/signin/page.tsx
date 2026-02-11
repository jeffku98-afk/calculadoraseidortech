"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-seidor-400 to-seidor-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-16 w-40">
            <Image
              src="/logo.png"
              alt="SEIDOR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-seidor-400 mb-2">
            Calculadora de Horas
          </h1>
          <p className="text-gray-600">
            Inicia sesión con tu cuenta corporativa
          </p>
        </div>

        {/* Botón de Microsoft */}
        <button
          onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
          className="w-full bg-white border-2 border-gray-300 hover:border-seidor-400 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Iniciar sesión con Microsoft
        </button>

        {/* Texto informativo */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Solo usuarios autorizados de SEIDOR pueden acceder a esta aplicación.
        </p>
      </div>
    </div>
  );
}