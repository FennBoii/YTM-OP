/* eslint-disable max-len */

console.log('The Settings injector has been loaded.');

// const { ipcRenderer } = require('electron');

const icon = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="true" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.1-1.65c.2-.15.25-.42.13-.64l-2-3.46c-.12-.22-.4-.3-.6-.22l-2.5 1c-.52-.4-1.08-.73-1.7-.98l-.37-2.65c-.06-.24-.27-.42-.5-.42h-4c-.27 0-.48.18-.5.42l-.4 2.65c-.6.25-1.17.6-1.7.98l-2.48-1c-.23-.1-.5 0-.6.22l-2 3.46c-.14.22-.08.5.1.64l2.12 1.65c-.04.32-.07.65-.07.98s.02.66.06.98l-2.1 1.65c-.2.15-.25.42-.13.64l2 3.46c.12.22.4.3.6.22l2.5-1c.52.4 1.08.73 1.7.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.6-.25 1.17-.6 1.7-.98l2.48 1c.23.1.5 0 .6-.22l2-3.46c.13-.22.08-.5-.1-.64l-2.12-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" class="style-scope yt-icon"></path></g></svg>';

window.addEventListener('yt-popup-opened', () => {
	const settingsMenu = document.querySelector('body > ytmusic-app > ytmusic-popup-container > tp-yt-iron-dropdown');

	console.log('Popup opened!');

	if (!settingsMenu) return;

	const settingSubcategory = settingsMenu.querySelector('#sections > yt-multi-page-menu-section-renderer:nth-child(2) > #items');
	const settingsButton = settingSubcategory.querySelector('ytd-compact-link-renderer:nth-child(3)');
	// console.log(generalButton.querySelector('yt-formatted-string').innerText);

	if (settingsButton.querySelector('#label').innerText !== 'Settings') return;

	const clientSettingsButton = settingsButton.cloneNode(true);

	settingSubcategory.insertBefore(clientSettingsButton, settingSubcategory.querySelector('ytd-compact-link-renderer:nth-child(4)'));

	const clientSettingsButtonAnchorNode = clientSettingsButton.querySelector('a');

	clientSettingsButtonAnchorNode.childNodes.forEach(e => {
		clientSettingsButton.appendChild(e.cloneNode(true));
	});

	clientSettingsButton.removeChild(clientSettingsButtonAnchorNode);
	clientSettingsButton.querySelector('#label').innerHTML = 'Client Settings';
	clientSettingsButton.querySelector('#label').classList.remove('is-empty');
	clientSettingsButton.querySelector('#content-icon > yt-icon').innerHTML = icon;

	clientSettingsButton.addEventListener('click', () => {
		document.querySelector('html').click();
		console.log('Client Settings clicked');

		// ipcRenderer.sendSync('settings-clicked', true);
	});
});
