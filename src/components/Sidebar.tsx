import { LayoutDashboard, Eye, Zap, FileText, Link2, Settings } from 'lucide-react';
import './Sidebar.css';

type Page = 'dashboard' | 'watchlist' | 'signals' | 'orders' | 'broker' | 'settings';

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const navItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'watchlist' as Page, label: 'Watchlist', icon: Eye },
  { id: 'signals' as Page, label: 'Signals', icon: Zap, badge: 4 },
  { id: 'orders' as Page, label: 'Orders', icon: FileText },
  { id: 'broker' as Page, label: 'Broker', icon: Link2 },
  { id: 'settings' as Page, label: 'Settings', icon: Settings },
];

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon size={18} />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}