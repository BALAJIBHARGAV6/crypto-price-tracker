import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleStarred } from '../../features/crypto/cryptoSlice';
import { CryptoAsset } from '../../types/types';
import PriceChange from '../ui/PriceChange';
import MiniChart from '../ui/MiniChart';
import { formatCurrency, formatNumber, formatSupply } from '../../utils/formatters';

interface CryptoTableRowProps {
  asset: CryptoAsset;
  previousPrice?: number;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ asset, previousPrice }) => {
  const dispatch = useDispatch();
  const [priceUpdated, setPriceUpdated] = useState(false);
  
  // Track price changes for animation
  useEffect(() => {
    if (previousPrice !== undefined && previousPrice !== asset.price) {
      setPriceUpdated(true);
      const timer = setTimeout(() => setPriceUpdated(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [asset.price, previousPrice]);
  
  // Handle star toggle
  const handleStarClick = () => {
    dispatch(toggleStarred(asset.id));
  };
  
  // Determine text color for price animation
  const priceColorClass = !previousPrice ? '' : previousPrice < asset.price 
    ? 'text-success-500' 
    : previousPrice > asset.price 
      ? 'text-error-500' 
      : '';
  
  // Apply animation class if price updated
  const priceAnimationClass = priceUpdated ? 'animate-pulse-once' : '';
  
  return (
    <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
      <td className="py-4 px-2 text-center">
        <button
          onClick={handleStarClick}
          className="focus:outline-none"
        >
          <Star
            className={`h-5 w-5 ${asset.starred ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
          />
        </button>
      </td>
      <td className="py-4 px-2 text-center">{asset.rank}</td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <img src={asset.logoUrl} alt={asset.name} className="w-8 h-8 mr-3" />
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-neutral-500 text-sm">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className={`py-4 px-4 text-right font-medium ${priceColorClass} ${priceAnimationClass}`}>
        {formatCurrency(asset.price)}
      </td>
      <td className="py-4 px-4 text-right">
        <PriceChange value={asset.priceChange1h} recentlyUpdated={false} />
      </td>
      <td className="py-4 px-4 text-right">
        <PriceChange value={asset.priceChange24h} recentlyUpdated={false} />
      </td>
      <td className="py-4 px-4 text-right">
        <PriceChange value={asset.priceChange7d} recentlyUpdated={false} />
      </td>
      <td className="py-4 px-4 text-right">
        {formatCurrency(asset.marketCap, 0)}
      </td>
      <td className="py-4 px-4 text-right">
        {formatCurrency(asset.volume24h, 0)}
      </td>
      <td className="py-4 px-4 text-right">
        {formatSupply(asset.circulatingSupply, asset.symbol)}
      </td>
      <td className="py-4 px-4">
        <MiniChart data={asset.chartData} priceChange7d={asset.priceChange7d} />
      </td>
    </tr>
  );
};

export default CryptoTableRow;