const chromium = import('chrome-aws-lambda');
const fs = import('fs-extra');
const path = import('path');

console.log('inside og-images.js!');

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();
    // let html = (
    //   await fs.readFile(path.resolve(__dirname, './og-template.html'))
    // ).toString();

    result = await page.title();
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(sample(emoji)),
  });
};

exports.handler(null, null, console.log);