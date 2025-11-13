// ...existing code...
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const candidates = [
  path.join(projectRoot, 'out'),       // next export
  path.join(projectRoot, '.next'),    // next build (SSR / static)
  path.join(projectRoot, 'public')
];

function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.posix.join(base, e.name);
    if (e.isDirectory()) {
      files = files.concat(walk(full, rel));
    } else if (e.isFile()) {
      const buf = fs.readFileSync(full);
      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      const st = fs.statSync(full);
      files.push({
        path: rel,
        size: st.size,
        mtime: st.mtime.toISOString(),
        sha256: hash
      });
    }
  }
  return files;
}

const existingDirs = candidates.filter(d => fs.existsSync(d) && fs.statSync(d).isDirectory());
if (existingDirs.length === 0) {
  console.error('No build directories found. Checked:', candidates.join(', '));
  process.exit(1);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  scannedDirs: existingDirs.map(d => path.relative(projectRoot, d)),
  files: []
};

for (const d of existingDirs) {
  const base = path.relative(projectRoot, d).replace(/\\/g, '/');
  const files = walk(d, base);
  manifest.files.push(...files);
}

const outBase = existingDirs.find(p => path.basename(p) === 'out') || existingDirs[0];
const outFile = path.join(outBase, 'deploy-manifest.json');

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Wrote deploy manifest:', outFile);