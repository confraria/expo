import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const listDir = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listDir(path.join(dir, file), fileList);
    } else {
      if (/\.md$/.test(file)) {
        const src = path.join(dir, file);
        const newSrc = file.replace('.md', '.mdx');
        exec(
          `git filter-branch --tree-filter 'git mv ${src} ${src.replace(
            file.replace('.md', '.mdx')
          )}' -- --all`
        );
        fileList.push({
          oldSrc: src,
          newSrc: path.join(dir, newSrc),
        });
      }
    }
  });

  return fileList;
};

const foundFiles = listDir('./pages');

foundFiles.forEach(f => {
  console.log(`Renamed: ${f.oldSrc} -> ${f.newSrc}`);
  fs.renameSync(f.oldSrc, f.newSrc);
});
