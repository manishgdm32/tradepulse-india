import { X, Zap, FileText, Bell, AlertTriangle } from 'lucide-react';
import type { Notification } from '../types';
import './Notifications.css';

interface NotificationsProps {
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (notification: Notification) => void;
}

const icons = {
  signal: Zap,
  order: FileText,
  alert: Bell,
  system: AlertTriangle,
};

export function Notifications({ notifications, onClose, onNotificationClick }: NotificationsProps) {
  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div className="notifications-panel" onClick={e => e.stopPropagation()}>
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <Bell size={32} />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map(notification => {
              const Icon = icons[notification.type];
              return (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => onNotificationClick(notification)}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    <Icon size={16} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {notification.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}