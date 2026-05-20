import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Shield, Zap } from 'lucide-react';
import './BrokerPage.css';

interface Broker {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected';
  accountType: string;
  margins: { available: number; used: number };
  lastSync: Date;
}

const brokers: Broker[] = [
  { id: 'kite', name: 'Zerodha Kite', logo: 'K', status: 'connected', accountType: 'Equity + F&O', margins: { available: 245680, used: 125000 }, lastSync: new Date(Date.now() - 5 * 60000) },
  { id: 'upstox', name: 'Upstox Pro', logo: 'U', status: 'connected', accountType: 'Equity', margins: { available: 125000, used: 45000 }, lastSync: new Date(Date.now() - 10 * 60000) },
];

export function BrokerPage() {
  const [connectedBrokers, setConnectedBrokers] = useState(brokers);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (brokerId: string) => {
    setConnecting(brokerId);
    setTimeout(() => {
      setConnectedBrokers(prev => prev.map(b => b.id === brokerId ? { ...b, status: 'connected' as const, lastSync: new Date() } : b));
      setConnecting(null);
    }, 2000);
  };

  const handleDisconnect = (brokerId: string) => {
    setConnectedBrokers(prev => prev.map(b => b.id === brokerId ? { ...b, status: 'disconnected' as const } : b));
  };

  return (
    <div className="broker-page">
      <div className="page-header">
        <h1>Broker Integration</h1>
      </div>

      <div className="connected-brokers">
        <h2>Connected Accounts</h2>
        <div className="brokers-list">
          {connectedBrokers.map(broker => (
            <div key={broker.id} className="broker-card connected">
              <div className="broker-logo">{broker.logo}</div>
              <div className="broker-info">
                <div className="broker-header">
                  <span className="broker-name">{broker.name}</span>
                  <span className={`status-indicator ${broker.status}`}>
                    {broker.status === 'connected' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {broker.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <span className="account-type">{broker.accountType}</span>
                {broker.status === 'connected' && (
                  <div className="margins">
                    <div className="margin-item">
                      <span className="label">Available</span>
                      <span className="value positive">₹{broker.margins.available.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="margin-item">
                      <span className="label">Used</span>
                      <span className="value">₹{broker.margins.used.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
                <div className="broker-footer">
                  <span className="last-sync">Last sync: {broker.lastSync.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className="broker-actions">
                    {broker.status === 'connected' ? (
                      <>
                        <button className="action-btn sync"><RefreshCw size={14} /> Sync</button>
                        <button className="action-btn disconnect" onClick={() => handleDisconnect(broker.id)}>Disconnect</button>
                      </>
                    ) : (
                      <button className="action-btn connect" onClick={() => handleConnect(broker.id)} disabled={connecting === broker.id}>
                        {connecting === broker.id ? 'Connecting...' : 'Connect'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="available-brokers">
        <h2>Available Platforms</h2>
        <div className="platforms-grid">
          <div className="platform-card">
            <div className="platform-header">
              <div className="platform-logo kite">K</div>
              <div className="platform-badge connected"><CheckCircle size={12} /> Connected</div>
            </div>
            <h3>Zerodha Kite</h3>
            <p>Industry's most advanced trading platform with minimal latency</p>
            <div className="platform-features">
              <span><Zap size={12} /> Fast execution</span>
              <span><Shield size={12} /> Secure API</span>
            </div>
            <button className="platform-btn connected">Manage</button>
          </div>

          <div className="platform-card">
            <div className="platform-header">
              <div className="platform-logo upstox">U</div>
              <div className="platform-badge connected"><CheckCircle size={12} /> Connected</div>
            </div>
            <h3>Upstox Pro</h3>
            <p>Powerful trading platform with advanced charting tools</p>
            <div className="platform-features">
              <span><Zap size={12} /> Low brokerage</span>
              <span><Shield size={12} /> 2FA enabled</span>
            </div>
            <button className="platform-btn connected">Manage</button>
          </div>

          <div className="platform-card disabled">
            <div className="platform-header">
              <div className="platform-logo angel">A</div>
              <div className="platform-badge">Coming Soon</div>
            </div>
            <h3>Angel SmartAPI</h3>
            <p>Integration with Angel Broking platform</p>
            <div className="platform-features">
              <span><Zap size={12} /> Advanced tools</span>
              <span><Shield size={12} /> Encrypted</span>
            </div>
            <button className="platform-btn" disabled>Coming Soon</button>
          </div>
        </div>
      </div>

      <div className="integration-guide">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Connect Your Broker</h4>
              <p>Securely link your trading account using OAuth authentication</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Receive Signals</h4>
              <p>Get real-time buy/sell signals based on technical analysis</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Execute Trades</h4>
              <p>One-click execution with pre-set entry, target, and stoploss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}