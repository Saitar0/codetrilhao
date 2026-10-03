import fs from 'fs';
import path from 'path';

const lessonsDir = path.join(process.cwd(), 'src', 'modules', 'python', 'lessons');
const configPath = path.join(process.cwd(), 'src', 'modules', 'python', 'config.ts');

function slugify(s){
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g,'')
    .trim()
    .replace(/[\s_]+/g,'-')
    .replace(/-+/g,'-')
}

const files = fs.readdirSync(lessonsDir).filter(f=>f.endsWith('.mdx'));
const changes = [];
for(const file of files){
  const full = path.join(lessonsDir, file);
  const txt = fs.readFileSync(full,'utf8');
  const fmMatch = txt.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if(!fmMatch) continue;
  const fm = fmMatch[1];
  const body = txt.slice(fmMatch[0].length);
  const h2Count = (body.match(/^##\s+/gm)||[]).length;
  if(h2Count < 2) continue; // only split longer lessons

  // split into parts: keep any intro before first ## as intro
  const parts = [];
  const introMatch = body.match(/^[\s\S]*?(?=^##\s+)/m);
  if(introMatch && introMatch[0].trim()){
    parts.push({title:'Introdução', content:introMatch[0]});
  }
  const sections = body.split(/^##\s+/m).slice(1);
  for(const sec of sections){
    const firstLine = sec.split(/\r?\n/)[0].trim();
    const content = '## ' + sec;
    parts.push({title: firstLine, content});
  }

  if(parts.length < 2) continue;

  const base = file.replace(/\.mdx$/,'');
  const origTitleMatch = fm.match(/titulo:\s*(?:"|')?(.+?)(?:"|')?\s*$/m);
  const origTitle = origTitleMatch ? origTitleMatch[1] : base;

  const newSlugs = [];
  parts.forEach((p, idx)=>{
    const slug = idx===0 ? `${base}-introducao` : `${base}-${slugify(p.title)}`;
    const newFile = path.join(lessonsDir, `${slug}.mdx`);
    const newFm = fm.replace(/titulo:\s*(?:"|')?(.+?)(?:"|')?/m, `titulo: "${p.title.replace(/"/g,'') }"`)
      .replace(/ordem:\s*\d+/m, (m)=>m) // keep ordem
    ;
    const out = `---\n${newFm}\n---\n\n${p.content}\n`;
    fs.writeFileSync(newFile, out, 'utf8');
    newSlugs.push(slug);
    console.log(`created ${newFile}`);
  });

  // replace original file with index linking to new parts
  const indexContent = ['---', fm, '---', '', `# ${origTitle} — índice`, '', 'Escolha uma aula:', '']
    .concat(newSlugs.map(s=>`- [${s.replace(/[-]/g,' ')}](/python/${s})`))
    .join('\n') + '\n';
  fs.writeFileSync(full, indexContent, 'utf8');
  console.log(`rewrote index ${full}`);
  changes.push({base, newSlugs});
}

if(changes.length===0){
  console.log('no files to split');
  process.exit(0);
}

// update config.ts: insert new slugs after original occurrence
let config = fs.readFileSync(configPath,'utf8');
for(const c of changes){
  const orig = c.base;
  const insert = c.newSlugs.map(s=>`'${s}'`).join(', ');
  // find pattern 'orig' in lessons array and replace with 'orig', 'a','b'
  const re = new RegExp("'"+orig.replace(/[-]/g,'\\-')+"'","g");
  config = config.replace(re, `'${orig}', ${insert}`);
}
fs.writeFileSync(configPath, config, 'utf8');
console.log('updated config.ts');

// git add and commit
try{
  const {execSync}=await import('child_process');
  execSync('git add src/modules/python/lessons/*.mdx src/modules/python/config.ts');
  execSync('git commit -m "chore(python): split long lessons into subpages"');
  console.log('committed changes');
}catch(e){
  console.error('git commit failed', e.message);
}
