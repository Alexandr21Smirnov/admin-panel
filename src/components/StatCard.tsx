import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) => {
  return (
    <Card className='p-6 hover:shadow-lg transition-shadow duration-300 border-border bg-gradient-to-br from-card to-card/50'>
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <p className='text-sm font-medium text-muted-foreground'>{title}</p>
          <p className='text-3xl font-bold text-foreground'>{value}</p>
          {description && (
            <p className='text-xs text-muted-foreground'>{description}</p>
          )}
        </div>
        <div className='p-3 rounded-xl bg-primary/10'>
          <Icon className='w-6 h-6 text-primary' />
        </div>
      </div>
    </Card>
  );
};
