export enum UserRole {
  PASAJERO = "PASAJERO",
  CONDUCTORES = "CONDUCTORES",
  GESTOR_DE_RUTAS = "GESTOR_DE_RUTAS",
  EMPLEADO_MTI = "EMPLEADO_MTI",
  ENCARGADO_COOPERATIVA = "ENCARGADO_COOPERATIVA",
  GESTOR_BAHIAS_MTI = "GESTOR_BAHIAS_MTI",
}

export const RoleLabels: Record<UserRole, string> = {
  [UserRole.PASAJERO]: "Pasajero",
  [UserRole.CONDUCTORES]: "Conductor de Unidad",
  [UserRole.GESTOR_DE_RUTAS]: "Gestor de Rutas",
  [UserRole.EMPLEADO_MTI]: "Funcionario del MTI",
  [UserRole.ENCARGADO_COOPERATIVA]: "Encargado de Cooperativa",
  [UserRole.GESTOR_BAHIAS_MTI]: "Gestor de Bahías (MTI)",
};
