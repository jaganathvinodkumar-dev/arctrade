const initNavigation = () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-controls', 'nav-menu');
    navToggle.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
    // close mobile menu after navigating
    link.addEventListener('click', () => {
      const navMenuEl = document.getElementById('nav-menu');
      if (navMenuEl && navMenuEl.classList.contains('open')) {
        navMenuEl.classList.remove('open');
        const navToggleEl = document.getElementById('nav-toggle');
        if (navToggleEl) navToggleEl.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  });
};

const validateEmail = email => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const statusText = document.getElementById('form-status');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      statusText.textContent = 'Please fill out all fields before submitting.';
      statusText.style.color = '#dc2626';
      return;
    }

    if (!validateEmail(email)) {
      statusText.textContent = 'Please enter a valid email address.';
      statusText.style.color = '#dc2626';
      return;
    }

    statusText.textContent = 'Thanks for reaching out! We will reply soon.';
    statusText.style.color = '#16a34a';
    form.reset();
  });
};

const loadWatchlist = () => {
  const saved = localStorage.getItem('arctrade-watchlist');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [
    { symbol: 'RELI', name: 'Reliance', price: '₹2900', change: '+2.5%' },
    { symbol: 'TCS', name: 'TCS', price: '₹3850', change: '+1.2%' },
    { symbol: 'INFY', name: 'Infosys', price: '₹1700', change: '-0.4%' }
  ];
};

const saveWatchlist = list => {
  localStorage.setItem('arctrade-watchlist', JSON.stringify(list));
};

const renderWatchlist = watchlist => {
  const container = document.getElementById('watchlist-cards');
  if (!container) return;
  container.innerHTML = '';

  if (!watchlist.length) {
    container.innerHTML = '<p class="empty-state">Your watchlist is empty. Add stocks to get started.</p>';
    return;
  }

  watchlist.forEach(stock => {
    const card = document.createElement('article');
    card.className = 'watchlist-card';
    card.innerHTML = `
      <div class="watchlist-card__header">
        <h3>${stock.name}</h3>
        <span>${stock.symbol}</span>
      </div>
      <div class="watchlist-card__meta">
        <span>${stock.price}</span>
        <span class="${stock.change.startsWith('-') ? 'down' : 'up'}">${stock.change}</span>
      </div>
      <button class="btn btn-secondary" data-symbol="${stock.symbol}">Remove</button>
    `;
    container.appendChild(card);
  });
};

const initWatchlist = () => {
  const watchlist = loadWatchlist();
  const searchInput = document.getElementById('watchlist-search');
  const addButton = document.getElementById('watchlist-add-btn');
  let currentWatchlist = watchlist;

  const refresh = filtered => renderWatchlist(filtered);

  refresh(currentWatchlist);

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      const filtered = currentWatchlist.filter(item => item.name.toLowerCase().includes(query) || item.symbol.toLowerCase().includes(query));
      refresh(filtered);
    });
  }

  if (addButton) {
    addButton.addEventListener('click', () => {
      const symbol = prompt('Enter stock symbol (example: HDFC)');
      const name = prompt('Enter company name');
      const price = prompt('Enter current price (example: ₹1200)');
      const change = prompt('Enter daily change (example: +1.2%)');
      if (!symbol || !name || !price || !change) return;
      const nextItem = { symbol: symbol.toUpperCase(), name, price, change };
      currentWatchlist = [nextItem, ...currentWatchlist];
      saveWatchlist(currentWatchlist);
      refresh(currentWatchlist);
    });
  }

  document.addEventListener('click', event => {
    const removeButton = event.target.closest('button[data-symbol]');
    if (!removeButton) return;
    const symbol = removeButton.dataset.symbol;
    currentWatchlist = currentWatchlist.filter(item => item.symbol !== symbol);
    saveWatchlist(currentWatchlist);
    refresh(currentWatchlist);
  });
};

const initStockActions = () => {
  const stockName = document.querySelector('.stock-hero h1')?.textContent?.trim() || 'this stock';
  const buyButton = document.getElementById('buy-btn');
  const sellButton = document.getElementById('sell-btn');

  const showToast = message => {
    let toast = document.querySelector('.toast-message');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-message';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');

    window.setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  };

  if (buyButton) {
    buyButton.addEventListener('click', () => {
      showToast(`Buy order placed for ${stockName}.`);
    });
  }

  if (sellButton) {
    sellButton.addEventListener('click', () => {
      showToast(`Sell order placed for ${stockName}.`);
    });
  }
};

const initPage = () => {
  initNavigation();
  initContactForm();
  initWatchlist();
  initStockActions();
};

document.addEventListener('DOMContentLoaded', initPage);
