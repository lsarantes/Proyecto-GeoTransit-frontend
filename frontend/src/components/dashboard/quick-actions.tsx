import { type LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

export function QuickActions({ actions, title = 'Acciones Rápidas' }: QuickActionsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={action.onClick}
            variant="outline"
            className="h-auto flex-col items-start p-4 border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <action.icon className="w-5 h-5 mb-2 text-primary" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
