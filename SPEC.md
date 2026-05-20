# TradePulse India - Stock Trading Platform

## Concept & Vision

TradePulse India is a professional-grade web application designed for active Indian traders who specialize in scalping and short-term momentum strategies. The platform delivers real-time NSE/BSE market data, intelligent trade signals with precise entry/exit points, and seamless broker integration for instant order execution. The experience feels like having a seasoned scalper's intuition powered by algorithmic precision — fast, decisive, and action-oriented.

The interface is built for speed: information-dense dashboards where every pixel earns its place, with color-coded signals that register instantly in peripheral vision.

## Design Language

### Aesthetic Direction
**Trading Terminal Aesthetic** — Dark, high-contrast interface inspired by Bloomberg Terminal meets modern fintech. Dense information hierarchy with strategic use of color for instant signal recognition.

### Color Palette
- **Background Primary**: `#0D1117` (deep space black)
- **Background Secondary**: `#161B22` (card surfaces)
- **Background Tertiary**: `#21262D` (elevated elements)
- **Border**: `#30363D`
- **Text Primary**: `#E6EDF3`
- **Text Secondary**: `#8B949E`
- **Text Muted**: `#484F58`
- **Bullish/Buy**: `#3FB950` (vibrant green)
- **Bearish/Sell**: `#F85149` (alert red)
- **Warning**: `#D29922` (amber)
- **Accent**: `#58A6FF` (electric blue)
- **Accent Glow**: `rgba(88, 166, 255, 0.15)`

### Typography
- **Primary Font**: `'JetBrains Mono', 'Fira Code', monospace` — for numbers, prices, data
- **Secondary Font**: `'Inter', -apple-system, sans-serif` — for labels, descriptions
- **Font Sizes**: 11px (micro), 12px (small), 13px (body), 14px (emphasis), 16px (headings), 24px (display)
- **Number Formatting**: Prices always with 2 decimal places, percentages with +/- sign and color

### Spatial System
- **Base Unit**: 4px
- **Spacing Scale**: 4, 8, 12, 16, 20, 24, 32, 48px
- **Card Padding**: 16px
- **Section Gaps**: 24px
- **Border Radius**: 6px (cards), 4px (buttons/inputs), 2px (tags)

### Motion Philosophy
- **Speed**: All transitions 150ms ease-out (fast feedback)
- **Price Updates**: Flash animation (0.5s) green/red background fade
- **Notifications**: Slide in from right, 200ms ease-out
- **Signals**: Pulse animation on new alerts
- **Loading**: Skeleton shimmer with dark gradient

### Visual Assets
- **Icons**: Lucide React (consistent stroke weight)
- **Charts**: Lightweight Charts (TradingView library)
- **Status Indicators**: Pulsing dots, colored badges

## Layout & Structure

### Main Layout
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Market Status | Time | Notifications | User │
├─────────────┬───────────────────────────────────────────────┤
│             │                                               │
│  SIDEBAR    │              MAIN CONTENT AREA               │
│  - Dashboard│   (varies by active section)                 │
│  - Watchlist│                                               │
│  - Signals  │                                               │
│  - Orders   │                                               │
│  - Broker   │                                               │
│  - Settings │                                               │
│             │                                               │
├─────────────┴───────────────────────────────────────────────┤
│ STATUS BAR: Connection | Last Update | Positions Summary   │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard View
- Top: Market overview cards (Nifty, BankNifty, Sensex, Finnifty)
- Middle: Active signals table with quick action buttons
- Bottom: Recent trades and P&L summary

### Watchlist View
- Scannable list with live LTP, change %, volume
- Quick add/remove symbols
- Color-coded by user's positions

### Signals View
- Filterable signal feed (intraday, swing, scalping)
- Entry/exit prices, stop-loss, target
- One-click execution buttons
- Signal history

### Broker Integration View
- Connected brokers list with status
- Link new broker accounts
- Order execution permissions

## Features & Interactions

### 1. Real-Time Market Data
- WebSocket connection to market data feed
- Live NSE/BSE equity prices
- Index tracking (Nifty 50, Bank Nifty, Sensex)
- Custom watchlist with real-time updates
- Price flash animation on change (green up, red down)

### 2. Trading Signals Engine
- Technical analysis-based signals
- Signal types: Scalping (1-5min), Intraday (5-30min), Swing (1-3 days)
- Each signal includes:
  - Symbol, entry price, target price, stop-loss
  - Confidence score (1-5 stars)
  - Time validity
  - Rationale/strategy type
- Signal notifications with sound option
- Signal filtering by type, confidence, sector

### 3. Broker Integration
- **Kite Connect** (Zerodha): Full order execution
- **Upstox Pro**: Order execution
- OAuth flow for secure connection
- Display connected accounts, margins, positions
- Paper trading mode for testing

