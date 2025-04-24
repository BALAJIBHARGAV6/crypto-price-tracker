import React from 'react';
import { formatPercentage } from '../../utils/formatters';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  recentlyUpdated?: boolean;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, recentlyUpdated = false }) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  // Determine text color based on value
  let textColorClass = isNeutral 
    ? 'text-neutral-500' 
    : isPositive 
      ? 'text-success-500' 
      : 'text-error-500';
      
  // Add animation class if recently updated
  const animationClass = recentlyUpdated ? 'animate-pulse-once' : '';
  
  return (
    <div className={`flex items-center ${textColorClass} ${animationClass}`}>
      {!isNeutral && (
        <>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
        </>
      )}
      <span>{formatPercentage(value)}</span>
    </div>
  );
};

export default PriceChange;