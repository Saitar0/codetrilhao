import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'modules', 'python', 'lessons');
const files = [];
function walk(d){
  for(const f of fs.readdirSync(d)){
    const p = path.join(d,f);
    if(fs.statSync(p).isDirectory()) walk(p);
    else if(/\.(md|mdx|txt)$/i.test(f)) files.push(p);
  }
}
walk(dir);
const set = new Set();
for(const f of files){
  const txt = fs.readFileSync(f,'utf8');
  const re = /\b[^\s]*\?[^\s]*\b/g;
  let m;
  while((m=re.exec(txt))){
    set.add(m[0]);
  }
}
console.log([...set].sort().join('\n'));
