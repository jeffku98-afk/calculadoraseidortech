import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

// Lista de usuarios permitidos desde variable de entorno
const allowedUsers = process.env.ALLOWED_USERS?.split(",").map(email => email.trim().toLowerCase()) || [];

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Verificar si el usuario está en la lista de permitidos
      const userEmail = user.email?.toLowerCase() || "";
      
      if (allowedUsers.length === 0) {
        // Si no hay lista configurada, permitir a todos los del tenant
        console.log(`⚠️ ALLOWED_USERS no configurado. Permitiendo acceso a: ${userEmail}`);
        return true;
      }
      
      // Verificar si el email está en la lista de permitidos
      const isAllowed = allowedUsers.includes(userEmail);
      
      if (!isAllowed) {
        console.log(`❌ Acceso denegado para: ${userEmail}`);
        console.log(`📋 Usuarios permitidos: ${allowedUsers.join(", ")}`);
        return false;
      }
      
      console.log(`✅ Acceso permitido para: ${userEmail}`);
      return true;
    },
    async session({ session, token }) {
      // Agregar información adicional a la sesión
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persistir información en el token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },
  debug: process.env.NODE_ENV === "development",
};