import { Wifi, WifiOff, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import './StatusBar.css';

interface StatusBarProps {
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  lastUpdate: Date;
  openPositions: number;
  dayPnl: number;
}

export function StatusBar({ connectionStatus, lastUpdate, openPositions, dayPnl }: StatusBarProps) {
  return (
    <footer className="status-bar">
      <div className="status-left">
        <div className={`connection-status ${connectionStatus}`}>
          {connectionStatus === 'connected' ? <Wifi size={12} /> : <WifiOff size={12} />}
          <span>{connectionStatus === 'connected' ? 'Live' : connectionStatus === 'reconnecting' ? 'Reconnecting...' : 'Disconnected'}</span>
        </div>
        <div className="last-update">
          <Clock size={12} />
          <span>Updated {lastUpdate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST</span>
        </div>
      </div>

      <div className="status-right">
        <div className="status-item">
          <span className="status-label">Open Positions</span>
          <span className="status-value">{openPositions}</span>
        </div>
        <div className="status-divider"></div>
        <div className="status-item">
          <span className="status-label">Day P&L</span>
          <span className={`status-value ${dayPnl >= 0 ? 'positive' : 'negative'}`}>
            {dayPnl >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {dayPnl >= 0 ? '+' : ''}{dayPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })} 
          </span>
        </div>
      </div>
    </footer>
  );
}