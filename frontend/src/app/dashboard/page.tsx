'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityCard } from '@/components/dashboard/activity-card';
import { Building2, Map, MapPin, Users, Route } from 'lucide-react';

const statsData = [
  {
    label: 'Cooperativas Activas',
    value: '12',
    icon: Building2,
    trend: 5,
    color: 'primary' as const,
  },
  {
    label: 'Rutas en Operación',
    value: '45',
    icon: Route,
    trend: 12,
    color: 'accent' as const,
  },
  {
    label: 'Bahías Disponibles',
    value: '28',
    icon: MapPin,
    trend: -3,
    color: 'secondary' as const,
  },
  {
    label: 'Encargados Asignados',
    value: '34',
    icon: Users,
    trend: 8,
    color: 'primary' as const,
  },
];

const activityItems = [
  {
    id: '1',
    action: 'Cooperativa "Centro" creada exitosamente',
    time: 'Hace 2 horas',
    type: 'success' as const,
  },
  {
    id: '2',
    action: 'Ruta #45 actualizada con nuevas paradas',
    time: 'Hace 4 horas',
    type: 'success' as const,
  },
  {
    id: '3',
    action: 'Nueva bahía registrada en zona norte',
    time: 'Hace 1 día',
    type: 'pending' as const,
  },
  {
    id: '4',
    action: 'Encargado pendiente de asignación',
    time: 'Hace 2 días',
    type: 'warning' as const,
  },
];

export default function DashboardPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <DashboardHeader />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
        </div>

        {/* Activity Section */}
        <ActivityCard items={activityItems} />
      </div>
    </main>
  );
}
