import { useState } from 'react';
import { Search, Plus, X, TrendingUp, TrendingDown } from 'lucide-react';
import type { Quote } from '../types';
import './Watchlist.css';

interface WatchlistProps {
  quotes: Quote[];
  onSubscribe: (symbol: string) => void;
  onUnsubscribe: (symbol: string) => void;
}

const popularStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra' },
  { symbol: 'LT', name: 'Larsen & Toubro' },
  { symbol: 'ITC', name: 'ITC Ltd' },
];

export function Watchlist({ quotes, onSubscribe, onUnsubscribe }: WatchlistProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStocks = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="watchlist-page">
      <div className="page-header">
        <h1>Watchlist</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Symbol
        </button>
      </div>

      <div className="watchlist-table">
        <div className="table-header">
          <div className="col symbol-col">Symbol</div>
          <div className="col price-col">LTP</div>
          <div className="col change-col">Change</div>
          <div className="col change-col">% Change</div>
          <div className="col volume-col">Volume</div>
          <div className="col action-col"></div>
        </div>

        <div className="table-body">
          {quotes.map(quote => (
            <div key={quote.symbol} className="table-row">
              <div className="col symbol-col">
                <span className="symbol-text">{quote.symbol}</span>
                <span className="symbol-name">{quote.name}</span>
              </div>
              <div className="col price-col mono">{quote.ltp.toFixed(2)}</div>
              <div className={`col change-col mono ${quote.change >= 0 ? 'positive' : 'negative'}`}>
                {quote.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)}
              </div>
              <div className={`col change-col mono ${quote.changePercent >= 0 ? 'positive' : 'negative'}`}>
                {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
              </div>
              <div className="col volume-col mono">{(quote.volume / 100000).toFixed(2)}L</div>
              <div className="col action-col">
                <button className="remove-btn" onClick={() => onUnsubscribe(quote.symbol)}>
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add to Watchlist</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="search-input">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="stock-list">
                {filteredStocks.map(stock => (
                  <button
                    key={stock.symbol}
                    className="stock-item"
                    onClick={() => {
                      onSubscribe(stock.symbol);
                      setShowAddModal(false);
                    }}
                  >
                    <div className="stock-info">
                      <span className="stock-symbol">{stock.symbol}</span>
                      <span className="stock-name">{stock.name}</span>
                    </div>
                    <Plus size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}