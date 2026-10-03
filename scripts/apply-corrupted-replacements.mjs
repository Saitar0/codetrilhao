import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'modules', 'python', 'lessons');

const mappings = {
  'Dicion?rios':'Dicionários', 'dicion?rios':'dicionários',
  'Estrat?gia':'Estratégia','estrat?gia':'estratégia',
  'Exce??es':'Exceções','exce??es':'exceções',
  'Express?es':'Expressões','express?es':'expressões',
  'Fun??es':'Funções','fun??es':'funções',
  'Heran?a':'Herança','heran?a':'herança',
  'M?todos':'Métodos','m?todos':'métodos',
  'Programa??o':'Programação','programa??o':'programação',
  'Situa??o':'Situação','situa??o':'situação',
  'avan?adas':'avançadas','Avan?adas':'Avançadas',
  'b?sica':'básica','b?sico':'básico','b?sico':'básico','b?sico':'básico',
  'confi?veis':'confiáveis','confi?vel':'confiável','confi?vel':'confiável',
  'Condi??o':'Condição','condi??o':'condição',
  'documenta??o':'documentação','Documenta??o':'Documentação',
  'ent?o':'então','Ent?o':'Então',
  'execut?vel':'executável','execut?vel':'executável',
  'f?cil':'fácil','F?cil':'Fácil',
  'm?nima':'mínima','m?xima':'máxima',
  'n?o':'não','N?o':'Não','N?o':'Não',
  'ou?a':'ouça','ou?a':'ouça',
  'racioc?nio':'raciocínio','racioc?nio':'raciocínio',
  'solu??es':'soluções','Solu??es':'Soluções','solu??o':'solução',
  'tr?s':'três','Tr?s':'Três',
  'avan?adas':'avançadas','avan?adas':'avançadas',
  'Fun??es avan?adas':'Funções avançadas','Fun??es avan?adas':'Funções avançadas',
  'Fun??es embutidas':'Funções embutidas','Fun??es':'Funções'
};

// expand mappings for common duplicates: replace double-? sequences with appropriate letters

// Sort keys by length desc to avoid partial replacements
const keys = Object.keys(mappings).sort((a,b)=>b.length-a.length);

function walk(d){
  const out=[];
  for(const f of fs.readdirSync(d)){
    const p = path.join(d,f);
    if(fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if(/\.(md|mdx|txt)$/i.test(f)) out.push(p);
  }
  return out;
}

const files = walk(dir);
let totalFiles=0, totalReplacements=0;
for(const file of files){
  let txt = fs.readFileSync(file,'utf8');
  let original = txt;
  let fileRepl=0;
  for(const k of keys){
    const v = mappings[k];
    const esc = k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re = new RegExp(esc,'g');
    const before = txt;
    txt = txt.replace(re,v);
    if(txt!==before){
      const diffCount = (before.match(re)||[]).length;
      fileRepl += diffCount;
    }
  }
  if(fileRepl>0){
    fs.writeFileSync(file, txt, 'utf8');
    console.log(`fixed ${file}: ${fileRepl}`);
    totalFiles++;
    totalReplacements += fileRepl;
  }
}
console.log(`done: files modified=${totalFiles}, replacements=${totalReplacements}`);
