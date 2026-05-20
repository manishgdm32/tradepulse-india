import { useState } from 'react';
import { Bell, Volume2, VolumeX, Smartphone, Mail, MessageSquare, Clock, Shield } from 'lucide-react';
import './Settings.css';

export function Settings() {
  const [notifications, setNotifications] = useState({
    signalAlerts: true,
    orderUpdates: true,
    priceAlerts: true,
    soundEnabled: true,
    browserNotifications: true,
    emailNotifications: false,
    smsAlerts: false,
  });

  const [tradingSettings, setTradingSettings] = useState({
    defaultQuantity: 100,
    confirmOrders: true,
    autoSquareOff: true,
    squareOffTime: '15:15',
  });

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-grid">
        <section className="settings-section">
          <div className="section-header">
            <Bell size={18} />
            <h2>Notifications</h2>
          </div>
          <div className="settings-list">
            <ToggleSetting
              label="Signal Alerts"
              description="Get notified when new trading signals are generated"
              checked={notifications.signalAlerts}
              onChange={(v) => setNotifications(n => ({ ...n, signalAlerts: v }))}
            />
            <ToggleSetting
              label="Order Updates"
              description="Receive updates on order execution and status changes"
              checked={notifications.orderUpdates}
              onChange={(v) => setNotifications(n => ({ ...n, orderUpdates: v }))}
            />
            <ToggleSetting
              label="Price Alerts"
              description="Get notified when prices reach your target levels"
              checked={notifications.priceAlerts}
              onChange={(v) => setNotifications(n => ({ ...n, priceAlerts: v }))}
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-header">
            <Volume2 size={18} />
            <h2>Alert Sounds</h2>
          </div>
          <div className="settings-list">
            <ToggleSetting
              label="Sound Effects"
              description="Play sound for new signals and alerts"
              checked={notifications.soundEnabled}
              onChange={(v) => setNotifications(n => ({ ...n, soundEnabled: v }))}
              icon={notifications.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            />
            <ToggleSetting
              label="Browser Notifications"
              description="Show system notifications for important events"
              checked={notifications.browserNotifications}
              onChange={(v) => setNotifications(n => ({ ...n, browserNotifications: v }))}
              icon={<Smartphone size={16} />}
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-header">
            <MessageSquare size={18} />
            <h2>Notification Channels</h2>
          </div>
          <div className="settings-list">
            <ToggleSetting
              label="Email Notifications"
              description="Receive daily summary and reports via email"
              checked={notifications.emailNotifications}
              onChange={(v) => setNotifications(n => ({ ...n, emailNotifications: v }))}
              icon={<Mail size={16} />}
            />
            <ToggleSetting
              label="SMS Alerts"
              description="Get critical alerts via SMS (may incur charges)"
              checked={notifications.smsAlerts}
              onChange={(v) => setNotifications(n => ({ ...n, smsAlerts: v }))}
              icon={<MessageSquare size={16} />}
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-header">
            <Clock size={18} />
            <h2>Trading Preferences</h2>
          </div>
          <div className="settings-list">
            <InputSetting
              label="Default Quantity"
              description="Default quantity for quick orders"
              value={tradingSettings.defaultQuantity}
              onChange={(v) => setTradingSettings(s => ({ ...s, defaultQuantity: Number(v) }))}
              type="number"
            />
            <ToggleSetting
              label="Confirm Orders"
              description="Show confirmation dialog before executing orders"
              checked={tradingSettings.confirmOrders}
              onChange={(v) => setTradingSettings(s => ({ ...s, confirmOrders: v }))}
            />
            <ToggleSetting
              label="Auto Square-Off"
              description="Automatically square off positions at market close"
              checked={tradingSettings.autoSquareOff}
              onChange={(v) => setTradingSettings(s => ({ ...s, autoSquareOff: v }))}
            />
            <InputSetting
              label="Square-Off Time"
              description="Time to square off remaining positions (IST)"
              value={tradingSettings.squareOffTime}
              onChange={(v) => setTradingSettings(s => ({ ...s, squareOffTime: v }))}
              type="time"
              disabled={!tradingSettings.autoSquareOff}
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-header">
            <Shield size={18} />
            <h2>Security</h2>
          </div>
          <div className="security-info">
            <div className="info-item">
              <span className="label">API Access</span>
              <span className="value enabled">Enabled</span>
            </div>
            <div className="info-item">
              <span className="label">Two-Factor Auth</span>
              <span className="value enabled">Enabled</span>
            </div>
            <div className="info-item">
              <span className="label">Session Timeout</span>
              <span className="value">30 minutes</span>
            </div>
          </div>
          <button className="security-btn">Manage API Keys</button>
        </section>
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange, icon }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="setting-item">
      <div className="setting-icon">{icon || <Bell size={16} />}</div>
      <div className="setting-content">
        <span className="setting-label">{label}</span>
        <span className="setting-description">{description}</span>
      </div>
      <button className={`toggle ${checked ? 'active' : ''}`} onClick={() => onChange(!checked)}>
        <span className="toggle-slider"></span>
      </button>
    </div>
  );
}

function InputSetting({ label, description, value, onChange, type, disabled }: {
  label: string;
  description: string;
  value: string | number;
  onChange: (value: string) => void;
  type: string;
  disabled?: boolean;
}) {
  return (
    <div className="setting-item">
      <div className="setting-content">
        <span className="setting-label">{label}</span>
        <span className="setting-description">{description}</span>
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="setting-input"
        disabled={disabled}
      />
    </div>
  );
}