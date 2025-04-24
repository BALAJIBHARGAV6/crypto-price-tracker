import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../../features/crypto/cryptoSelectors';
import CryptoTableRow from './CryptoTableRow';
import InfoIcon from '../ui/InfoIcon';
import { CryptoAsset } from '../../types/types';

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const [sortField, setSortField] = useState<keyof CryptoAsset>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const previousPrices = useRef<Record<string, number>>({});
  
  // Update previous prices for animation
  const assetPrices = assets.reduce<Record<string, number>>((acc, asset) => {
    // Store current price for next render comparison
    acc[asset.id] = asset.price;
    return acc;
  }, {});
  
  // Handle sort column click
  const handleSort = (field: keyof CryptoAsset) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default direction
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort assets based on current sort settings
  const sortedAssets = [...assets].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Convert to string for name comparison
    if (sortField === 'name') {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }
    
    // Handle numeric comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  // Save current prices for next render comparison
  React.useEffect(() => {
    previousPrices.current = assetPrices;
  });
  
  // Render sort indicator
  const renderSortIndicator = (field: keyof CryptoAsset) => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="py-3 px-2 text-center font-medium text-neutral-500"></th>
            <th 
              className="py-3 px-2 text-center font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('rank')}
            >
              #
              {renderSortIndicator('rank')}
            </th>
            <th 
              className="py-3 px-4 text-left font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('name')}
            >
              Name
              {renderSortIndicator('name')}
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('price')}
            >
              Price
              {renderSortIndicator('price')}
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('priceChange1h')}
            >
              1h %
              {renderSortIndicator('priceChange1h')}
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('priceChange24h')}
            >
              24h %
              {renderSortIndicator('priceChange24h')}
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('priceChange7d')}
            >
              7d %
              {renderSortIndicator('priceChange7d')}
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('marketCap')}
            >
              Market Cap
              {renderSortIndicator('marketCap')}
              <InfoIcon tooltip="The total market value of a cryptocurrency's circulating supply." />
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('volume24h')}
            >
              Volume(24h)
              {renderSortIndicator('volume24h')}
              <InfoIcon tooltip="A measure of how much of a cryptocurrency was traded in the last 24 hours." />
            </th>
            <th 
              className="py-3 px-4 text-right font-medium text-neutral-500 cursor-pointer hover:text-neutral-800"
              onClick={() => handleSort('circulatingSupply')}
            >
              Circulating Supply
              {renderSortIndicator('circulatingSupply')}
              <InfoIcon tooltip="The amount of coins that are circulating in the market and are in public hands." />
            </th>
            <th className="py-3 px-4 text-left font-medium text-neutral-500">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <CryptoTableRow 
              key={asset.id} 
              asset={asset} 
              previousPrice={previousPrices.current[asset.id]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;