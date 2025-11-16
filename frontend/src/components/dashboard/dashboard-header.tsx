import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  showDatePicker?: boolean;
}

export function DashboardHeader({
  title = 'Dashboard',
  subtitle = 'Bienvenido a Geo Transit',
  showDatePicker = true
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          {subtitle}
        </p>
      </div>
      {showDatePicker && (
        <Button
          variant="default"
          className="gap-2"
          style={{
            borderColor: 'var(--border)',
          }}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Últimos 30 días</span>
        </Button>
      )}
    </div>
  );
}
