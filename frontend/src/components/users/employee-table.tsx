"use client"
import { Pencil, Trash2, User, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IEmpleadoMti } from "@/types/interface/interface-user"

interface EmployeeTableProps {
  employees: IEmpleadoMti[]
  onEdit: (employee: IEmpleadoMti) => void
  onDelete: (id: string) => void
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Funcionario</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">
              Rol / Nivel de Acceso
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden lg:table-cell">
              Último Acceso
            </th>
            <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Estado</th>
            <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {employees.map((employee) => (
            <tr key={employee.id} className="group hover:bg-muted/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden ring-2 ring-border">
                      {employee.fotoUrl ? (
                        <img
                          src={employee.fotoUrl || "/placeholder.svg"}
                          alt={employee.nombreCompleto}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-secondary-foreground" />
                      )}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${
                        employee.estadoActivo ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{employee.nombreCompleto}</p>
                    <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
                    <p className="text-xs font-mono text-primary/70 mt-0.5">{employee.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{employee.nivelAcceso.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">Permisos de {employee.nivelAcceso.split("_")[0]}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 hidden lg:table-cell">
                {employee.ultimoAcceso ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <div>
                      <p>{new Date(employee.ultimoAcceso).toLocaleDateString()}</p>
                      <p className="text-xs">
                        {new Date(employee.ultimoAcceso).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Sin registro</span>
                )}
              </td>
              <td className="py-4 px-6 text-center">
                <Badge
                  variant={employee.estadoActivo ? "default" : "destructive"}
                  className={
                    employee.estadoActivo
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                      : "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                  }
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      employee.estadoActivo ? "bg-emerald-500" : "bg-destructive"
                    }`}
                  />
                  {employee.estadoActivo ? "Activo" : "Inactivo"}
                </Badge>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => onEdit(employee)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(employee.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={5} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <User className="w-12 h-12 opacity-30" />
                  <p className="text-sm">No se encontraron registros</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
