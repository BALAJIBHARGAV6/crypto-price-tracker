import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllAssets } from './features/crypto/cryptoSelectors';
import { MockWebSocket } from './features/crypto/mockWebSocket';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable/CryptoTable';
import { AppDispatch } from './app/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector(selectAllAssets);
  
  // Initialize mock WebSocket connection
  useEffect(() => {
    const socket = new MockWebSocket(dispatch, assets);
    socket.connect();
    
    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch, assets]);
  
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">Cryptocurrency Prices</h2>
          </div>
          
          <CryptoTable />
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
          Data updates in real-time. Market cap and supply data refreshed every 1-2 seconds.
        </div>
      </footer>
    </div>
  );
}

export default App;