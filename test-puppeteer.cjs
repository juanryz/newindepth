const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('Browser Error:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.error('Page Error:', error.message);
    });

    try {
        await page.goto('https://newindepth.test/courses', { waitUntil: 'networkidle2', timeout: 10000 });
        console.log('Page loaded successfully');
    } catch (err) {
        console.error('Navigation error:', err.message);
    }

    await browser.close();
})();
