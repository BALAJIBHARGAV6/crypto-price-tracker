// Format large numbers to compact form with suffix (K, M, B, T)
export const formatNumber = (num: number, decimals = 2): string => {
  if (num === null || num === undefined) return 'N/A';
  
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum < 1000) {
    return sign + absNum.toFixed(decimals);
  } else if (absNum < 1000000) {
    return sign + (absNum / 1000).toFixed(decimals) + 'K';
  } else if (absNum < 1000000000) {
    return sign + (absNum / 1000000).toFixed(decimals) + 'M';
  } else if (absNum < 1000000000000) {
    return sign + (absNum / 1000000000).toFixed(decimals) + 'B';
  } else {
    return sign + (absNum / 1000000000000).toFixed(decimals) + 'T';
  }
};

// Format currency with $ symbol and commas
export const formatCurrency = (value: number, decimals = 2): string => {
  if (value === null || value === undefined) return 'N/A';
  
  // For large numbers, use the compact format
  if (Math.abs(value) >= 1000) {
    return '$' + formatNumber(value, decimals);
  }
  
  // For smaller numbers, show the full value with comma separators
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

// Format percentage with +/- sign and % symbol
export const formatPercentage = (value: number): string => {
  if (value === null || value === undefined) return 'N/A';
  
  const sign = value > 0 ? '+' : '';
  return sign + value.toFixed(2) + '%';
};

// Format supply with symbol (e.g., 19.85M BTC)
export const formatSupply = (value: number, symbol: string): string => {
  if (value === null || value === undefined) return 'N/A';
  
  return formatNumber(value, 2) + ' ' + symbol;
};