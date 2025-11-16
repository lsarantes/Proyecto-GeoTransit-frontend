import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  action: string;
  time: string;
  type: 'success' | 'pending' | 'warning';
}

interface ActivityCardProps {
  items: ActivityItem[];
  title?: string;
}

export function ActivityCard({ items, title = 'Actividad Reciente' }: ActivityCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="mt-1">{getIcon(item.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.action}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
