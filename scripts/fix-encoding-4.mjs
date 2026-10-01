import fs from 'fs';
import path from 'path';

const map = {
  'cen?rio':'cenário',
  'cen?rios':'cenários',
  'situa??o':'situação',
  'situa??es':'situações',
  'padr?o':'padrão',
  'padr??o':'padrão',
  'manuten??o':'manutenção',
  'manuten?o':'manutenção',
  'an?lise':'análise',
  'neg?cio':'negócio',
  'neg?cios':'negócios',
  'automa??o':'automação',
  'automa?o':'automação',
  'valida??o':'validação',
  'valida?o':'validação',
  'configura??o':'configuração',
  'configura?o':'configuração',
  'aplica??o':'aplicação',
  'aplica?o':'aplicação',
  'solu??o':'solução',
  'solu?o':'solução',
  'entrada simples':'entrada simples',
  'saída previs?vel':'saída previsível',
  'saída previs?vel':'saída previsível',
  'situa??o':'situação'
};

function walkAndReplace(root) {
  const exts = /\.(md|mdx|txt|html)$/i;
  for (const f of fs.readdirSync(root)) {
    const p = path.join(root, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkAndReplace(p);
    else if (exts.test(f)) {
      let s = fs.readFileSync(p, 'utf8');
      let orig = s;
      for (const [k,v] of Object.entries(map)) {
        const re = new RegExp(k.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&'), 'g');
        s = s.replace(re, v);
      }
      if (s !== orig) {
        fs.writeFileSync(p, s, 'utf8');
        console.log('fixed', p);
      }
    }
  }
}

const targets = [
  path.join(process.cwd(), 'src', 'modules', 'python', 'lessons'),
  path.join(process.cwd(), 'src', 'modules', 'python', 'mini-projetos'),
  path.join(process.cwd(), 'docs')
];
for (const t of targets) {
  if (fs.existsSync(t)) walkAndReplace(t);
}
console.log('done');
