//adding Puppeteer library
const pt = require('puppeteer');
(async () => {
  // Path to extension folder
  const paths = 'F:\\puppeteer\\ext\\cplklnmnlbnpmjogncfgfijoopmnlemp\\';
  try {
    console.log('==>Open Browser');
    const browser = await pt.launch({
      // Disable headless mode
      headless: false,
      // Pass the options to install the extension
      args: [
        `--disable-extensions-except=${paths}`,
        `--load-extension=${paths}`,
        `--window-size=800,600`,
      ],
    });

    console.log('==>Navigate to Extension');
    const page = await browser.newPage();
    // Navigate to extension page
    await page.goto(
      'chrome-extension://fgbekoibaojaiamoheiklljjiihibdcb/panel.html'
    );
    // Take a screenshot of the extension page
    console.log('==>Take Screenshot');
    await page.screenshot({ path: 'msedge-extension.png' });

    console.log('==>Close Browser');
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
