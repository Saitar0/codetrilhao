import fs from 'fs';
import path from 'path';

const replacements = [
  [/ordena\?\?o/gi, 'ordenação'],
  [/organiza\?\?o/gi, 'organização'],
  [/aplica\?\?o/gi, 'aplicação'],
  [/depura\?\?o/gi, 'depuração'],
  [/concorr\?ncia/gi, 'concorrência'],
  [/concorr\?ncia/gi, 'concorrência'],
  [/pr\?tica/gi, 'prática'],
  [/pr\?tico/gi, 'prático'],
  [/l\?gica/gi, 'lógica'],
  [/c\?digo/gi, 'código'],
  [/Ol\?/g, 'Olá'],
  [/Ol\?,/g, 'Olá,'],
  [/Aplica\?o/gi, 'Aplicação'],
  [/aplica\?o/gi, 'aplicação'],
  [/Aplica\?o pr\?tica/gi, 'Aplicação prática'],
  [/Organiza\?o de c\?digo/gi, 'Organização de código'],
  [/Aplica??o/gi, 'Aplicação'],
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
