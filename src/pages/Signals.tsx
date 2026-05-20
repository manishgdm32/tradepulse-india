import { useState } from 'react';
import { Clock, Target, X, Zap } from 'lucide-react';
import type { Signal } from '../types';
import './Signals.css';

interface SignalsProps {
  signals: Signal[];
  onExecute: (id: string) => void;
  onDismiss: (id: string) => void;
}

type FilterType = 'all' | 'scalping' | 'intraday' | 'swing';
type ActionFilter = 'all' | 'BUY' | 'SELL';

export function Signals({ signals, onExecute, onDismiss }: SignalsProps) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [actionFilter, setActionFilter] = useState<ActionFilter>('all');

  const filtered = signals.filter(s => {
    if (typeFilter !== 'all' && s.type !== typeFilter) return false;
    if (actionFilter !== 'all' && s.action !== actionFilter) return false;
    return true;
  });

  return (
    <div className="signals-page">
      <div className="page-header">
        <h1>Trading Signals</h1>
        <div className="filters">
          <div className="filter-group">
            <button className={`filter-btn ${actionFilter === 'all' ? 'active' : ''}`} onClick={() => setActionFilter('all')}>All</button>
            <button className={`filter-btn ${actionFilter === 'BUY' ? 'active buy' : ''}`} onClick={() => setActionFilter('BUY')}>Buy</button>
            <button className={`filter-btn ${actionFilter === 'SELL' ? 'active sell' : ''}`} onClick={() => setActionFilter('SELL')}>Sell</button>
          </div>
          <div className="filter-divider"></div>
          <div className="filter-group">
            <button className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`} onClick={() => setTypeFilter('all')}>All</button>
            <button className={`filter-btn ${typeFilter === 'scalping' ? 'active' : ''}`} onClick={() => setTypeFilter('scalping')}>Scalping</button>
            <button className={`filter-btn ${typeFilter === 'intraday' ? 'active' : ''}`} onClick={() => setTypeFilter('intraday')}>Intraday</button>
            <button className={`filter-btn ${typeFilter === 'swing' ? 'active' : ''}`} onClick={() => setTypeFilter('swing')}>Swing</button>
          </div>
        </div>
      </div>

      <div className="signals-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Zap size={48} />
            <h3>No Signals Found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          filtered.map(signal => (
            <SignalRow key={signal.id} signal={signal} onExecute={() => onExecute(signal.id)} onDismiss={() => onDismiss(signal.id)} />
          ))
        )}
      </div>
    </div>
  );
}

function SignalRow({ signal, onExecute, onDismiss }: { signal: Signal; onExecute: () => void; onDismiss: () => void }) {
  const now = Date.now();
  const expiresIn = Math.max(0, signal.validUntil.getTime() - now);
  const minutesLeft = Math.floor(expiresIn / 60000);
  const isExpired = signal.expired || signal.executed;

  return (
    <div className={`signal-row ${signal.action.toLowerCase()} ${isExpired ? 'inactive' : ''}`}>
      <div className="signal-main">
        <div className="signal-badge">
          <span className={`action-badge ${signal.action.toLowerCase()}`}>{signal.action}</span>
          <span className="type-badge">{signal.type}</span>
        </div>
        <div className="signal-details">
          <span className="symbol">{signal.symbol}</span>
          <span className="name">{signal.name}</span>
        </div>
        <div className="confidence-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < signal.confidence ? 'filled' : ''}`}>★</span>
          ))}
        </div>
      </div>

      <div className="signal-prices-row">
        <div className="price-item">
          <span className="label">Entry</span>
          <span className="value mono">{signal.entryPrice.toFixed(2)}</span>
        </div>
        <div className="price-item target">
          <span className="label"><Target size={12} /> Target</span>
          <span className="value mono">{signal.targetPrice.toFixed(2)}</span>
        </div>
        <div className="price-item stoploss">
          <span className="label"><X size={12} /> Stoploss</span>
          <span className="value mono">{signal.stopLoss.toFixed(2)}</span>
        </div>
      </div>

      <div className="signal-rationale">
        <p>{signal.rationale}</p>
      </div>

      <div className="signal-timing">
        <div className="time-info">
          <Clock size={12} />
          <span>{minutesLeft > 0 ? `${minutesLeft}m remaining` : 'Expired'}</span>
        </div>
        <div className="signal-actions">
          {!isExpired && (
            <button className="execute-btn" onClick={onExecute}>
              Execute {signal.action}
            </button>
          )}
          <button className="dismiss-btn" onClick={onDismiss}>Dismiss</button>
        </div>
      </div>
    </div>
  );
}