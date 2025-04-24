import { CryptoAsset } from '../../types/types';
import { updateAsset } from './cryptoSlice';
import { AppDispatch } from '../../app/store';

export class MockWebSocket {
  private interval: NodeJS.Timeout | null = null;
  private dispatch: AppDispatch;
  private assets: CryptoAsset[];

  constructor(dispatch: AppDispatch, assets: CryptoAsset[]) {
    this.dispatch = dispatch;
    this.assets = assets;
  }

  connect() {
    // Simulate updates every 1-2 seconds
    this.interval = setInterval(() => {
      // Get a random asset to update
      const randomIndex = Math.floor(Math.random() * this.assets.length);
      const asset = this.assets[randomIndex];
      
      // Generate random price fluctuation (±0.1% to ±1%)
      const priceChangePercent = (Math.random() * 1.9 - 1.0) / 100;
      
      // Calculate new price
      const newPrice = asset.price * (1 + priceChangePercent);
      
      // Calculate new percentages
      let newPriceChange1h = asset.priceChange1h + (Math.random() * 0.2 - 0.1);
      let newPriceChange24h = asset.priceChange24h + (Math.random() * 0.2 - 0.1);
      let newPriceChange7d = asset.priceChange7d + (Math.random() * 0.2 - 0.1);
      
      // Calculate new volume (±0.5% to ±2%)
      const volumeChangePercent = (Math.random() * 2.5 - 0.5) / 100;
      const newVolume = asset.volume24h * (1 + volumeChangePercent);
      
      // Dispatch update
      this.dispatch(updateAsset({
        id: asset.id,
        price: Number(newPrice.toFixed(2)),
        priceChange1h: Number(newPriceChange1h.toFixed(2)),
        priceChange24h: Number(newPriceChange24h.toFixed(2)),
        priceChange7d: Number(newPriceChange7d.toFixed(2)),
        volume24h: Number(newVolume.toFixed(0))
      }));
      
      // Update local copy of assets
      this.assets = this.assets.map(a => {
        if (a.id === asset.id) {
          return {
            ...a,
            price: Number(newPrice.toFixed(2)),
            priceChange1h: Number(newPriceChange1h.toFixed(2)),
            priceChange24h: Number(newPriceChange24h.toFixed(2)),
            priceChange7d: Number(newPriceChange7d.toFixed(2)),
            volume24h: Number(newVolume.toFixed(0))
          };
        }
        return a;
      });
    }, 1000 + Math.random() * 1000); // Random interval between 1-2 seconds
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}