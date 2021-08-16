const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

exports.handler = async function (event, context) {

  let browser = null;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let html = (
      await fs.readFile(path.resolve(__dirname, './og-template.html'))
    ).toString();

    let avatar = await fs.readFile(path.resolve(__dirname, './onsen.jpg'), {
      encoding: 'base64',
    });
    html = html.replace(
      './onsen.jpg',
      `data:image/jpeg;charset=utf-8;base64,${avatar}`
    );

    let font = await fs.readFile(path.resolve(__dirname, './Raleway-ExtraLight.ttf'), {
      encoding: 'base64',
    });
    html = html.replace(
      "'./Raleway-ExtraLight.ttf'",
      `data:application/x-font-ttf;charset=utf-8;base64,${font}`
    );

    await page.setContent(html, {
      waitUntil: ['domcontentloaded'],
    });

    await page.evaluateHandle('document.fonts.ready');

    await page.setViewport({
      width: 1200,
      height: 632,
      deviceScaleFactor: process.env.NETLIFY === 'true' ? 1 : 2,
    });

    const baseDir = path.resolve(__dirname, '../../public');

    await page.screenshot({
      path: `${baseDir}/example.jpeg`,
      type: 'jpeg',
      quality: 100,
      clip: { x: 0, y: 0, width: 1200, height: 632 },
    });

    for (const post of posts) {
      await page.evaluate($post => {
        let dom = document.querySelector('#title');
        dom.innerHTML = $post.title;
      }, post);
      await page.screenshot({
        path: `${baseDir}${post.slug.slice(0, -1)}.jpeg`,
        type: 'jpeg',
        quality: 100,
        clip: { x: 0, y: 0, width: 1200, height: 632 },
      });
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `error: ${error}` })
    };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
};
