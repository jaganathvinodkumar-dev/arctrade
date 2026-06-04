# ArcTrade

ArcTrade is a responsive stock market frontend built with HTML, CSS, and JavaScript.

## Live demo

The project is deployed on GitHub Pages at:

https://jaganathvinodkumar-dev.github.io/arctrade/

## Features

- Homepage with hero, company intro, features, market overview, testimonials, and footer
- Responsive navigation with mobile menu, active link indicator, and dark mode
- Markets page with indices, gainers, losers, trending stocks, and search
- Stock details page with buy/sell actions and market statistics
- Portfolio page with holdings table and value summary
- Watchlist page with add/remove and search behavior
- Contact page with validation and success message
- Dark mode persisted using localStorage

## Folder structure

- `index.html`
- `markets.html`
- `stock.html`
- `portfolio.html`
- `watchlist.html`
- `contact.html`
- `css/style.css`
- `css/responsive.css`
- `js/app.js`
- `js/market.js`
- `js/theme.js`

## How to use

Open `index.html` in your browser, or serve the folder with a static server.

## Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys the site to GitHub Pages from the `main` branch.

When a push is made to `main`, the site will be published to `gh-pages` automatically.

## License

MIT License — see `LICENSE`.
