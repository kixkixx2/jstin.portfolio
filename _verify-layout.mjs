import puppeteer from 'puppeteer-core';

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

async function check(width, height, label) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#intro', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 500));

  const overflow = await page.evaluate(() => {
    const limit = document.documentElement.clientWidth;
    return [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > limit + 1)
      .slice(0, 12)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: String(el.className).slice(0, 80),
          right: Math.round(r.right),
          width: Math.round(r.width),
        };
      });
  });
  console.log('overflow', label, JSON.stringify(overflow));

  const info = await page.evaluate(() => {
    const ids = ['intro', 'about', 'projects', 'education', 'skills', 'archive', 'contact'];
    const sections = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, missing: true };
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        id,
        top: Math.round(r.top),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        overflowY: style.overflowY,
      };
    });
    const track = document.getElementById('intro')?.parentElement;
    const ts = track ? getComputedStyle(track) : null;
    return {
      flexDirection: ts?.flexDirection,
      overflowX: ts?.overflowX,
      overflowY: ts?.overflowY,
      scrollHeight: track?.scrollHeight,
      clientHeight: track?.clientHeight,
      scrollWidth: track?.scrollWidth,
      clientWidth: track?.clientWidth,
      canScrollY: (track?.scrollHeight || 0) > (track?.clientHeight || 0) + 8,
      canScrollX: (track?.scrollWidth || 0) > (track?.clientWidth || 0) + 8,
      sections,
    };
  });

  const contactBtn = await page.$('button[aria-label="Jump to Contact"]');
  if (contactBtn) {
    await contactBtn.click();
    await new Promise((r) => setTimeout(r, 1600));
  }
  const afterJump = await page.evaluate(() => {
    const contact = document.getElementById('contact');
    const track = contact?.parentElement;
    const r = contact?.getBoundingClientRect();
    return {
      contactTop: r ? Math.round(r.top) : null,
      contactLeft: r ? Math.round(r.left) : null,
      contactVisibleHeight: r ? Math.round(Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)) : 0,
      scrollTop: track?.scrollTop,
      scrollLeft: track?.scrollLeft,
    };
  });

  console.log(JSON.stringify({ label, width, height, info, afterJump }, null, 2));
  await page.close();
}

await check(390, 844, 'mobile');
await check(768, 1024, 'tablet');
await check(1280, 800, 'desktop');
await browser.close();
