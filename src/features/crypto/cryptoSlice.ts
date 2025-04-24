import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset } from '../../types/types';
import { initialAssets } from '../../mock/initialData';

const initialState: CryptoState = {
  assets: initialAssets,
  status: 'succeeded',
  error: null
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Update a single asset with partial data
    updateAsset: (state, action: PayloadAction<Partial<CryptoAsset> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      
      if (assetIndex !== -1) {
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...updates
        };
      }
    },
    
    // Toggle starred status
    toggleStarred: (state, action: PayloadAction<string>) => {
      const assetIndex = state.assets.findIndex(asset => asset.id === action.payload);
      
      if (assetIndex !== -1) {
        state.assets[assetIndex].starred = !state.assets[assetIndex].starred;
      }
    },
    
    // Reset all data to initial state (useful for testing)
    resetData: (state) => {
      state.assets = initialAssets;
    }
  }
});

export const { updateAsset, toggleStarred, resetData } = cryptoSlice.actions;

export default cryptoSlice.reducer;