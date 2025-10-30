console.log('Preload script loaded');

const { contextBridge, ipcRenderer } = require('electron')

console.log('Exposing versions to window');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
})

console.log('Versions exposed successfully');