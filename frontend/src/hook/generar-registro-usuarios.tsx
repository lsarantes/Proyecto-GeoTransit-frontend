import { useState } from "react";

export interface Usuario {
  id_usuario: number;
  username: string;
  email: string;
  password?: string; 
  f_ultimo_acceso: string; 
  esta_activo: boolean;
  foto?: string;
}

export function useUsuarios() {
  const nombres = ["admin", "operador", "supervisor", "gerente", "soporte", "chofer_01", "chofer_02", "rrhh"];
  const dominios = ["geotransit.com", "cooperativa.com", "gmail.com"];

  const stateUsuarios: Usuario[] = [];

  for (let i = 0; i < 50; i++) {
    const nombreBase = nombres[i % nombres.length];
    const uniqueId = i + 1;
    
 
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 30));

    stateUsuarios.push({
      id_usuario: uniqueId,
      username: `${nombreBase}_${uniqueId}`,
      email: `${nombreBase}${uniqueId}@${dominios[i % dominios.length]}`,
      password: "password123", 
      f_ultimo_acceso: fecha.toISOString(),
      esta_activo: Math.random() > 0.2, 
      foto: "https://github.com/shadcn.png"
    });
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>(stateUsuarios);

  return { usuarios, setUsuarios };
}
