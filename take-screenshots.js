const puppeteer = require("puppeteer");

(async () => {
  const url = process.env.URL || "https://sample-sass.vercel.app/"; // Default URL
  const dimensions = [
    { name: "mobile", width: 375, height: 667 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1920, height: 1080 },
  ];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const { name, width, height } of dimensions) {
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path: `screenshot-${name}.png`, fullPage: true });
    console.log(`Screenshot taken for ${name} size (${width}x${height})`);
  }

  await browser.close();
})();
