import fs from 'fs/promises';
import path from 'path';

const lessonsDir = path.resolve('src/modules/python/lessons');

async function fixFile(file) {
  const p = path.join(lessonsDir, file);
  let txt = await fs.readFile(p, 'utf8');
  const lines = txt.split(/\r?\n/);
  let changed = false;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const m = lines[i].match(/^titulo:\s*"([^"]*)"(.*)$/);
    if (m && m[2] && m[2].trim().length > 0) {
      lines[i] = `titulo: "${m[1]}"`;
      changed = true;
    }
  }
  if (changed) {
    await fs.writeFile(p, lines.join('\n'), 'utf8');
    console.log('Fixed', file);
  }
}

async function main() {
  const files = await fs.readdir(lessonsDir);
  const mdx = files.filter(f => f.endsWith('.mdx'));
  for (const f of mdx) {
    try {
      await fixFile(f);
    } catch (e) {
      console.error('ERR', f, e.message);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
