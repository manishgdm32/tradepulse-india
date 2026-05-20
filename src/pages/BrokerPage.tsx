import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, ExternalLink, Shield, Zap, Plus, Link2, Loader2 } from 'lucide-react';
import './BrokerPage.css';

interface Broker {
  id: string;
  name: string;
  logo: string;
  color: string;
  status: 'connected' | 'disconnected' | 'connecting';
  accountType: string;
  margins: { available: number; used: number; total: number };
  lastSync: Date;
  apiKey?: string;
}

const allBrokers = [
  { id: 'kite', name: 'Zerodha Kite', logo: 'K', color: '#5861c7', description: 'Industry leading platform with fastest execution', features: ['Low latency', 'Advanced charting', 'Multi-device sync'] },
  { id: 'upstox', name: 'Upstox Pro', logo: 'U', color: '#00a651', description: 'Powerful trading with affordable brokerage', features: ['Zero AMC', 'GTT Orders', 'Basket Orders'] },
  { id: 'angel', name: 'Angel One', logo: 'A', color: '#ff6b35', description: 'Smart trading with AI-powered insights', features: ['SmartAPI', 'Algo Trading', 'Portfolio Analysis'] },
  { id: 'icici', name: 'ICICI Securities', logo: 'IC', color: '#00529b', description: 'Trusted platform from ICICI Bank', features: ['3-in-1 Account', 'Research Reports', 'Instant Margin'] },
  { id: 'hdfc', name: 'HDFC Securities', logo: 'H', color: '#004c8f', description: 'Seamless trading with HDFC ecosystem', features: ['Net Banking', 'Mobile Trading', 'Portfolio Track'] },
  { id: 'kotak', name: 'Kotak Securities', logo: 'KS', color: '#ed1c24', description: 'Professional tools for active traders', features: ['KEAT', 'Options Tools', 'Custom Strategies'] },
  { id: 'axis', name: 'Axis Direct', logo: 'AX', color: '#97144d', description: 'Investment made simple and smart', features: ['Easy Investing', 'Stock SIP', 'Tax Planning'] },
  { id: 'iifl', name: 'IIFL Securities', logo: 'II', color: '#f7941d', description: 'Research-driven wealth management', features: ['Premium Research', 'Portfolio Review', 'Wealth Advisory'] },
];

