import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBackground?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  iconColor = 'text-primary-600',
  iconBackground = 'bg-primary-100',
}) => {
  return (
    <Card className="animate-enter" compact>
      <div className="flex items-center">
        <div className={cn(
          "flex-shrink-0 rounded-full p-2.5",
          iconBackground
        )}>
          <div className={cn("h-5 w-5", iconColor)}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-dark-900">{value}</p>
            {change && (
              <p className={`ml-2 text-sm font-medium ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="inline-flex items-center">
                  {change.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {change.value}%
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;