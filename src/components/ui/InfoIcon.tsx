import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoIconProps {
  tooltip: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ tooltip }) => {
  return (
    <span className="relative group cursor-pointer ml-1">
      <HelpCircle className="h-4 w-4 text-neutral-400" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-neutral-800 text-white text-xs rounded p-2 w-48 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-800"></div>
      </div>
    </span>
  );
};

export default InfoIcon;