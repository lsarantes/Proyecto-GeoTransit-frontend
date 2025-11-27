import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner"; // Para notificaciones
import { useAuth } from "@/context/AuthContext"; // Para el socket
import { CrudService } from "@/service/crud.service";

// T = Tipo de dato (ej. User, Ruta)
export function useCrud<T>(endpoint: string, socketEventName?: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { socket } = useAuth(); // Traemos el socket del contexto

  // 1. Función para cargar datos
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CrudService.getAll<T>(endpoint);
      setItems(data || []); // Aseguramos array aunque venga null
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err.message || "Error al cargar datos");
      toast.error("Error de conexión al cargar la tabla.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // 2. Carga inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 3. TIEMPO REAL: Escuchar cambios del Backend
  // Si pasas 'socketEventName' (ej: 'usersUpdated'), la tabla se recarga sola.
  useEffect(() => {
    if (socket && socketEventName) {
      socket.on(socketEventName, () => {
        console.log(`🔄 Socket: Recargando datos de ${endpoint}...`);
        fetchData(); // <-- MAGIA: Recarga silenciosa
      });

      return () => {
        socket.off(socketEventName);
      };
    }
  }, [socket, socketEventName, fetchData]);

  // 4. Funciones CRUD para exponer al componente
  const createItem = async (data: any) => {
    try {
      await CrudService.create(endpoint, data);
      toast.success("Registro creado con éxito");
      fetchData(); // Recarga manual (por si el socket falla o no hay)
      return true;
    } catch (err: any) {
      toast.error(err.message || "Error al crear");
      return false;
    }
  };

  const updateItem = async (id: string | number, data: any) => {
    try {
      await CrudService.update(endpoint, id, data);
      toast.success("Registro actualizado");
      fetchData();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar");
      return false;
    }
  };

  const deleteItem = async (id: string | number) => {
    try {
      await CrudService.delete(endpoint, id);
      toast.success("Registro eliminado");
      fetchData();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar");
      return false;
    }
  };

  return {
    items,
    loading,
    error,
    refresh: fetchData, // Por si quieres un botón de "recargar"
    createItem,
    updateItem,
    deleteItem
  };
}