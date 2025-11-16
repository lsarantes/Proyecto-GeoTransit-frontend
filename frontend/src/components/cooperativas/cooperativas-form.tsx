"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  encargado: z.string().min(3, {
    message: "El nombre del encargado es requerido.",
  }),

  rutas: z.coerce
    .number()
    .int()
    .min(0, { message: "El número de rutas no puede ser negativo." }),
  telefono: z.string().min(8, {
    message: "El teléfono debe tener al menos 8 dígitos.",
  }),
  direccion: z.string().min(5, {
    message: "La dirección es requerida.",
  }),
});

type CooperativaFormValues = z.infer<typeof formSchema>;

interface CooperativasFormProps {
  onSubmit: (data: CooperativaFormValues) => void;
  onCancel: () => void;
}

export function CooperativasForm({
  onSubmit,
  onCancel,
}: CooperativasFormProps) {
  const form = useForm({
    //
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      encargado: "",
      rutas: 0,
      telefono: "",
      direccion: "",
    },
  });

  const handleFormSubmit = (data: CooperativaFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">
            Agregar Nueva Cooperativa
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            aria-label="Cerrar"
            className="cursor-pointer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription>
          Rellena los campos para registrar una nueva cooperativa.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Cooperativa Central" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="encargado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Encargado</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rutas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº de Rutas</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Ej. 8888-8888" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Del semáforo, 2 cuadras al..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex gap-4 justify-end ">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 cursor-pointer"
              >
                Guardar Cooperativa
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
