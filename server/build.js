const { copyFileSync } = require('fs');
const { join } = require('path');

const files = ['package.json', 'package-lock.json'];
const target = join(__dirname, '..', 'build', 'server');

files.forEach((file) => {
  const from = join(__dirname, file);
  const to = join(target, file);
  copyFileSync(from, to);
});
