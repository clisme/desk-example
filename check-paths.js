const path = require('path');
const fs = require('fs');

console.log('__dirname:', __dirname);
console.log('Process exec path:', process.execPath);

// 检查不同路径下的文件是否存在
const pathsToCheck = [
  path.join(__dirname, 'dist', 'index.html'),
  path.join(__dirname, '..', 'dist', 'index.html'),
  path.join(process.resourcesPath, 'app', 'dist', 'index.html'),
  path.join(process.resourcesPath, 'dist', 'index.html')
];

pathsToCheck.forEach(p => {
  console.log(`Checking path: ${p}`);
  console.log(`Exists: ${fs.existsSync(p)}`);
});