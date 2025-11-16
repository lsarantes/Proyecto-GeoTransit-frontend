"use client";

import { useState } from "react";
import { CooperativasTable } from "./cooperativas-table";
import { CooperativasForm } from "./cooperativas-form";
import { Search, Plus } from "lucide-react";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Cooperativa {
  id: number;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

export function CooperativasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([
    {
      id: 1,
      nombre: "Cooperativa Central",
      encargado: "Juan Pérez",
      rutas: 5,
      telefono: "+34 912 345 678",
      direccion: "Calle Principal 123, Madrid",
    },
    {
      id: 2,
      nombre: "Cooperativa del Norte",
      encargado: "María García",
      rutas: 3,
      telefono: "+34 934 567 890",
      direccion: "Avenida del Norte 456, Barcelona",
    },
    {
      id: 3,
      nombre: "Cooperativa del Sur",
      encargado: "Carlos López",
      rutas: 4,
      telefono: "+34 955 123 456",
      direccion: "Calle Sur 789, Sevilla",
    },
  ]);
  const [selectedCoop, setSelectedCoop] = useState<Cooperativa | null>(null);

  const filteredCooperativas = cooperativas.filter((coop) =>
    coop.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCooperativa = (newCoop: Omit<Cooperativa, "id">) => {
    const id = Math.max(...cooperativas.map((c) => c.id), 0) + 1;
    setCooperativas([...cooperativas, { ...newCoop, id }]);
    setShowForm(false);
  };

  const handleEditCooperativa = (coop: Cooperativa) => {
    console.log("[v0] Edit cooperativa:", coop);
  };

  const handleDeleteCooperativa = (id: number) => {
    setCooperativas(cooperativas.filter((c) => c.id !== id));
    console.log("[v0] Deleted cooperativa with id:", id);
  };

  const handleViewCooperativa = (coop: Cooperativa) => {
    setSelectedCoop(coop);
    console.log("[v0] View cooperativa:", coop);
  };

  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-primary">Cooperativas</h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar cooperativa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>

              <Button
                className="bg-sky-600 hover:bg-sky-700 cursor-pointer"
                onClick={() => setShowForm(!showForm)}
              >
                <Plus size={20} className="mr-2 " />
                Agregar
              </Button>
            </div>
          </div>

          {/*FORM*/}
          {showForm && (
            <div className="flex w-full justify-center py-8 pt-1">
              <CooperativasForm
                onSubmit={handleAddCooperativa}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {/* TTABLA*/}
          <CooperativasTable
            cooperativas={filteredCooperativas}
            onEdit={handleEditCooperativa}
            onDelete={handleDeleteCooperativa}
            onView={handleViewCooperativa}
          />

          <Dialog
            open={!!selectedCoop}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setSelectedCoop(null);
              }
            }}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selectedCoop?.nombre}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <p>
                  <span className="font-medium text-muted-foreground">
                    ID:{" "}
                  </span>
                  {selectedCoop?.id}
                </p>
                <p>
                  <span className="font-medium text-muted-foreground">
                    Encargado:{" "}
                  </span>
                  {selectedCoop?.encargado}
                </p>
                <p>
                  <span className="font-medium text-muted-foreground">
                    Rutas:{" "}
                  </span>
                  {selectedCoop?.rutas}
                </p>
                <p>
                  <span className="font-medium text-muted-foreground">
                    Teléfono:{" "}
                  </span>
                  {selectedCoop?.telefono}
                </p>
                <p>
                  <span className="font-medium text-muted-foreground">
                    Dirección:{" "}
                  </span>
                  {selectedCoop?.direccion}
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setSelectedCoop(null)}
                  className="bg-gray-600 cursor-pointer"
                >
                  Cerrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
