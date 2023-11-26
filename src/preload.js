const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
      ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
    console.log('The Preload file has been loaded.');
}
});