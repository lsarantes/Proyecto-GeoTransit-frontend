'use client'

import { useState } from 'react'
import { Eye, MoreVertical } from 'lucide-react'

interface Cooperativa {
  id: number
  nombre: string
  encargado: string
  rutas: number
  telefono: string
  direccion: string
}

interface CooperativasTableProps {
  cooperativas: Cooperativa[]
  onEdit?: (coop: Cooperativa) => void
  onDelete?: (id: number) => void
  onView?: (coop: Cooperativa) => void
}

export function CooperativasTable({ cooperativas, onEdit, onDelete, onView }: CooperativasTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  return (
    <div
      style={{ backgroundColor: '#FFFFFF' }}
      className="rounded-lg overflow-visible shadow-sm"
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: '#2275C3' }}>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              ID
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              Nombre
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              Encargado
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              Rutas
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              Teléfono
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-left font-semibold"
            >
              Dirección
            </th>
            <th
              style={{ color: '#FFFFFF' }}
              className="px-6 py-4 text-center font-semibold"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {cooperativas.map((coop, index) => (
            <tr
              key={coop.id}
              style={{
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F2F7FD',
                borderBottom: '1px solid #C1DAF6',
              }}
            >
              <td
                style={{ color: '#3F4756' }}
                className="px-6 py-4 font-medium"
              >
                {coop.id}
              </td>
              <td
                style={{ color: '#3F4756' }}
                className="px-6 py-4 font-medium"
              >
                {coop.nombre}
              </td>
              <td style={{ color: '#3F4756' }} className="px-6 py-4">
                {coop.encargado}
              </td>
              <td style={{ color: '#3F4756' }} className="px-6 py-4">
                <span
                  style={{
                    backgroundColor: '#C1DAF6',
                    color: '#2275C3',
                  }}
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {coop.rutas}
                </span>
              </td>
              <td style={{ color: '#3F4756' }} className="px-6 py-4">
                {coop.telefono}
              </td>
              <td style={{ color: '#3F4756' }} className="px-6 py-4">
                {coop.direccion}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  {/* View Details Button */}
                  <button
                    onClick={() => onView?.(coop)}
                    style={{ color: '#2275C3' }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye size={20} />
                  </button>

                  {/* Options Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === coop.id ? null : coop.id)}
                      style={{ color: '#2275C3' }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {/* Dropdown Menu - Positioned with higher z-index and top positioning */}
                    {openMenuId === coop.id && (
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#C1DAF6',
                        }}
                        className="absolute right-0 top-full mt-1 w-40 border rounded-lg shadow-xl z-50"
                      >
                        <button
                          onClick={() => {
                            onEdit?.(coop)
                            setOpenMenuId(null)
                          }}
                          style={{ color: '#3F4756' }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg transition-colors font-medium"
                        >
                          Editar
                        </button>
                        <div style={{ borderColor: '#C1DAF6' }} className="border-t"></div>
                        <button
                          onClick={() => {
                            onDelete?.(coop.id)
                            setOpenMenuId(null)
                          }}
                          style={{ color: '#605AEA' }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 last:rounded-b-lg transition-colors font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cooperativas.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: '#605AEA' }} className="text-lg font-medium">
            No hay cooperativas registradas
          </p>
        </div>
      )}
    </div>
  )
}
