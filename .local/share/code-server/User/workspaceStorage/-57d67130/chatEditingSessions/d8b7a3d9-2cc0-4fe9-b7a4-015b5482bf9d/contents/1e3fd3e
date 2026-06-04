const gainers = [
  { symbol: 'RELI', name: 'Reliance', price: '₹2900', change: '+2.5%' },
  { symbol: 'TCS', name: 'TCS', price: '₹3850', change: '+1.2%' },
  { symbol: 'HDFC', name: 'HDFC Bank', price: '₹1640', change: '+0.8%' }
];

const losers = [
  { symbol: 'INFY', name: 'Infosys', price: '₹1700', change: '-0.4%' },
  { symbol: 'ICIC', name: 'ICICI Bank', price: '₹940', change: '-0.2%' },
  { symbol: 'SBIN', name: 'State Bank', price: '₹615', change: '-0.6%' }
];

const trendingStocks = [
  { symbol: 'RELI', name: 'Reliance', price: '₹2900', change: '+2.5%' },
  { symbol: 'TCS', name: 'TCS', price: '₹3850', change: '+1.2%' },
  { symbol: 'INFY', name: 'Infosys', price: '₹1700', change: '-0.4%' },
  { symbol: 'HDFC', name: 'HDFC Bank', price: '₹1640', change: '+0.8%' },
  { symbol: 'ICIC', name: 'ICICI Bank', price: '₹940', change: '-0.2%' }
];

const renderStockList = (items, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items.length) {
    container.innerHTML = '<p class="empty-state">No matching stocks found.</p>';
    return;
  }

  container.innerHTML = items.map(stock => `
    <article class="feature-card stock-card">
      <div class="stock-card__head">
        <h4>${stock.name}</h4>
        <span>${stock.symbol}</span>
      </div>
      <p class="value">${stock.price}</p>
      <p class="change ${stock.change.startsWith('-') ? 'down' : 'up'}">${stock.change}</p>
    </article>
  `).join('');
};

const renderTrending = list => {
  const container = document.getElementById('trending-list');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = '<p class="empty-state">No trending stocks found.</p>';
    return;
  }

  container.innerHTML = list.map(stock => `
    <article class="index-card">
      <h4>${stock.name}</h4>
      <p class="value">${stock.price}</p>
      <p class="change ${stock.change.startsWith('-') ? 'down' : 'up'}">${stock.change}</p>
    </article>
  `).join('');
};

const filterStocks = (list, query) => {
  if (!query) return list;
  return list.filter(stock => stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query));
};

const initMarketPage = () => {
  renderStockList(gainers, 'gainers-list');
  renderStockList(losers, 'losers-list');
  renderTrending(trendingStocks);

  const marketSearch = document.getElementById('market-search');
  if (!marketSearch) return;

  marketSearch.addEventListener('input', () => {
    const query = marketSearch.value.trim().toLowerCase();
    renderStockList(filterStocks(gainers, query), 'gainers-list');
    renderStockList(filterStocks(losers, query), 'losers-list');
    renderTrending(filterStocks(trendingStocks, query));
  });
};

window.addEventListener('DOMContentLoaded', initMarketPage);
