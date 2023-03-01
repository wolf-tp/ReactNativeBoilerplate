const { execSync } = require('child_process');
const fs = require('fs');
const { existPath, buffetToValue } = require('./common');

const args = process.argv.slice(2);

process.on('uncaughtException', function (err) {
  console.error('\x1b[31m', 'Error:', err);
});

const folderGenerate = args?.[0];

if (!folderGenerate) throw 'Please input folder for generate index';
if (!existPath(folderGenerate)) throw 'Folder not found';
if (
  existPath(folderGenerate + '/index.ts') ||
  existPath(folderGenerate + '/index.tsx')
)
  throw 'Folder already contain index file';

process.chdir(folderGenerate);

const listFileNameBuff = execSync(`find . -type f -maxdepth 1 -name '*.ts*'`);
/**@type {string[]} */
const listFile = buffetToValue({
  buf: listFileNameBuff,
});

fs.writeFileSync(
  'index.ts',
  listFile
    .map(fileName => {
      const fileWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
      return `export * from '${fileWithoutExtension}'`;
    })
    .join('\n'),
);
console.log(
  '\x1b[32m',
  `Created index file successfully\n Check: ${folderGenerate}/index.ts`,
);
