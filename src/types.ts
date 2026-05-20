export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface Quote {
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
}

export interface Signal {
  id: string;
  symbol: string;
  name: string;
  action: 'BUY' | 'SELL';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  confidence: 1 | 2 | 3 | 4 | 5;
  type: 'scalping' | 'intraday' | 'swing';
  validUntil: Date;
  executed: boolean;
  expired: boolean;
  rationale: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'pending' | 'executed' | 'cancelled' | 'failed';
  broker: 'kite' | 'upstox' | 'paper';
  signalId?: string;
  createdAt: Date;
  executedAt?: Date;
}

export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  broker: 'kite' | 'upstox' | 'paper';
}

export interface BrokerConnection {
  id: string;
  broker: 'kite' | 'upstox';
  accountType: string;
  status: 'connected' | 'expired' | 'error' | 'disconnected';
  lastSync: Date;
  margins?: {
    available: number;
    used: number;
    total: number;
  };
}

export interface Notification {
  id: string;
  type: 'signal' | 'order' | 'alert' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  active: boolean;
  triggered: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}