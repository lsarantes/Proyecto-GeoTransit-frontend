'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FormData {
  nombre: string
  encargado: string
  rutas: number
  telefono: string
  direccion: string
}

interface CooperativasFormProps {
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

export function CooperativasForm({ onSubmit, onCancel }: CooperativasFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    encargado: '',
    rutas: 0,
    telefono: '',
    direccion: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rutas' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      nombre: '',
      encargado: '',
      rutas: 0,
      telefono: '',
      direccion: '',
    })
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#C1DAF6',
      }}
      className="rounded-lg p-6 mb-8 border-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: '#2275C3' }} className="text-2xl font-bold">
          Agregar Nueva Cooperativa
        </h2>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X size={24} style={{ color: '#605AEA' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            style={{ color: '#3F4756' }}
            className="block font-semibold mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{
              borderColor: '#C1DAF6',
              color: '#3F4756',
            }}
            className="w-full px-4 py-2 border-2 rounded-lg outline-none focus:ring-2 focus:ring-offset-2"
     
          />
        </div>

        {/* Encargado */}
        <div>
          <label
            htmlFor="encargado"
            style={{ color: '#3F4756' }}
            className="block font-semibold mb-2"
          >
            Encargado
          </label>
          <input
            type="text"
            id="encargado"
            name="encargado"
            value={formData.encargado}
            onChange={handleChange}
            required
            style={{
              borderColor: '#C1DAF6',
              color: '#3F4756',
            }}
            className="w-full px-4 py-2 border-2 rounded-lg outline-none focus:ring-2 focus:ring-offset-2"
          />
        </div>

        {/* Rutas */}
        <div>
          <label
            htmlFor="rutas"
            style={{ color: '#3F4756' }}
            className="block font-semibold mb-2"
          >
            Rutas
          </label>
          <input
            type="number"
            id="rutas"
            name="rutas"
            value={formData.rutas}
            onChange={handleChange}
            required
            style={{
              borderColor: '#C1DAF6',
              color: '#3F4756',
            }}
            className="w-full px-4 py-2 border-2 rounded-lg outline-none focus:ring-2 focus:ring-offset-2"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="telefono"
            style={{ color: '#3F4756' }}
            className="block font-semibold mb-2"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            style={{
              borderColor: '#C1DAF6',
              color: '#3F4756',
            }}
            className="w-full px-4 py-2 border-2 rounded-lg outline-none focus:ring-2 focus:ring-offset-2"
          />
        </div>

        {/* Dirección */}
        <div className="md:col-span-2">
          <label
            htmlFor="direccion"
            style={{ color: '#3F4756' }}
            className="block font-semibold mb-2"
          >
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            style={{
              borderColor: '#C1DAF6',
              color: '#3F4756',
            }}
            className="w-full px-4 py-2 border-2 rounded-lg outline-none focus:ring-2 focus:ring-offset-2"
          />
        </div>

        {/* Botones */}
        <div className="md:col-span-2 flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            style={{ color: '#2275C3', borderColor: '#2275C3' }}
            className="px-6 py-2 border-2 rounded-lg font-semibold hover:bg-opacity-10 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{ backgroundColor: '#2275C3' }}
            className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Guardar Cooperativa
          </button>
        </div>
      </form>
    </div>
  )
}
