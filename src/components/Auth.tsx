import { TrendingUp, TrendingDown } from 'lucide-react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: () => void;
}

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = mode === 'login' 
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password);

      if (success) {
        onClose();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#58A6FF"/>
              <path d="M8 22L14 14L20 18L26 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="26" cy="10" r="2" fill="#3FB950"/>
            </svg>
          </div>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to continue trading' : 'Join TradePulse India today'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={onSwitchMode}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {mode === 'login' && (
          <div className="admin-hint">
            <p>Admin login: admin@tradepulse.in / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function LoginPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = mode === 'login' 
        ? await login(formData.email, formData.password)
        : await login(formData.email, formData.password);

      if (!success) {
        setError('Invalid credentials');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#58A6FF"/>
            <path d="M8 22L14 14L20 18L26 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="26" cy="10" r="2" fill="#3FB950"/>
          </svg>
          <h1>TradePulse India</h1>
          <p>Professional Stock Trading Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="trader@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="login-switch">
          <p>
            {mode === 'login' ? "New to TradePulse?" : 'Already have an account?'}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials</h4>
          <div className="credential">
            <span className="role">Admin:</span>
            <code>admin@tradepulse.in</code> / <code>admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  orders: number;
  pnl: number;
  lastActive: Date;
  broker: string;
}

const mockClients: Client[] = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', status: 'active', orders: 156, pnl: 45230, lastActive: new Date(), broker: 'Kite' },
  { id: '2', name: 'Priya Sharma', email: 'priya@email.com', status: 'active', orders: 89, pnl: -12350, lastActive: new Date(Date.now() - 30 * 60000), broker: 'Upstox' },
  { id: '3', name: 'Amit Patel', email: 'amit@email.com', status: 'active', orders: 234, pnl: 89120, lastActive: new Date(Date.now() - 2 * 60 * 60000), broker: 'Kite' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@email.com', status: 'inactive', orders: 45, pnl: 5670, lastActive: new Date(Date.now() - 24 * 60 * 60000), broker: 'Upstox' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@email.com', status: 'active', orders: 312, pnl: 156780, lastActive: new Date(), broker: 'Kite' },
];

export function AdminDashboard() {
  const { logout, user } = useAuth();
  const [clients] = useState<Client[]>(mockClients);

  const totalPnl = clients.reduce((sum, c) => sum + c.pnl, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-welcome">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{clients.length}</span>
            <span className="stat-label">Total Clients</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{activeClients}</span>
            <span className="stat-label">Active Now</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{clients.reduce((sum, c) => sum + c.orders, 0)}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
        <div className="stat-card">
          <div className={`stat-icon ${totalPnl >= 0 ? 'green' : 'red'}`}>
            {totalPnl >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div className="stat-info">
            <span className={`stat-value ${totalPnl >= 0 ? 'positive' : 'negative'}`}>
              {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN')}
            </span>
            <span className="stat-label">Total P&L</span>
          </div>
        </div>
      </div>

      <div className="clients-section">
        <h2>Client Activity</h2>
        <div className="clients-table">
          <div className="table-header">
            <div>Client</div>
            <div>Broker</div>
            <div>Orders</div>
            <div>P&L</div>
            <div>Status</div>
            <div>Last Active</div>
          </div>
          {clients.map(client => (
            <div key={client.id} className="table-row">
              <div className="client-info">
                <span className="client-name">{client.name}</span>
                <span className="client-email">{client.email}</span>
              </div>
              <div className="broker-badge">{client.broker}</div>
              <div className="mono">{client.orders}</div>
              <div className={`mono ${client.pnl >= 0 ? 'positive' : 'negative'}`}>
                {client.pnl >= 0 ? '+' : ''}₹{client.pnl.toLocaleString('en-IN')}
              </div>
              <div>
                <span className={`status-badge ${client.status}`}>
                  {client.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {client.status}
                </span>
              </div>
              <div className="mono text-muted">
                {client.lastActive.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}