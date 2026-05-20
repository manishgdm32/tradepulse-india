import { useState, useEffect, useCallback } from 'react';
import type { Signal } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 15);

const initialSignals: Signal[] = [
  {
    id: generateId(),
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    action: 'BUY',
    entryPrice: 2858.50,
    targetPrice: 2885.00,
    stopLoss: 2840.00,
    confidence: 4,
    type: 'scalping',
    validUntil: new Date(Date.now() + 15 * 60000),
    executed: false,
    expired: false,
    rationale: 'Breaking above 20 EMA with strong volume. RSI showing bullish momentum at 58.',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    symbol: 'SBIN',
    name: 'State Bank of India',
    action: 'BUY',
    entryPrice: 814.00,
    targetPrice: 825.00,
    stopLoss: 808.00,
    confidence: 5,
    type: 'intraday',
    validUntil: new Date(Date.now() + 45 * 60000),
    executed: false,
    expired: false,
    rationale: 'Golden cross on 15min chart. FII buying seen. Support at 808 holding strong.',
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: generateId(),
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    action: 'SELL',
    entryPrice: 1685.00,
    targetPrice: 1672.00,
    stopLoss: 1692.00,
    confidence: 4,
    type: 'scalping',
    validUntil: new Date(Date.now() + 10 * 60000),
    executed: false,
    expired: false,
    rationale: 'Breaking below VWAP with increased volume. 200 EMA acting as resistance.',
    createdAt: new Date(Date.now() - 3 * 60000),
  },
  {
    id: generateId(),
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    action: 'BUY',
    entryPrice: 1248.00,
    targetPrice: 1265.00,
    stopLoss: 1235.00,
    confidence: 3,
    type: 'swing',
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60000),
    executed: false,
    expired: false,
    rationale: 'Bullish flag pattern on daily. Telecom sector showing strength. Entry on pullback.',
    createdAt: new Date(Date.now() - 60 * 60000),
  },
  {
    id: generateId(),
    symbol: 'INFY',
    name: 'Infosys',
    action: 'SELL',
    entryPrice: 1520.00,
    targetPrice: 1505.00,
    stopLoss: 1532.00,
    confidence: 4,
    type: 'intraday',
    validUntil: new Date(Date.now() + 30 * 60000),
    executed: false,
    expired: false,
    rationale: 'Head and shoulders forming on 5min. RSI overbought at 72. Targets 1505.',
    createdAt: new Date(Date.now() - 8 * 60000),
  },
  {
    id: generateId(),
    symbol: 'TCS',
    name: 'Tata Consultancy',
    action: 'BUY',
    entryPrice: 3992.00,
    targetPrice: 4025.00,
    stopLoss: 3965.00,
    confidence: 5,
    type: 'scalping',
    validUntil: new Date(Date.now() + 12 * 60000),
    executed: false,
    expired: false,
    rationale: 'Gap fill completed. 15min MACD cross up. Quick 0.8% target with tight SL.',
    createdAt: new Date(Date.now() - 2 * 60000),
  },
];

export function useSignals() {
  const [signals, setSignals] = useState<Signal[]>(initialSignals);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        expired: signal.validUntil < new Date() && !signal.executed,
      })).filter(s => !s.expired || s.executed));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addSignal = useCallback((signal: Omit<Signal, 'id' | 'createdAt' | 'executed' | 'expired'>) => {
    const newSignal: Signal = {
      ...signal,
      id: generateId(),
      createdAt: new Date(),
      executed: false,
      expired: false,
    };
    setSignals(prev => [newSignal, ...prev]);
    return newSignal;
  }, []);

  const executeSignal = useCallback((signalId: string) => {
    setSignals(prev => prev.map(s => s.id === signalId ? { ...s, executed: true } : s));
  }, []);

  const dismissSignal = useCallback((signalId: string) => {
    setSignals(prev => prev.filter(s => s.id !== signalId));
  }, []);

  return { signals, addSignal, executeSignal, dismissSignal };
}