import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  children,
  className = '',
  style
}: MetricCardProps) => {
  const changeColors = {
    positive: 'text-cyber-green',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <div 
      className={`glass-card cyber-glow hover:scale-105 transition-all duration-300 ${className}`}
      style={style}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-cyber/20">
            <Icon className="h-5 w-5 text-cyber-cyan" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          {value}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};