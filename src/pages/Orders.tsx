import { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './Orders.css';

interface Order {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'executed' | 'pending' | 'cancelled' | 'failed';
  broker: string;
  time: Date;
}

const orders: Order[] = [
  { id: '1', symbol: 'TCS', name: 'Tata Consultancy', type: 'BUY', quantity: 50, price: 3985.20, status: 'executed', broker: 'Kite', time: new Date(Date.now() - 5 * 60000) },
  { id: '2', symbol: 'RELIANCE', name: 'Reliance Industries', type: 'BUY', quantity: 100, price: 2855.00, status: 'executed', broker: 'Kite', time: new Date(Date.now() - 25 * 60000) },
  { id: '3', symbol: 'INFY', name: 'Infosys', type: 'SELL', quantity: 75, price: 1525.50, status: 'pending', broker: 'Upstox', time: new Date(Date.now() - 2 * 60000) },
  { id: '4', symbol: 'SBIN', name: 'State Bank of India', type: 'BUY', quantity: 200, price: 810.00, status: 'executed', broker: 'Kite', time: new Date(Date.now() - 45 * 60000) },
  { id: '5', symbol: 'HDFCBANK', name: 'HDFC Bank', type: 'SELL', quantity: 50, price: 1690.00, status: 'cancelled', broker: 'Kite', time: new Date(Date.now() - 60 * 60000) },
];

export function Orders() {
  const [filter, setFilter] = useState<'all' | 'executed' | 'pending'>('all');

  const filtered = orders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Orders</h1>
        <div className="filter-tabs">
          <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`tab ${filter === 'executed' ? 'active' : ''}`} onClick={() => setFilter('executed')}>Executed</button>
          <button className={`tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
        </div>
      </div>

      <div className="orders-table">
        <div className="table-header">
          <div className="col type-col">Type</div>
          <div className="col symbol-col">Symbol</div>
          <div className="col qty-col">Qty</div>
          <div className="col price-col">Price</div>
          <div className="col status-col">Status</div>
          <div className="col time-col">Time</div>
        </div>

        <div className="table-body">
          {filtered.map(order => (
            <div key={order.id} className="table-row">
              <div className={`col type-col ${order.type.toLowerCase()}`}>
                {order.type === 'BUY' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {order.type}
              </div>
              <div className="col symbol-col">
                <span className="symbol">{order.symbol}</span>
                <span className="name">{order.name}</span>
              </div>
              <div className="col qty-col mono">{order.quantity}</div>
              <div className="col price-col mono">{order.price.toFixed(2)}</div>
              <div className="col status-col">
                <span className={`status-badge ${order.status}`}>
                  {order.status === 'executed' && <CheckCircle size={12} />}
                  {order.status === 'pending' && <Clock size={12} />}
                  {order.status === 'cancelled' && <XCircle size={12} />}
                  {order.status}
                </span>
              </div>
              <div className="col time-col mono">
                {order.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="orders-summary">
        <div className="summary-card">
          <div className="summary-header">
            <FileText size={18} />
            <span>Today's Summary</span>
          </div>
          <div className="summary-stats">
            <div className="stat">
              <span className="label">Total Orders</span>
              <span className="value">{orders.length}</span>
            </div>
            <div className="stat">
              <span className="label">Executed</span>
              <span className="value positive">{orders.filter(o => o.status === 'executed').length}</span>
            </div>
            <div className="stat">
              <span className="label">Pending</span>
              <span className="value warning">{orders.filter(o => o.status === 'pending').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}