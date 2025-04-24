import { CryptoAsset } from '../types/types';

// Helper to generate random chart data
const generateChartData = (count = 7, trend: 'up' | 'down' | 'mixed' = 'mixed') => {
  const data: number[] = [];
  let baseValue = Math.random() * 1000 + 100;
  
  for (let i = 0; i < count; i++) {
    let change = Math.random() * 50;
    
    if (trend === 'up') {
      baseValue += change;
    } else if (trend === 'down') {
      baseValue -= change;
    } else {
      baseValue += Math.random() > 0.5 ? change : -change;
    }
    
    // Ensure values stay positive
    baseValue = Math.max(baseValue, 50);
    data.push(baseValue);
  }
  
  return data;
};

export const initialAssets: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    chartData: generateChartData(7, 'up'),
    starred: false
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    price: 1802.46,
    priceChange1h: 0.60,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    chartData: generateChartData(7, 'up'),
    starred: false
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    price: 1.00,
    priceChange1h: -0.00,
    priceChange24h: -0.00,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    chartData: generateChartData(7, 'mixed'),
    starred: false
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    chartData: generateChartData(7, 'up'),
    starred: false
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logoUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.20,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    chartData: generateChartData(7, 'mixed'),
    starred: false
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    chartData: generateChartData(7, 'up'),
    starred: false
  }
];