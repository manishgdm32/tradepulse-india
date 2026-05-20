import { TrendingUp, TrendingDown, Zap, Clock, Target, X } from 'lucide-react';
import type { MarketIndex, Signal } from '../types';
import './Dashboard.css';

interface DashboardProps {
  indices: MarketIndex[];
  signals: Signal[];
  onExecuteSignal: (id: string) => void;
  onDismissSignal: (id: string) => void;
}

export function Dashboard({ indices, signals, onExecuteSignal, onDismissSignal }: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="market-indices">
          {indices.map(index => (
            <IndexCard key={index.symbol} index={index} />
          ))}
        </div>
      </div>

      <section className="signals-section">
        <div className="section-header">
          <div className="section-title">
            <Zap size={18} className="title-icon" />
            <h2>Active Signals</h2>
            <span className="signal-count">{signals.length}</span>
          </div>
        </div>

        <div className="signals-grid">
          {signals.length === 0 ? (
            <div className="empty-signals">
              <Zap size={40} />
              <h3>No Active Signals</h3>
              <p>Scanning markets for opportunities...</p>
            </div>
          ) : (
            signals.slice(0, 6).map(signal => (
              <SignalCard
                key={signal.id}
                signal={signal}
                onExecute={() => onExecuteSignal(signal.id)}
                onDismiss={() => onDismissSignal(signal.id)}
              />
            ))
          )}
        </div>
      </section>

      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon bullish">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Today's P&L</span>
            <span className="stat-value positive">+₹12,450</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon neutral">
            <Target size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Win Rate</span>
            <span className="stat-value">78%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon neutral">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Trades Today</span>
            <span className="stat-value">12</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function IndexCard({ index }: { index: MarketIndex }) {
  const isPositive = index.change >= 0;
  return (
    <div className="index-card">
      <div className="index-header">
        <span className="index-name">{index.name}</span>
        {isPositive ? <TrendingUp size={14} className="trend-icon up" /> : <TrendingDown size={14} className="trend-icon down" />}
      </div>
      <div className="index-value mono">{index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
      <div className={`index-change ${isPositive ? 'up' : 'down'}`}>
        {isPositive ? '+' : ''}{index.change.toFixed(2)} ({isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%)
      </div>
    </div>
  );
}

function SignalCard({ signal, onExecute, onDismiss }: { signal: Signal; onExecute: () => void; onDismiss: () => void }) {
  const now = Date.now();
  const expiresIn = Math.max(0, signal.validUntil.getTime() - now);
  const minutesLeft = Math.floor(expiresIn / 60000);

  return (
    <div className={`signal-card ${signal.action.toLowerCase()}`}>
      <div className="signal-header">
        <div className="signal-symbol">
          <span className="symbol-text">{signal.symbol}</span>
          <span className={`action-badge ${signal.action.toLowerCase()}`}>{signal.action}</span>
        </div>
        <div className="signal-meta">
          <span className="signal-type">{signal.type}</span>
          <div className="confidence">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < signal.confidence ? 'filled' : ''}`}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="signal-prices">
        <div className="price-row">
          <span className="price-label">Entry</span>
          <span className="price-value mono">{signal.entryPrice.toFixed(2)}</span>
        </div>
        <div className="price-row target">
          <span className="price-label">Target</span>
          <span className="price-value mono">{signal.targetPrice.toFixed(2)}</span>
        </div>
        <div className="price-row stoploss">
          <span className="price-label">Stoploss</span>
          <span className="price-value mono">{signal.stopLoss.toFixed(2)}</span>
        </div>
      </div>

      <div className="signal-footer">
        <div className="time-remaining">
          <Clock size={12} />
          <span>{minutesLeft}m left</span>
        </div>
        <div className="signal-actions">
          <button className="dismiss-btn" onClick={onDismiss}>
            <X size={14} />
          </button>
          <button className={`execute-btn ${signal.action.toLowerCase()}`} onClick={onExecute}>
            Execute {signal.action}
          </button>
        </div>
      </div>
    </div>
  );
}