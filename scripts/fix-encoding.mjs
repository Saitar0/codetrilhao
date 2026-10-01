import fs from 'fs';
import path from 'path';

const replacements = [
  [/Voc\?/g, 'Você'],
  [/voc\?/g, 'você'],
  [/o que \? python/gi, 'o que é Python'],
  [/o que \?/gi, 'o que é'],
  [/c\?digo/g, 'código'],
  [/sa\?da/g, 'saída'],
  [/l\?gica/g, 'lógica'],
  [/t\?pico/g, 'tópico'],
  [/ordem:\s*\?/g, 'ordem: ?'],
  [/\? /g, 'é '],
];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (/\.(md|mdx|txt)$/i.test(f)) {
      let txt = fs.readFileSync(p, 'utf8');
      let orig = txt;
      for (const [pat, rep] of replacements) txt = txt.replace(pat, rep);
      if (txt !== orig) {
        fs.writeFileSync(p, txt, 'utf8');
        console.log('fixed', p);
      }
    }
  }
}

const start = process.cwd();
const target = path.join(start, 'src', 'modules', 'python', 'lessons');
if (!fs.existsSync(target)) {
  console.error('target not found', target);
  process.exit(1);
}
walk(target);
console.log('done');