export function BrokerPage() {
  const [connectedBrokers, setConnectedBrokers] = useState<Broker[]>([
    { id: 'kite', name: 'Zerodha Kite', logo: 'K', color: '#5861c7', status: 'connected', accountType: 'Equity + F&O', margins: { available: 245680, used: 125000, total: 370680 }, lastSync: new Date(Date.now() - 5 * 60000) },
    { id: 'upstox', name: 'Upstox Pro', logo: 'U', color: '#00a651', status: 'connected', accountType: 'Equity', margins: { available: 125000, used: 45000, total: 170000 }, lastSync: new Date(Date.now() - 10 * 60000) },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [connectingBroker, setConnectingBroker] = useState<string | null>(null);

  const connectedIds = connectedBrokers.map(b => b.id);

  const handleConnect = async (brokerId: string) => {
    setConnectingBroker(brokerId);
    
    const brokerInfo = allBrokers.find(b => b.id === brokerId);
    if (!brokerInfo) return;

    await new Promise(r => setTimeout(r, 2000));

    const newBroker: Broker = {
      id: brokerId,
      name: brokerInfo.name,
      logo: brokerInfo.logo,
      color: brokerInfo.color,
      status: 'connected',
      accountType: 'Equity + F&O',
      margins: { available: 100000, used: 0, total: 100000 },
      lastSync: new Date(),
    };

    setConnectedBrokers(prev => [...prev, newBroker]);
    setConnectingBroker(null);
    setShowAddModal(false);
  };

  const handleDisconnect = (brokerId: string) => {
    setConnectedBrokers(prev => prev.filter(b => b.id !== brokerId));
  };

  const handleSync = (brokerId: string) => {
    setConnectedBrokers(prev => prev.map(b => 
      b.id === brokerId ? { ...b, lastSync: new Date() } : b
    ));
  };

  const totalAvailable = connectedBrokers.reduce((sum, b) => sum + b.margins.available, 0);
  const totalUsed = connectedBrokers.reduce((sum, b) => sum + b.margins.used, 0);
  const totalMargin = connectedBrokers.reduce((sum, b) => sum + b.margins.total, 0);

  return (
    <div className="broker-page">
      <div className="page-header">
        <h1>Broker Integration</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Broker
        </button>
      </div>

      {connectedBrokers.length > 0 && (
        <div className="margin-overview">
          <div className="margin-card">
            <span className="margin-label">Total Available</span>
            <span className="margin-value">₹{totalAvailable.toLocaleString('en-IN')}</span>
          </div>
          <div className="margin-card">
            <span className="margin-label">Total Used</span>
            <span className="margin-value used">₹{totalUsed.toLocaleString('en-IN')}</span>
          </div>
          <div className="margin-card">
            <span className="margin-label">Total Margin</span>
            <span className="margin-value">₹{totalMargin.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      <div className="connected-brokers">
        <h2>Connected Accounts ({connectedBrokers.length})</h2>
        {connectedBrokers.length === 0 ? (
          <div className="empty-brokers">
            <Link2 size={48} />
            <h3>No Brokers Connected</h3>
            <p>Connect a broker to start trading with real-time execution</p>
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <Plus size={16} />
              Connect Broker
            </button>
          </div>
        ) : (
          <div className="brokers-grid">
            {connectedBrokers.map(broker => (
              <div key={broker.id} className="broker-card connected">
                <div className="broker-logo" style={{ background: broker.color }}>{broker.logo}</div>
                <div className="broker-info">
                  <div className="broker-header">
                    <span className="broker-name">{broker.name}</span>
                    <span className={`status-indicator ${broker.status}`}>
                      {broker.status === 'connected' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {broker.status === 'connected' ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <span className="account-type">{broker.accountType}</span>
                  
                  <div className="margin-bar">
                    <div className="margin-progress">
                      <div 
                        className="margin-used" 
                        style={{ width: `${(broker.margins.used / broker.margins.total) * 100}%` }}
                      />
                    </div>
                    <div className="margin-labels">
                      <span>Used: ₹{broker.margins.used.toLocaleString('en-IN')}</span>
                      <span>Available: ₹{broker.margins.available.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="broker-footer">
                    <span className="last-sync">Synced: {broker.lastSync.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="broker-actions">
                      <button className="action-btn sync" onClick={() => handleSync(broker.id)}>
                        <RefreshCw size={14} /> Sync
                      </button>
                      <button className="action-btn disconnect" onClick={() => handleDisconnect(broker.id)}>
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Connect Broker</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>X</button>
            </div>
            <div className="modal-body">
              <p className="modal-subtitle">Select a broker platform to connect with your account</p>
              <div className="available-brokers-list">
                {allBrokers.map(broker => {
                  const isConnected = connectedIds.includes(broker.id);
                  const isConnecting = connectingBroker === broker.id;
                  return (
                    <div key={broker.id} className={`broker-option ${isConnected ? 'connected' : ''}`}>
                      <div className="broker-option-logo" style={{ background: broker.color }}>{broker.logo}</div>
                      <div className="broker-option-info">
                        <span className="broker-option-name">{broker.name}</span>
                        <span className="broker-option-desc">{broker.description}</span>
                        <div className="broker-features">
                          {broker.features.map(f => <span key={f} className="feature-tag">{f}</span>)}
                        </div>
                      </div>
                      <button 
                        className={`connect-btn ${isConnected ? 'connected' : ''}`}
                        onClick={() => !isConnected && handleConnect(broker.id)}
                        disabled={isConnected || isConnecting}
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 size={14} className="spinner" /> Connecting...
                          </>
                        ) : isConnected ? (
                          <>
                            <CheckCircle size={14} /> Connected
                          </>
                        ) : (
                          <>
                            <ExternalLink size={14} /> Connect
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="integration-guide">
        <h2>How Broker Integration Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon"><Link2 size={20} /></div>
            <div className="step-content">
              <h4>1. Connect Your Broker</h4>
              <p>Link your trading account securely using OAuth/API keys</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon"><Zap size={20} /></div>
            <div className="step-content">
              <h4>2. Receive Signals</h4>
              <p>Get real-time buy/sell signals based on technical analysis</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon"><Shield size={20} /></div>
            <div className="step-content">
              <h4>3. Execute Trades</h4>
              <p>One-click execution with pre-set entry, target, and stoploss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}