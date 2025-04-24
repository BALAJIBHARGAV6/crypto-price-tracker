# Crypto Price Tracker

A real-time cryptocurrency price tracker built with React and Redux Toolkit.

## Overview

This application simulates a real-time cryptocurrency tracking platform similar to CoinMarketCap, displaying live price updates, market statistics, and relevant indicators.

## Features

- Real-time price updates simulated via mock WebSocket
- Comprehensive crypto data table with sorting functionality
- Color-coded price changes and animations for recent updates
- Interactive charting for 7-day price history
- Complete state management with Redux Toolkit
- Responsive design for all device sizes

## Tech Stack

- **React**: UI library
- **Redux Toolkit**: State management
- **TypeScript**: Type safety
- **Chart.js & React-Chartjs-2**: Data visualization
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Styling and responsiveness

## Architecture

The application follows a modular architecture:

- **Features**: Domain-specific code organized by feature (crypto)
- **Components**: UI components separated by functionality
- **Utils**: Helper functions for formatting and utilities
- **Types**: TypeScript type definitions
- **Mock**: Mock data and services

### State Management

All application state is managed through Redux:
- `cryptoSlice.ts`: Redux slice with state and reducers
- `cryptoSelectors.ts`: Memoized selectors for optimized rendering
- `mockWebSocket.ts`: Simulates real-time updates

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`

## Demo

![CryptoTracker Demo](./demo.gif)

## Future Enhancements

- Real WebSocket integration with Binance or other crypto exchange APIs
- Additional filters and search functionality
- Portfolio tracking with localStorage persistence
- Price alerts and notifications
- Dark mode support