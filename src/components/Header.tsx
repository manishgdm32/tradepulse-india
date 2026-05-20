import { useState } from 'react';
import { Bell, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

interface HeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
}

export function Header({ onNotificationClick, notificationCount }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const now = new Date();
  const marketOpen = now.getHours() >= 9 && now.getHours() < 15 && now.getDay() >= 1 && now.getDay() <= 5;

  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--accent)"/>
            <path d="M8 22L14 14L20 18L26 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="26" cy="10" r="2" fill="var(--bullish)"/>
          </svg>
          <span className="logo-text">TradePulse</span>
          <span className="logo-region">INDIA</span>
        </div>
      </div>

      <div className="header-center">
        <div className={`market-status ${marketOpen ? 'open' : 'closed'}`}>
          <span className="status-dot"></span>
          <span className="status-text">{marketOpen ? 'MARKET OPEN' : 'MARKET CLOSED'}</span>
          <span className="market-time">{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn notification-btn" onClick={onNotificationClick}>
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>

        <div className="user-menu-container">
          <button className="user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar">{initials}</div>
            <span className="user-name">{user?.name || 'User'}</span>
            <ChevronDown size={14} />
          </button>

          {showUserMenu && (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-email">{user?.email}</span>
              </div>
              <button className="menu-item" onClick={() => window.location.hash = '#settings'}>
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className="menu-item logout" onClick={logout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}