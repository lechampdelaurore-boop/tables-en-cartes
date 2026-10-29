// Génère la page HTML des cartes à imprimer (A4, 3 × 3 cartes, recto puis verso).
//   node outils/cartes-pdf.js cartes.html
// Puis l'imprimer en PDF, par exemple avec Chrome :
//   chrome --headless --no-pdf-header-footer --print-to-pdf=cartes-multiplication-a-imprimer.pdf file:///.../cartes.html
const fs = require('fs');

const colors = {
  2: '#E5484D', 3: '#F76B15', 4: '#C98A00', 5: '#30A46C', 6: '#12A594', 7: '#0090FF',
  8: '#6E56CF', 9: '#D6409F', 10: '#5B6472', 11: '#8E4EC6', 12: '#A18072'
};

let pages = '';
for (let t = 2; t <= 12; t++) {
  const c = colors[t];
  const facts = [];
  for (let b = 2; b <= 10; b++) facts.push({ a: t, b });

  const front = facts.map(f => `
    <div class="card front" style="--c:${c}">
      <div class="band"><span>Table de ${t}</span></div>
      <div class="q">${f.a} × ${f.b}</div>
    </div>`).join('');

  // Verso : les colonnes sont inversées dans chaque rangée pour tomber derrière
  // la bonne carte quand on retourne la feuille sur le bord long.
  const rows = [0, 1, 2].map(r => facts.slice(r * 3, r * 3 + 3).reverse());
  const back = rows.flat().map(f => `
    <div class="card back" style="--c:${c}">
      <div class="small">${f.a} × ${f.b} =</div>
      <div class="a">${f.a * f.b}</div>
      <div class="band bottom"><span>Table de ${t}</span></div>
    </div>`).join('');

  pages += `<div class="sheet"><section class="page">${front}</section></div><div class="sheet"><section class="page">${back}</section></div>`;
}

const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Cartes de multiplication</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; margin: 0; }
  body { font-family: Verdana, 'Segoe UI', Arial, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .sheet { width: 210mm; height: 296mm; break-after: page; page-break-after: always; overflow: hidden; }
  .page { width: 210mm; height: 297mm; padding: 16.5mm 7.5mm; display: grid; grid-template-columns: repeat(3, 65mm); grid-template-rows: repeat(3, 88mm); overflow: hidden; }
  .card { position: relative; width: 65mm; height: 88mm; border: 0.3mm dashed #999; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
  .band { position: absolute; left: 0; right: 0; top: 0; height: 13mm; background: var(--c); color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 4.2mm; letter-spacing: .2mm; }
  .band.bottom { top: auto; bottom: 0; }
  .q { font-weight: 700; font-size: 14.5mm; color: #111; white-space: nowrap; margin-top: 4mm; }
  .small { font-weight: 700; font-size: 7mm; color: #666; margin-bottom: 2mm; white-space: nowrap; }
  .a { font-weight: 700; font-size: 26mm; line-height: 1; color: var(--c); }
</style>
<body>${pages}</body></html>`;

fs.writeFileSync(process.argv[2], html);
