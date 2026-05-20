import { useState, useEffect, useCallback } from 'react';
import type { MarketIndex, Quote } from '../types';

export function useMarketData() {
  const [indices, setIndices] = useState<MarketIndex[]>([
    { symbol: 'NIFTY 50', name: 'Nifty 50', value: 24892.45, change: 125.30, changePercent: 0.51, high: 24980.20, low: 24750.15, previousClose: 24767.15 },
    { symbol: 'BANK NIFTY', name: 'Bank Nifty', value: 52345.80, change: -245.60, changePercent: -0.47, high: 52750.00, low: 52180.25, previousClose: 52591.40 },
    { symbol: 'SENSEX', name: 'Sensex', value: 81892.35, change: 342.18, changePercent: 0.42, high: 82150.00, low: 81500.50, previousClose: 81550.17 },
    { symbol: 'FINNIFTY', name: 'Fin Nifty', value: 24850.25, change: 89.45, changePercent: 0.36, high: 24920.00, low: 24750.00, previousClose: 24760.80 },
  ]);

  const [quotes, setQuotes] = useState<Quote[]>([
    { symbol: 'RELIANCE', name: 'Reliance Industries', ltp: 2856.75, change: 23.45, changePercent: 0.83, open: 2840.00, high: 2875.50, low: 2835.20, close: 2833.30, volume: 4523000, timestamp: new Date() },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', ltp: 1689.30, change: -12.80, changePercent: -0.75, open: 1705.00, high: 1712.50, low: 1685.00, close: 1702.10, volume: 3210000, timestamp: new Date() },
    { symbol: 'INFY', name: 'Infosys', ltp: 1524.60, change: 8.90, changePercent: 0.59, open: 1518.00, high: 1535.00, low: 1512.50, close: 1515.70, volume: 2150000, timestamp: new Date() },
    { symbol: 'TCS', name: 'Tata Consultancy', ltp: 3985.20, change: 45.30, changePercent: 1.15, open: 3945.00, high: 3995.00, low: 3938.00, close: 3939.90, volume: 1850000, timestamp: new Date() },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', ltp: 1145.80, change: -5.20, changePercent: -0.45, open: 1152.00, high: 1158.50, low: 1142.00, close: 1151.00, volume: 2890000, timestamp: new Date() },
    { symbol: 'SBIN', name: 'State Bank of India', ltp: 812.45, change: 15.60, changePercent: 1.96, open: 798.00, high: 815.00, low: 795.00, close: 796.85, volume: 45600000, timestamp: new Date() },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', ltp: 1245.80, change: 22.30, changePercent: 1.82, open: 1225.00, high: 1255.00, low: 1220.00, close: 1223.50, volume: 3520000, timestamp: new Date() },
    { symbol: 'ITC', name: 'ITC Ltd', ltp: 452.30, change: -2.15, changePercent: -0.47, open: 455.00, high: 457.50, low: 450.00, close: 454.45, volume: 5230000, timestamp: new Date() },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', ltp: 1825.60, change: -18.40, changePercent: -1.00, open: 1845.00, high: 1852.00, low: 1818.00, close: 1844.00, volume: 2150000, timestamp: new Date() },
    { symbol: 'LT', name: 'Larsen & Toubro', ltp: 3685.40, change: 42.80, changePercent: 1.18, open: 3645.00, high: 3695.00, low: 3635.00, close: 3642.60, volume: 1890000, timestamp: new Date() },
  ]);

  const [subscribed, setSubscribed] = useState<Set<string>>(new Set(['RELIANCE', 'HDFCBANK', 'INFY', 'TCS', 'SBIN']));

  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(prev => prev.map(quote => {
        const changePercent = (Math.random() - 0.5) * 0.3;
        const change = quote.ltp * (changePercent / 100);
        return {
          ...quote,
          ltp: Math.round((quote.ltp + change) * 100) / 100,
          change: Math.round((quote.change + change) * 100) / 100,
          changePercent: Math.round((quote.changePercent + changePercent) * 100) / 100,
          timestamp: new Date(),
        };
      }));

      setIndices(prev => prev.map(index => {
        const changePercent = (Math.random() - 0.5) * 0.2;
        const change = index.value * (changePercent / 100);
        return {
          ...index,
          value: Math.round((index.value + change) * 100) / 100,
          change: Math.round((index.change + change) * 100) / 100,
          changePercent: Math.round((index.changePercent + changePercent) * 100) / 100,
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const updateQuote = useCallback((symbol: string, ltp: number) => {
    setQuotes(prev => prev.map(q => q.symbol === symbol ? { ...q, ltp, timestamp: new Date() } : q));
  }, []);

  const subscribe = useCallback((symbol: string) => {
    setSubscribed(prev => new Set(prev).add(symbol));
  }, []);

  const unsubscribe = useCallback((symbol: string) => {
    setSubscribed(prev => {
      const next = new Set(prev);
      next.delete(symbol);
      return next;
    });
  }, []);

  return { indices, quotes, subscribed, subscribe, unsubscribe, updateQuote };
}