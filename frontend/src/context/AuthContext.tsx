"use client";

import { AuthService } from "@/service/auth.services";
import { User } from "@/types/interface/interface-auth";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  socket: Socket | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

// --------------------------------------------------
// 1. PERSISTENCIA DE SESIÓN (LOAD/RELOAD)
// --------------------------------------------------

  useEffect(() => {
    const initSession = () => {
      try {
        if (AuthService.isAuthenticated()) {
          const storedUser = AuthService.getUser();
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error("Error al restaurar sesión:", error);
        AuthService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

// --------------------------------------------------
// 2. GESTIÓN DE SOCKETS Y TIEMPO REAL
// --------------------------------------------------

  // Función para actualizar el estado del usuario tras un evento Push
  const updateUserStateFromPush = useCallback(() => {
      // 💡 Esta es la lógica clave: Volvemos a leer LocalStorage
      // El backend debe actualizar el LocalStorage antes de enviar el push, 
      // o debemos hacer un fetch al backend para obtener los nuevos datos.
      
      const updatedUser = AuthService.getUser(); 

      if (updatedUser) {
          setUser(updatedUser);
          console.log("✅ Estado de usuario actualizado por evento Push.");
      } else {
          // Si por alguna razón el token o el usuario desapareció, hacemos logout.
          logout(); 
      }
  }, [setUser]);


  useEffect(() => {
    let newSocket: Socket | null = null;

    if (user) {
      const userIdNum = user.id_usuario;

      if (typeof userIdNum !== 'number' || userIdNum < 1) {
        console.error("❌ ERROR CRÍTICO: El usuario logueado no tiene ID numérico válido. Socket cancelado.", user);
        return;
      }

      const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

      // CONECTAMOS
      newSocket = io(socketUrl, {
        query: {
          userId: userIdNum,
        },
        transports: ['websocket'],
      });

      setSocket(newSocket);

      // LISTENER DE EVENTOS PUSH DEL BACKEND (UNIFICADO)
      newSocket.on("connect", () => {
        // console.log("✅ WebSocket Conectado en Frontend"); // Se quita el log de conexión
      });

      // ⭐ LÓGICA CLAVE: ACTUALIZAR ESTADO AL RECIBIR CAMBIO
      newSocket.on('profileUpdated', (data: { message: string }) => {
        console.log("🔥 EVENTO RECIBIDO EN FRONTEND:", data); // Mantenemos el log de debug
        toast.info("Actualización Recibida", {
          description: data.message,
          duration: 5000,
        });
        
        // 💡 LLAMADA A LA FUNCIÓN DE ACTUALIZACIÓN DE ESTADO
        updateUserStateFromPush();
      });
      
      // QUITAMOS EL LISTENER DEBUG UNIVERSAL
      /*
      newSocket.on('*', (eventName: string, data: any) => {
        console.warn(`[DEBUG SOCKET] Evento entrante: ${eventName}`, data);
      });
      */
    }

    // LIMPIEZA
    return () => {
      if (newSocket) {
        newSocket.off('profileUpdated'); // Limpiamos el listener
        newSocket.disconnect();
        setSocket(null);
      }
    };
  }, [user, updateUserStateFromPush]);

// --------------------------------------------------
// 3. FUNCIONES DE AUTENTICACIÓN
// --------------------------------------------------

  const login = async (identifier: string, password: string) => {
    try {
      const data = await AuthService.login(identifier, password);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        socket
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}