const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const breakpoints = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'tablet-landscape', width: 1024, height: 1366 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  const localIndex = path.resolve(__dirname, '..', 'index.html');
  const url = 'file://' + localIndex;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  for (const bp of breakpoints) {
    await page.setViewport({ width: bp.width, height: bp.height });
    console.log(`Capturing ${bp.name} ${bp.width}x${bp.height}`);
    await page.goto(url, { waitUntil: 'networkidle2' });
    const file = path.join(outDir, `index_${bp.name}_${bp.width}x${bp.height}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log('Saved', file);
  }

  await browser.close();
  console.log('Done');
})();
