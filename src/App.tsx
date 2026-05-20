import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Watchlist } from './pages/Watchlist';
import { Signals } from './pages/Signals';
import { Orders } from './pages/Orders';
import { BrokerPage } from './pages/BrokerPage';
import { Settings } from './pages/Settings';
import { Notifications } from './components/Notifications';
import { StatusBar } from './components/StatusBar';
import { LoginPage, AdminDashboard } from './components/Auth';
import { useAuth } from './context/AuthContext';
import { useMarketData } from './hooks/useMarketData';
import { useSignals } from './hooks/useSignals';
import { useNotifications } from './hooks/useNotifications';
import type { Notification } from './types';
import './App.css';

type Page = 'dashboard' | 'watchlist' | 'signals' | 'orders' | 'broker' | 'settings';

function TradingApp() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');

  const { indices, quotes, subscribe, unsubscribe } = useMarketData();
  const { signals, executeSignal, dismissSignal } = useSignals();
  const { notifications, markAsRead } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            indices={indices}
            signals={signals.filter(s => !s.executed && !s.expired)}
            onExecuteSignal={executeSignal}
            onDismissSignal={dismissSignal}
          />
        );
      case 'watchlist':
        return (
          <Watchlist
            quotes={quotes}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
        );
      case 'signals':
        return (
          <Signals
            signals={signals}
            onExecute={executeSignal}
            onDismiss={dismissSignal}
          />
        );
      case 'orders':
        return <Orders />;
      case 'broker':
        return <BrokerPage />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard
            indices={indices}
            signals={signals.filter(s => !s.executed && !s.expired)}
            onExecuteSignal={executeSignal}
            onDismissSignal={dismissSignal}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        notificationCount={notifications.filter(n => !n.read).length}
      />
      <div className="app-body">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
      <StatusBar
        connectionStatus={connectionStatus}
        lastUpdate={new Date()}
        openPositions={3}
        dayPnl={1245.50}
      />
      {showNotifications && (
        <Notifications
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onNotificationClick={handleNotificationClick}
        />
      )}
    </div>
  );
}

export default function App() {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <TradingApp />;
}