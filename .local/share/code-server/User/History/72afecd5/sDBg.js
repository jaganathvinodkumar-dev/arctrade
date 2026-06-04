const themeBtn = document.getElementById('theme-btn');
const userTheme = localStorage.getItem('arctrade-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = theme => {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    themeBtn.textContent = '🌙';
  }
};

const initialTheme = userTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.body.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('arctrade-theme', nextTheme);
  });
}
