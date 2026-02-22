const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new'
  });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => {
    console.log('PAGE ERROR STR:', error.message)
    fs.writeFileSync('react-error.txt', error.stack, 'utf8');
  });

  console.log('Navigating to login...');
  await page.goto('http://newindepth.test/login', { waitUntil: 'networkidle2' });

  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'admin@indepth.co.id');
  await page.type('input[type="password"]', 'Anakanak12');

  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  console.log('Navigating to users/4...');
  await page.goto('http://newindepth.test/admin/users/4', { waitUntil: 'networkidle2' });

  await new Promise(r => setTimeout(r, 2000)); // wait for react to render and potentially crash

  await browser.close();
  console.log('Done.');
})();
