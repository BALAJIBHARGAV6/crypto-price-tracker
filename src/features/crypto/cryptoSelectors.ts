import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CryptoAsset } from '../../types/types';

// Base selector
const selectCryptoState = (state: RootState) => state.crypto;

// Select all assets
export const selectAllAssets = createSelector(
  [selectCryptoState],
  (crypto) => crypto.assets
);

// Select asset by ID
export const selectAssetById = createSelector(
  [selectAllAssets, (_, assetId: string) => assetId],
  (assets, assetId) => assets.find(asset => asset.id === assetId)
);

// Select starred assets
export const selectStarredAssets = createSelector(
  [selectAllAssets],
  (assets) => assets.filter(asset => asset.starred)
);

// Select top gainers (24h)
export const selectTopGainers = createSelector(
  [selectAllAssets],
  (assets) => [...assets].sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 5)
);

// Select top losers (24h)
export const selectTopLosers = createSelector(
  [selectAllAssets],
  (assets) => [...assets].sort((a, b) => a.priceChange24h - b.priceChange24h).slice(0, 5)
);

// Helper function to calculate total market cap
export const selectTotalMarketCap = createSelector(
  [selectAllAssets],
  (assets) => assets.reduce((sum, asset) => sum + asset.marketCap, 0)
);

// Helper function to calculate total 24h volume
export const selectTotal24hVolume = createSelector(
  [selectAllAssets],
  (assets) => assets.reduce((sum, asset) => sum + asset.volume24h, 0)
);