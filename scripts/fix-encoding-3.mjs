import fs from 'fs';
import path from 'path';

const replacements = [
  [/descri\?o/gi, 'descrição'],
  [/descri\?Ão/gi, 'descrição'],
  [/exerc\?cios/gi, 'exercícios'],
  [/m\?dulos/gi, 'módulos'],
  [/t\?pico/gi, 'tópico'],
  [/padr\?o/gi, 'padrão'],
  [/solu\?o/gi, 'solução'],
  [/s\?o/gi, 'são'],
  [/esta\?/gi, 'está'],
  [/est\?o/gi, 'estão'],
  [/ref\?ncia/gi, 'referência'],
  [/v\?deo/gi, 'vídeo'],
  [/idiom\?/gi, 'idioma'],
  [/exempl\?o/gi, 'exemplo'],
  [/f\?rmula/gi, 'fórmula'],
  [/tem\?tica/gi, 'temática'],
  [/integra\?o/gi, 'integração'],
  [/conte\?do/gi, 'conteúdo'],
  [/aplic\?es/gi, 'aplicações'],
  [/fun\?es/gi, 'funções'],
  [/vari\?veis/gi, 'variáveis'],
  [/opera\?es/gi, 'operações'],
  [/implementa\?o/gi, 'implementação'],
  [/computa\?o/gi, 'computação'],
  [/idiom\?/gi, 'idioma'],
  [/qu\?/gi, 'quê'],
  [/\bOl\?/g, 'Olá'],
  [/Ol\?,/g, 'Olá,'],
  [/\bVoc\?/g, 'Você'],
  [/voc\?/g, 'você'],
  [/sa\?da/g, 'saída'],
  [/l\?gica/g, 'lógica'],
  [/c\?digo/g, 'código'],
  [/pr\?tica/gi, 'prática'],
  [/pr\?tico/gi, 'prático'],
  [/ordena\?o/gi, 'ordenação'],
  [/organiza\?o/gi, 'organização'],
  [/depura\?o/gi, 'depuração'],
  [/concorr\?ncia/gi, 'concorrência'],
];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (/\.(md|mdx|txt|html)$/i.test(f)) {
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
const targets = [
  path.join(start, 'src', 'modules', 'python', 'lessons'),
  path.join(start, 'docs'),
  path.join(start, 'src', 'modules', 'python', 'mini-projetos'),
];
for (const target of targets) {
  if (fs.existsSync(target)) walk(target);
}
console.log('done');
