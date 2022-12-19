const { ipcRenderer } = require('electron');

console.log('The Preload file has been loaded.');

function init() {
	window.isElectron = true;
	window.ipcRenderer = ipcRenderer;
	window.Boolean = true;
}

init();
