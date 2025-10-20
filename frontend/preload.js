// preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Pode expor funções aqui depois, ex:
  // sendMessage: (msg) => ipcRenderer.send('message', msg)
});
