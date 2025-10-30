const { app, BrowserWindow, ipcMain } = require('electron/main')
const fs = require('fs')
const path = require('path')

let mainWindow;
let watchFiles = {};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'MyElectronApp'
  })

  // 在开发模式下使用Vite服务器，生产模式下加载本地文件
  if (!app.isPackaged) {
    // 尝试加载Vite开发服务器
    mainWindow.loadURL('http://localhost:5173').catch(e => {
      console.log('Failed to load from Vite dev server, falling back to local build', e);
      // 检查是否存在构建的文件
      const distIndexPath = path.join(__dirname, 'dist', 'index.html');
      if (fs.existsSync(distIndexPath)) {
        // 如果存在构建的文件，则加载它们
        mainWindow.loadFile('dist/index.html');
      } else {
        console.log('No built files found. Please run "npm run build" first.');
        // 显示一个简单的错误页面
        mainWindow.loadFile('index.html');
      }
    });
    // 启用热重载
    enableHotReload()
  } else {
    // 生产模式下加载打包后的文件
    // 检查dist目录中的文件
    const distIndexPath = path.join(__dirname, 'dist', 'index.html');
    
    if (fs.existsSync(distIndexPath)) {
      console.log('Loading from dist directory');
      mainWindow.loadFile(distIndexPath);
    } else {
      console.error('Cannot find dist/index.html in production');
      console.error('Please run "npm run build" before packaging the app');
      
      // 尝试加载本地开发文件作为最后的后备方案
      const localIndexPath = path.join(__dirname, 'index.html');
      if (fs.existsSync(localIndexPath)) {
        console.log('Falling back to local development files');
        mainWindow.loadFile(localIndexPath);
      } else {
        console.error('Cannot find index.html either');
        // 显示错误信息
        mainWindow.webContents.executeJavaScript(`
          document.body.innerHTML = '<h1>Error: Application files not found</h1><p>Please run "npm run build" before packaging.</p>';
        `);
      }
    }
  }
}

function enableHotReload() {
  // 监视的文件和目录
  const watchPaths = [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'main.js'),
    path.join(__dirname, 'views')
  ];

  watchPaths.forEach(filePath => {
    fs.watchFile(filePath, { interval: 1000 }, () => {
      console.log(`File ${filePath} changed, reloading...`);
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.reload();
      }
    });
    
    watchFiles[filePath] = true;
  });
  
  // 当窗口关闭时停止监视
  mainWindow.on('closed', () => {
    Object.keys(watchFiles).forEach(filePath => {
      fs.unwatchFile(filePath);
    });
    watchFiles = {};
  });
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})