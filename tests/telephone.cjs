// Vérifie sur le site EN LIGNE que l'écran de jeu « je tape » tient dans la hauteur
// de plusieurs téléphones (pas d'ascenseur), pendant la question et après une erreur.
// Usage : node tests/telephone.cjs [url]   (captures dans captures/)
const { chromium } = require('playwright');
const fs = require('fs');

const URL = process.argv[2] || 'https://lechampdelaurore-boop.github.io/tables-en-cartes/';
const SIZES = [[320, 568], [360, 640], [375, 667], [390, 664], [390, 844], [412, 780], [430, 932]];
const expectedCache = (fs.readFileSync('sw.js', 'utf8').match(/tables-en-cartes-v\d+/) || [])[0];

(async () => {
  fs.mkdirSync('captures', { recursive: true });
  // Attendre que GitHub Pages serve bien la version du dépôt (même CACHE que sw.js).
  for (let i = 0; ; i++) {
    const live = await fetch(URL + 'sw.js?nocache=' + Date.now()).then(r => r.text()).catch(() => '');
    if (live.includes(expectedCache)) { console.log('Version en ligne : ' + expectedCache); break; }
    if (i >= 18) { console.log('Version en ligne différente de ' + expectedCache + ' après 3 min'); process.exit(1); }
    await new Promise(r => setTimeout(r, 10000));
  }

  const browser = await chromium.launch();
  const lines = ['| Écran | Question | Après erreur |', '|---|---|---|'];
  let failed = false;
  for (const [w, h] of SIZES) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.addInitScript(() => localStorage.setItem('tec-prefs', JSON.stringify({ mode: 'type', tables: [7, 8], kind: 'missing', fx: false })));
    await page.goto(URL + '?nocache=' + Date.now());
    await page.click('#startBtn');
    await page.waitForTimeout(300);
    const over = () => page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    const ask = await over();
    await page.screenshot({ path: `captures/${w}x${h}-question.png` });
    await page.click('[data-key="1"]');
    await page.click('[data-key="ok"]');
    await page.waitForTimeout(700);
    const wrong = await over();
    await page.screenshot({ path: `captures/${w}x${h}-erreur.png` });
    const cell = d => (d > 0 ? `❌ dépasse de ${d} px` : '✅');
    if (ask > 0 || wrong > 0) failed = true;
    lines.push(`| ${w}×${h} | ${cell(ask)} | ${cell(wrong)} |`);
    await page.close();
  }
  await browser.close();
  const report = lines.join('\n');
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '## Test téléphone (site en ligne)\n\n' + report + '\n');
  process.exit(failed ? 1 : 0);
})();
