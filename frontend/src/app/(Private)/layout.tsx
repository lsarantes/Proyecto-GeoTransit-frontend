// app/(protegido)/layout.tsx
"use client"

import Navbar from "@/components/Navbar"
import { RutaProtegida } from "@/components/RutaProtegida"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RutaProtegida>
            <Navbar />
            {children}
        </RutaProtegida>
    )
}