### 4. Order Execution
- Pending orders with pre-set parameters
- One-click buy/sell from signals
- Confirmation modal with order details
- Real-time order status updates
- Cancel/modify pending orders

### 5. Notification System
- Browser push notifications (with permission)
- In-app notification center
- Sound alerts for new signals
- Price alerts (above/below thresholds)
- Order status notifications
- Configurable notification preferences

### 6. Portfolio Tracking
- Current positions with live P&L
- Order history
- Trade summary (daily, weekly, monthly)
- Win rate statistics

### Edge Cases & States
- **No broker connected**: Prompt to connect with benefits
- **Market closed**: Show next open time, historical data
- **Connection lost**: Reconnection attempt with status indicator
- **No signals**: "Markets analyzed, no opportunities currently"
- **Order failed**: Clear error message with retry option

## Component Inventory

### Header
- Logo (left)
- Market status badge (OPEN/CLOSED with countdown)
- Current time (IST)
- Notification bell with unread count badge
- User avatar dropdown (settings, logout)

### Sidebar Navigation
- Icon + label for each section
- Active state: accent background, accent text
- Hover: subtle background change
- Collapsed mode for more space

### Market Card
- Index name, current value, change %
- Mini sparkline (last 50 points)
- States: loading skeleton, data, error

### Signal Card
- Symbol, action (BUY/SELL badge), confidence stars
- Entry, target, stop-loss prices
- Time remaining countdown
- Quick action buttons: Execute, Dismiss, Details
- States: new (pulsing border), executed, expired, missed

### Price Cell
- Monospace font for alignment
- Flash animation on change
- Color coded by direction

### Order Button
- Primary: Accent blue background
- Buy: Green background
- Sell: Red background
- Hover: Lightened background
- Loading: Spinner inside
- Disabled: Muted colors, no pointer

### Notification Toast
- Icon + message + timestamp
- Auto-dismiss after 5s
- Manual dismiss X button
- Stack from top-right, max 5 visible

### Broker Card
- Broker logo, account type
- Connection status indicator
- Last sync timestamp
- Actions: Sync, Disconnect

### Confirmation Modal
- Dark overlay backdrop
- Centered card with order details
- Cancel / Confirm buttons
- Escape to close

## Technical Approach

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules with CSS Variables
- **Charts**: Lightweight Charts (TradingView)
- **Icons**: Lucide React
- **State**: React Context + useReducer
- **WebSocket**: Native WebSocket with reconnection logic

### Backend Stack
- **Runtime**: Node.js with Express
- **Real-time**: Socket.IO for WebSocket
- **Database**: SQLite (local storage for signals, orders)
- **Brokers**: Kite Connect API, Upstox API

### API Design

#### REST Endpoints
```
GET    /api/market/indices          - Get index data
GET    /api/market/quote/:symbol    - Get quote for symbol
GET    /api/signals                 - Get active signals
POST   /api/signals/execute         - Execute a signal
GET    /api/orders                  - Get order history
POST   /api/orders                  - Place new order
DELETE /api/orders/:id              - Cancel order
GET    /api/portfolio               - Get positions
POST   /api/broker/connect          - Initiate broker OAuth
GET    /api/broker/callback         - OAuth callback
GET    /api/broker/status           - Get broker connection status
POST   /api/alerts                  - Create price alert
```

#### WebSocket Events
```
Server -> Client:
  - market:update    - Price updates
  - signal:new       - New trading signal
  - order:status     - Order status change
  - notification     - General notifications

Client -> Server:
  - subscribe        - Subscribe to symbols
  - unsubscribe       - Unsubscribe from symbols
```

### Data Models

#### Signal
```typescript
{
  id: string
  symbol: string
  action: 'BUY' | 'SELL'
  entryPrice: number
  targetPrice: number
  stopLoss: number
  confidence: 1 | 2 | 3 | 4 | 5
  type: 'scalping' | 'intraday' | 'swing'
  validUntil: Date
  executed: boolean
  createdAt: Date
}
```

#### Order
```typescript
{
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  quantity: number
  price: number
  status: 'pending' | 'executed' | 'cancelled' | 'failed'
  broker: 'kite' | 'upstox'
  signalId?: string
  createdAt: Date
  executedAt?: Date
}
```

#### BrokerConnection
```typescript
{
  id: string
  broker: 'kite' | 'upstox'
  accessToken: string (encrypted)
  refreshToken?: string
  status: 'connected' | 'expired' | 'error'
  lastSync: Date
  userId: string
}
```

### Authentication
- Session-based auth for the application
- OAuth 2.0 for broker connections (each broker has separate auth)
- API keys stored encrypted in database
