'use client'

import { useState } from 'react'
import { CooperativasTable } from './cooperativas-table'
import { CooperativasForm } from './cooperativas-form'
import { Search, Plus } from 'lucide-react'
import Navbar from '../Navbar'

interface Cooperativa {
  id: number
  nombre: string
  encargado: string
  rutas: number
  telefono: string
  direccion: string
}

export function CooperativasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([
    {
      id: 1,
      nombre: 'Cooperativa Central',
      encargado: 'Juan Pérez',
      rutas: 5,
      telefono: '+34 912 345 678',
      direccion: 'Calle Principal 123, Madrid',
    },
    {
      id: 2,
      nombre: 'Cooperativa del Norte',
      encargado: 'María García',
      rutas: 3,
      telefono: '+34 934 567 890',
      direccion: 'Avenida del Norte 456, Barcelona',
    },
    {
      id: 3,
      nombre: 'Cooperativa del Sur',
      encargado: 'Carlos López',
      rutas: 4,
      telefono: '+34 955 123 456',
      direccion: 'Calle Sur 789, Sevilla',
    },
  ])
  const [selectedCoop, setSelectedCoop] = useState<Cooperativa | null>(null)

  const filteredCooperativas = cooperativas.filter((coop) =>
    coop.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCooperativa = (newCoop: Omit<Cooperativa, 'id'>) => {
    const id = Math.max(...cooperativas.map((c) => c.id), 0) + 1
    setCooperativas([...cooperativas, { ...newCoop, id }])
    setShowForm(false)
  }

  const handleEditCooperativa = (coop: Cooperativa) => {
    console.log('[v0] Edit cooperativa:', coop)
    // TODO: Implement edit modal
  }

  const handleDeleteCooperativa = (id: number) => {
    setCooperativas(cooperativas.filter((c) => c.id !== id))
    console.log('[v0] Deleted cooperativa with id:', id)
  }

  const handleViewCooperativa = (coop: Cooperativa) => {
    setSelectedCoop(coop)
    console.log('[v0] View cooperativa:', coop)
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#F2F7FD' }} className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between gap-4">
            {/* Title - Left */}
            <h1
              style={{ color: '#2275C3' }}
              className="text-3xl font-bold whitespace-nowrap"
            >
              Cooperativas
            </h1>

            {/* Search Bar and Add Button - Right */}
            <div className="flex items-center gap-4">
              {/* Search Bar - Smaller */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#C1DAF6',
                }}
                className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg w-64"
              >
                <Search size={18} style={{ color: '#2275C3' }} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ color: '#3F4756' }}
                  className="flex-1 outline-none bg-transparent placeholder-gray-400 text-sm"
                />
              </div>

              {/* Add Button - Right */}
              <button
                onClick={() => setShowForm(!showForm)}
                style={{ backgroundColor: '#2275C3' }}
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <CooperativasForm
              onSubmit={handleAddCooperativa}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Table Section */}
          <CooperativasTable 
            cooperativas={filteredCooperativas}
            onEdit={handleEditCooperativa}
            onDelete={handleDeleteCooperativa}
            onView={handleViewCooperativa}
          />

          {selectedCoop && (
            <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div
                style={{ backgroundColor: '#FFFFFF' }}
                className="rounded-lg shadow-lg max-w-md w-full p-6"
              >
                <h2
                  style={{ color: '#2275C3' }}
                  className="text-2xl font-bold mb-4"
                >
                  {selectedCoop.nombre}
                </h2>
                <div className="space-y-3">
                  <p style={{ color: '#3F4756' }}>
                    <span className="font-semibold">ID:</span> {selectedCoop.id}
                  </p>
                  <p style={{ color: '#3F4756' }}>
                    <span className="font-semibold">Encargado:</span> {selectedCoop.encargado}
                  </p>
                  <p style={{ color: '#3F4756' }}>
                    <span className="font-semibold">Rutas:</span> {selectedCoop.rutas}
                  </p>
                  <p style={{ color: '#3F4756' }}>
                    <span className="font-semibold">Teléfono:</span> {selectedCoop.telefono}
                  </p>
                  <p style={{ color: '#3F4756' }}>
                    <span className="font-semibold">Dirección:</span> {selectedCoop.direccion}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCoop(null)}
                  style={{ backgroundColor: '#2275C3' }}
                  className="mt-6 w-full px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
