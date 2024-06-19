import { ipcRenderer } from 'electron';

ipcRenderer.on('sysVolVar', (event, text) => {
    document.getElementById('text').innerText = text;
});
