import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, Star } from 'lucide-react';
import { selectTotalMarketCap, selectTotal24hVolume } from '../features/crypto/cryptoSelectors';
import { formatCurrency } from '../utils/formatters';

const Header: React.FC = () => {
  const totalMarketCap = useSelector(selectTotalMarketCap);
  const total24hVolume = useSelector(selectTotal24hVolume);

  return (
    <div className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary-500 mr-3" />
            <h1 className="text-2xl font-bold text-neutral-800">CryptoTracker</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">Cryptocurrencies</span>
              <span className="font-medium">6</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">Market Cap</span>
              <span className="font-medium">{formatCurrency(totalMarketCap, 0)}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">24h Volume</span>
              <span className="font-medium">{formatCurrency(total24hVolume, 0)}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded bg-primary-500 hover:bg-primary-600 text-white flex items-center transition-colors">
              <Star className="h-4 w-4 mr-2" />
              Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;