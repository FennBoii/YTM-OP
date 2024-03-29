/* eslint-disable no-inline-comments */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* ---------------------------------DEFINE BEFORE RUN--------------------------------- */
const DiscordRPC = require('discord-rpc');
const {
	app,
	BrowserWindow,
	Menu,
	nativeImage,
	ipcMain,
	webContents,
	clipboard
} = require('electron');
const path = require('path');
const loudness = require('loudness');
const fs = require('fs');
const dataPath = app.getPath('userData');
const {
	spawn
} = require('child_process').exec;
const generalConfigPath = path.join(dataPath, 'conf.json');
/* ---------------------------------RUN FUNCTIONS--------------------------------- */
LETITREAD();
soundDevices();
/* ---------------------------------DEFINE FUNCTIONS--------------------------------- */
var port = 8008;
var systemVolume = 0;
var host = "127.0.0.1";
var ToggleButtons = true;
var ChannelToggle = true;
var TogglePlaylist = true;
var ToggleArtist = true;
var volume = 0;
var artist;
var titleTwo = '';
var detailsTwo = '- Loading -';
var stateTwo = '- Loading -';
var ConnectDis = ' [ Disconnected ]';
var detailsThree = 'Default';
var channel = 'https://google.com';
var error_bool = false;
var fennec = 'https://';
var PlaylistCounter = '';
var ConnectionTitle = '';
var RealCountdown;
var CountdownTime;
var secondTitle = true;
var thirdTitle = true;
var textView = false;
var paused;
var isFirst;
var imageicon;
var repeat;
var playlist;
var channelname;
var Explicit;
var join1;
var join2;
var timeNow;
var timeMax;
var notPlayingDisconnect;
var notPlayingDisconnectText = "";
var buttonOne = false;
var buttonTwo = false;
var buttonThree = false;
var buttonFour = false;
var username;
var warningText = '';
var getNAME;
var TitleExit = '';
var quitText = '';
var connectCounter = 1;
var RealCountdownTitleBar = '';
var CountdownTimerVar = false;
var sysVol;
var mainWindow;
var LICKCHeck = '';
	// [ ------------------------------------------------------- ]
	// [ ------------------------------------------------------- ]

	// var VersionNumber = `Volume is: ${volume}`; // 'Updated(v3.3.1 - 18:12 - 03-13-2022);';

	// [ ------------------------------------------------------- ]
	// [ ------------------------------------------------------- ]

	// function execute("./getCurrentVol.exe", callback){
	//     exec(command, function(error, stdout, stderr){ callback(stdout); });
	// };

	async function soundDevices() {
		const vol = await loudness.getVolume();
		sysVol = vol;
	}

// LoopAudioGet(); // WIN AUDIO GET
// function LoopAudioGet() {
// 	sysVol = winAudio.speaker.get();
// 	setTimeout(LoopAudioGet, 500);
// }

try {
	JSON.parse(fs.readFileSync(generalConfigPath));
} catch (ex) {
	if (fs.existsSync(generalConfigPath)) {
		fs.unlinkSync(generalConfigPath);
	}
	fs.writeFileSync(generalConfigPath, JSON.stringify({}));
}

const config = JSON.parse(fs.readFileSync(generalConfigPath));
if (!config.continueWhereLeftOf || typeof config.continueWhereLeftOf !== 'boolean') config.continueWhereLeftOf = true;
if (config.continueURL || typeof config.continueURL !== 'string') config.continueURL = 'https://music.youtube.com/';

let reconnectTimer, injected;

const resourcePath = process.platform === 'darwin' ? 'Contents/Resources' : 'resources ]';

function executeJavaScript(code) {
	return new Promise(resolve => {
		win.webContents.executeJavaScript(code).then(data => resolve(data));
	});
}


function LETITREAD() {
	fs.readFile('src\\username.txt', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		var CONNECTBOTH = ('[ Welcome back, ' + data + ' ]')
		getNAME = CONNECTBOTH;
	});
}

function SETITSNAME() {
	console.log('-- Welcome Back ' + getNAME + ' --');
}

process.stdout.write('\x1Bc');
setTimeout(SETITSNAME, 600);


let win, settingsWin;
const menuTemplate = [{
		label: 'Utils',
		submenu: [{
				label: 'Not Playing Disconnect',
				click() {
					if (notPlayingDisconnect == true) {
						notPlayingDisconnect = false;
						notPlayingDisconnectText = "";
					} else {
						notPlayingDisconnect = true;
						notPlayingDisconnectText = " [ PausDiscon Enabled ]";
					}
				},
			},
			{
				label: 'Connection',
				submenu: [{
						label: '-- Connect --',
						click() {
							if (connectCounter == 0) {
								reconnect();
								ConnectDis = ' [ Connected ]';
								error_bool = false;
								connectCounter += 1;
							}
							if (connectCounter == 1) {
								console.log('NO!')
							}
						},
						accelerator: 'Ctrl+Alt+1',
					},
					{
						label: '-- Disconnect --',
						click() {
							error_bool = true;
							rpc.destroy();
							ConnectDis = ' [ Disconnected ]';
							connectCounter -= 1;
						},
						accelerator: 'Ctrl+Alt+2',
					},
					{
						label: 'Reset RPC Connection',
						click() {
							setTimeout(DiscordDisconnect, 0);
							setTimeout(DiscordConnect, 100);
						},
					},
				],
			},
			{
				label: 'On End Power Options',
				submenu: [{
						label: 'Quit Application',
						click() {
							if (buttonOne == false) {
								buttonOne = true;
								buttonTwo = false;
								buttonThree = false;
								buttonFour = false;
								TitleExit = ' [ -- 𝑪𝑳𝑶𝑺𝑰𝑵𝑮 𝑨𝑷𝑷𝑳𝑰𝑪𝑨𝑻𝑰𝑶𝑵 𝑶𝑵 𝑬𝑵𝑫 -- ]';
								CountdownTimerVar = true;
								quitText = 'quitting app';
							} else {
								buttonOne = false;
								TitleExit = '';
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: 'Sleep PC',
						click() {
							if (buttonTwo == false) {
								buttonOne = false;
								buttonTwo = true;
								buttonThree = false;
								buttonFour = false;
								TitleExit = ' [ -- 𝑺𝑳𝑬𝑬𝑷𝑰𝑵𝑮 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]';
								CountdownTimerVar = true;
								quitText = 'sleeping pc';
							} else {
								buttonTwo = false;
								TitleExit = '';
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: 'Restart PC',
						click() {
							if (buttonThree == false) {
								buttonOne = false;
								buttonTwo = false;
								buttonThree = true;
								buttonFour = false;
								TitleExit = ' [ -- 𝑹𝑬𝑺𝑻𝑨𝑹𝑻𝑰𝑵𝑮 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]';
								CountdownTimerVar = true;
								quitText = 'restarting pc';
							} else {
								buttonThree = false;
								TitleExit = '';
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: 'Shutdown PC',
						click() {
							if (buttonFour == false) {
								buttonOne = false;
								buttonTwo = false;
								buttonThree = false;
								buttonFour = true;
								TitleExit = ' [ -- 𝑺𝑯𝑼𝑻𝑻𝑰𝑵𝑮 𝑫𝑶𝑾𝑵 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]';
								CountdownTimerVar = true;
								quitText = 'shutting down pc'
							} else {
								buttonFour = false;
								TitleExit = '';
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: 'Toggle Off',
						click() {
							buttonOne = false;
							buttonTwo = false;
							buttonThree = false;
							buttonFour = false;
							TitleExit = '';
							CountdownTimerVar = false;
						},
					},
				]
			},
			{
				label: 'Buttons',
				submenu: [
					// {
					// 	label: '- Button Stats -',
					// 	label:	PlaylistCounter,
					// },
					{
						label: 'ToggleButtonsOn',
						click() {
							ToggleButtons = true;
							ToggleArtist = true;
							TogglePlaylist = true;
							secondTitle = true;
							thirdTitle = true;
						},
					},
					{
						label: 'ToggleButtonsOff',
						click() {
							ToggleButtons = false;
							ToggleArtist = false;
							TogglePlaylist = false;
							secondTitle = false;
							thirdTitle = false;
						},
					},
					{
						label: 'TogglePlaylist',
						click() {
							if (TogglePlaylist === true) {
								TogglePlaylist = false;
								ToggleButtons = false;
								secondTitle = false;
							} else {
								TogglePlaylist = true;
								ToggleButtons = true;
								secondTitle = true;
							}
						},
					},
					{
						label: 'ToggleArtist',
						click() {
							if (ToggleArtist === true) {
								ToggleArtist = false;
								ToggleButtons = false;
								thirdTitle = false;
							} else {
								ToggleArtist = true;
								ToggleButtons = true;
								thirdTitle = true;
							}
						},
					},
					{
						label: 'ToggleChannel',
						click() {
							if (ChannelToggle === true) {
								ChannelToggle = false;
							} else {
								ChannelToggle = true;
							}
						},
					},
				]
			},
			{
				label: 'Incoming Connections',
				submenu: [{
						label: 'None',
						click() {
							ConnectionTitle = ''
						},
					},
					{
						label: 'Sending',
						click() {
							ConnectionTitle = '[ -- Sending -- ]'

						},
					},
					{
						label: 'Recieving',
						click() {
							ConnectionTitle = '[ -- Recieving -- ]'
							// storeValues.get('/stream', (req, res) => {
							// 	const ffmpegCommand = "ffmpeg";
							// 	var ffmpegOptions =
							// 		"-f s16le -ar 48000 -ac 2 -i udp://127.0.0.1:65535 -f wav -";

							// 	var ffm = children.spawn(ffmpegCommand, ffmpegOptions.split(" "));

							// 	res.writeHead(200, {
							// 		"Content-Type": "audio/wav; codecs=PCM"
							// 	});
							// 	ffm.stdout.pipe(res);
							// });
						},
					}
				],
			},
			{
				label: 'Confirm Connection',
				click() {
					console.log('Connected');
					if (ConnectionTitle = 'None') {
						// storeValues.listen(port, host, () => {
						// 	console.log("Server running at http://" + host + ":" + port + "/");
						// });
					}
					if (ConnectionTitle = '[ -- Sending -- ]') {

					}
					if (ConnectionTitle = '[ -- Recieving -- ]') {

					}
				},
			},
			// {
			// 	label: 'Some Checks',
			// 	submenu: [{
			// 			label: 'Full Sync Check',
			// 			click() {
			// 				fullSync();
			// 			},
			// 		},
			// 		{
			// 			label: 'Check',
			// 			click() {

			// 			},
			// 		},
			// 		{
			// 			label: 'CheckExistsNormal',
			// 			click() {
			// 				if (typeof (NormalElement) != 'undefined' && element != null) {
			// 					alert('Element exists');
			// 				} else {
			// 					alert('Element does not exist');
			// 				}
			// 			},
			// 		},
			// 		{
			// 			label: 'CheckExistsChannelToggle',
			// 			click() {
			// 				if (typeof (ChannelMutatedElement) != 'undefined' && element != null) {
			// 					alert('Element exists');
			// 				} else {
			// 					alert('Element does not exist');
			// 				}
			// 			},
			// 		},
			// 	],
			// },
			{
				label: 'Extra',
				submenu: [{
						role: 'Reload'
					},
					{
						type: 'separator'
					},
					{
						role: 'toggledevtools'
					},
					{
						type: 'separator'
					},
					{
						role: 'minimize'
					},
					{
						type: 'separator'
					},
					{
						role: 'undo'
					},
					{
						role: 'redo'
					},
					{
						type: 'separator'
					},
					{
						role: 'cut'
					},
					{
						role: 'copy'
					},
					{
						role: 'paste'
					},
					{
						type: 'separator'
					},
					{
						role: 'quit',
						accelerator: 'Ctrl+Q',
					},
					{
						type: 'separator'
					},
					{
						label: 'Copy CoverImageURL',
						click() {
							clipboard.writeText(fennec);
						},
					},
				]
			},
		],
	},
	{
		label: 'Go Back',
		click() {
			win.webContents.goBack();
		},
	}, {
		label: 'Go Forward',
		click() {
			win.webContents.goForward();
		},
	},
	{
		label: 'Get Current URL',
		click() {
			const TheUrlUwU = win.webContents.getURL();
			clipboard.writeSync(TheUrlUwU);
		},
	},
	{
		label: 'Go to YTM homepage',
		click() {
			win.loadURL("https://music.youtube.com/");
		},
	},
];

// // Get the current volume
// function getCurrentVolume() {
// 	var getVOL = spawn('powershell.exe', [
// 		`Get-CimInstance -ClassName Win32_Volume | Where-Object { $_.VolumeName -eq 'C:\\' } | Select-Object -ExpandProperty DriveLetter`
// 	]);

// 	getVOL.stdout.on('data', data => {
// 		const currentVolume = data.toString().trim(); // Note: This will be a letter (like "C") not a percentage
// 		console.log(`Current volume drive letter: ${currentVolume}`);
// 		sysVol = currentVolume;
// 	});

// 	getVOL.stderr.on('data', error => {
// 		console.error(`Error: ${error}`);
// 	});
// }

var NormalElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)').text";
var ChannelMutatedElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)').text";

var theElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)').href";

function DiscordConnect() {
	reconnect();
}

function DiscordDisconnect() {
	rpc.destroy();
	ConnectDis = ' [ Disconnected ]';
}

if (process.platform === 'win64') {
	menuTemplate.unshift({});
}

function createSettingsWindow() {
	settingsWin = new BrowserWindow({
		width: 800,
		height: 700,
		webPreferences: {
			preload: path.join(process.cwd(), 'src', 'preload.js'),
		},
	});
	settingsWin.setMinimumSize(300, 300);
	settingsWin.setResizable(true);
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
	settingsWin.setMenuBarVisibility(true);
}

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		icon: 'resources/assets/images/Youtube-Music-logo.png',
		webPreferences: {
			preload: path.join(process.cwd(), 'src', 'preload.js'),
		},
	});
	win.setMinimumSize(300, 300);
	win.setResizable(true);
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
	win.setMenuBarVisibility(true);
	// win.webContents.openDevTools();

	win.on('close', async () => {
		let tempInfo = await getContent().catch(console.log);
		// eslint-disable-next-line no-unused-vars
		var {
			time
		} = tempInfo || {
			time: 1,
			paused: undefined,
		};

		fs.writeFile('src/LINK.txt', win.webContents.getURL().toString(), err => {
			if (err) {
				// console.error('Error writing to file:', err);
				LICKCHeck = 'uwu';
			} else {
				// console.log('File written successfully!');
				LICKCHeck = 'owo';
			}
		});
	});
	win.on('closed', () => {
		rpc.destroy();
		ConnectDis = ' [ Disconnected ]';
		win = null;
	});
	win.on('page-title-updated', (e, title) => {
		win.setTitle(`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${getNAME}`); // Added 'PageTitleReload' function for constant reload
		BrowserWindow.title = "owo";
		e.preventDefault();
	});

	win.webContents.on('dom-ready', settingsHook);
	win.webContents.on('will-prevent-unload', e => e.preventDefault());

	win.loadURL("https://music.youtube.com/");

	// win.loadURL(config.continueURL, {
	// 	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
	// });

	if (!config.continueWhereLeftOf) return;

	win.webContents.once('media-started-playing', async () => {
		await executeJavaScript('document.querySelector(\'#play-pause-button\').click();').catch(console.log);
	});
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
	fs.writeFileSync(generalConfigPath, JSON.stringify(config, null, '\t'));
	app.quit();
});
app.on('will-quit', () => {
	fs.writeFileSync(generalConfigPath, JSON.stringify(config, null, '\t'));
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});

async function settingsHook() {
	if (injected) return;

	// eslint-disable-next-line max-len
	await executeJavaScript(fs.readFileSync(path.join(process.cwd(), 'src', 'settingsInjection.js')).toString().replaceAll('\r', ''));
	injected = true;
}

ipcMain.on('left-of-checked', (event, checked) => {
	console.log(checked);
	console.log('log_two');
	config.continueWhereLeftOf = checked;

	if (checked === true) {
		config.continueURL = 'https://music.youtube.com/';
	}

	event.returnValue = undefined;
});

ipcMain.on('get-left-of-checked', event => {
	event.returnValue = config.continueWhereLeftOf;
});

ipcMain.on('settings-clicked', () => {
	createSettingsWindow();
});

function getContent() {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		var title,
			playlistname,
			result;

		result = await executeJavaScript('document.querySelector(\'div.content-info-wrapper yt-formatted-string.title\').title;');
		if (!result) return '- d e p r e s s i o n -';
		title = result;
		titleTwo = title;

		result = await executeJavaScript('document.querySelector(\'span.subtitle yt-formatted-string.byline\').title;');
		if (!result) artist = 'none';
		artist = result.split(' • ');

		result = await executeJavaScript('document.querySelector(\'#progress-bar\').getAttribute(\'aria-valuenow\');');
		if (!result) return reject('Error grabbing time now');
		timeNow = result;

		result = await executeJavaScript('document.querySelector(\'#progress-bar\').getAttribute(\'aria-valuemax\');');
		if (!result) return reject('Error grabbing time max');
		timeMax = result;

		result = await executeJavaScript('document.querySelector(\'#play-pause-button\').title;');
		if (!result) return reject('Error grabbing play status');
		paused = result !== 'Pause';

		isFirst = true;

		result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img\').src');
		if (!result) return reject('Error grabbing imageicon status');
		imageicon = result;

		result = await executeJavaScript('document.querySelector(\'#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar\').title;');
		if (!result) return reject('Error grabbing repeat status');
		repeat = result;

		// Playlist Link
		if (TogglePlaylist === true) {
			result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').href');
			playlist = result;
		}
		if (TogglePlaylist === false) {
			result = 'https://google.com';
			playlist = result;
		}

		// Playlist Name
		if (TogglePlaylist === true) {
			result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').text');
			playlistname = result;
		}
		if (TogglePlaylist === false) {
			result = 'false';
			playlistname = result;
		}

		// result = await executeJavaScript('document.querySelector(\'input#input.style-scope.ytmusic-search-box\').value');
		// if (!result) return reject('No Search About');
		// searchAbout = result;

		var theElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)').textContent"

		if (ChannelToggle === true) {
			result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)\').href');
			//if (!result) await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)\').textContent')
			channel = result;
		}
		if (ChannelToggle === false) {
			result = "https://thisxdoesnotexist.com/"
			channel = result;
		}

		result = await executeJavaScript('document.querySelector(\'#badges.ytmusic-player-bar\').children.length');
		// if (!result) console.log('Error getting Explicit Status);
		Explicit = result;

		if (ChannelToggle === true) {
			result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)\').innerText');
			channelname = result;
		} else if (ChannelToggle === false) {
			result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)\').textContent');
			channelname = result;
			ToggleArtist = false;
			TogglePlaylist = false;
			ToggleButtons = false;
		}

		result = await executeJavaScript('document.querySelector(\'#sliderBar\').value');
		if (!result) volume = 0;
		volume = result;

		// result = await executeJavaScript('document.getElementById(\'share-url\').value');
		// if (!result) return '- d e p r e s s i o n -';
		// button = result;

		// result = await executeJavaScript('document.querySelector(\'yt-icon, .yt-icon-container.yt-icon\').active');
		// if (!result) console.log('error getting result');
		// Explicit = result;;

		// REJECTS STOP THE ENTIRE PROCESS BUT CONSOLE.LOG(win.catch(console.error)) STATEMENTS WILL KEEP IT GOING WITH JUST A LOG
		// DEFINE YOUR VARS HERE:
		// let Attribute1;
		// let Attribute2;

		// Put your custom CSS changes here, make sure to use '\' elements ---->
		// Make sure to add this: '	if (!result) return 'win.catch(console.error)'; ' at the bottom of every entry.
		// result = await executeJavaScript('document.querySelector(\'ytmusic-detail-header-renderer\').style.backgroundColor = \'#200077\'');
		// if (!result) return 'win.catch(console.error)';
		// Attribute1 = result;

		// result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar\').style.backgroundColor = \'rgb(90, 9, 135)\'');
		// if (!result) return 'win.catch(console.error)';
		// Attribute2 = result;

		// <---- Custom CSS Ends Here

		if (TogglePlaylist === false & ToggleArtist === false) {
			PlaylistCounter = 'playlist = false, artist = false';
		}
		if (TogglePlaylist === true & ToggleArtist === false) {
			PlaylistCounter = 'playlist = true, artist = false';
		}
		if (TogglePlaylist === false & ToggleArtist === true) {
			PlaylistCounter = 'playlist = false, artist = true';
		}
		if (TogglePlaylist === true & ToggleArtist === true) {
			PlaylistCounter = 'playlist = true, artist = true';
		}

		var timeMaxMinus = timeMax - 3;
		CountdownTime = timeMax - timeNow;
		RealCountdown = CountdownTime - 3;

		if (CountdownTimerVar == true) {
			RealCountdownTitleBar = ' [ Countdown Till End: ' + RealCountdown + ' ]';
		}

		if (CountdownTimerVar == false) {
			RealCountdownTitleBar = '';
		}

		if (buttonFour == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = ' [ Disconnected ]';
				var exec = require('child_process').exec;

				exec('shutdown /s /f /t 0',
					function (error, stdout, stderr) {
						console.log('stdout: ' + stdout);
						console.log('stderr: ' + stderr);
						if (error !== null) {
							console.log('exec error: ' + error);
						}
					});
				app.quit();
				console.log('SHUTDOWN TIME');
			}
		}

		if (buttonThree == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = ' [ Disconnected ]';
				var exec = require('child_process').exec;

				exec('shutdown /r /t 50',
					function (error, stdout, stderr) {
						console.log('stdout: ' + stdout);
						console.log('stderr: ' + stderr);
						if (error !== null) {
							console.log('exec error: ' + error);
						}
					});
				app.quit();
				console.log('REBOOT TIME');
			}
		}

		if (buttonTwo == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = ' [ Disconnected ]';
				var exec = require('child_process').exec;

				exec('rundll32.exe powrprof.dll, SetSuspendState Sleep',
					function (error, stdout, stderr) {
						console.log('stdout: ' + stdout);
						console.log('stderr: ' + stderr);
						if (error !== null) {
							console.log('exec error: ' + error);
						}
					});
				app.quit();
				console.log('SLEEP TIME');
			}
		}

		if (buttonOne == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = ' [ Disconnected ]';
				if (timeNow == timeMaxMinus) {
					app.quit();
				}
				console.log('QUIT TIME');
			}
		}

		let Dash = '';
		join1 = Dash + channelname + Dash;
		join2 = Dash + playlistname + Dash;

		// var newPlaylist = playlistname.split('music.')[1];
		// var playlistnameTwo = `https://music.${newPlaylist}`;
		// console.log(playlistnameTwo);

		var expanse0 = '-------------------------------------------';
		var expanse1 = '-------------------------------------------';
		var expanse2 = '-';
		var expanse3 = '-';
		var expanse4 = '-------------------------------------------';

		// Create Element Section
		if (textView === true) {
			document.createElement('textarea');
		}
		return resolve({
			LICKCHeck,
			systemVolume,
			getNAME,
			RealCountdownTitleBar,
			ConnectionTitle,
			ConnectDis,
			stateTwo,
			titleTwo,
			TitleExit,
			username,
			buttonOne,
			buttonTwo,
			buttonThree,
			buttonFour,
			CountdownTime,
			RealCountdown,
			timeMaxMinus,
			expanse0,
			PlaylistCounter,
			secondTitle,
			thirdTitle,
			stateTwo,
			error_bool,
			detailsTwo,
			detailsThree,
			title,
			titleTwo,
			expanse1,
			ToggleButtons,
			expanse2,
			TogglePlaylist,
			expanse3,
			ToggleArtist,
			expanse4,
			artist,
			time: [timeNow, timeMax],
			paused,
			isFirst,
			imageicon,
			repeat,
			channel,
			playlist,
			fennec,
			Explicit,
			channelname,
			join1,
			join2,
			volume,
			warningText,
			CountdownTimerVar,
			sysVol,
			ConnectDis,
			notPlayingDisconnect,
			connectCounter
		});
	});
}


// eslint-disable-next-line no-inline-comments
const clientId = '835023222562095124'; /* 633709502784602133*/
DiscordRPC.register(clientId);

let rpc = new DiscordRPC.Client({
	transport: 'ipc'
});
let startTimestamp = new Date(),
	endTimestamp;
let songInfo;

// eslint-disable-next-line complexity
function setActivity() {
	if (!rpc || !win) {
		return;
	}

	const {
		title,
		time
	} = songInfo || {
		title: "",
		artist: "???",
		time: 1,
		ErrorStatus: undefined,
		paused: true,
		Explicit: false,
		isFirst: true,
		repeat: "off",
		playlist: 'https://e621.net/',
		channel: 'https://e621.net',
		join1: '-',
		join2: '-',
	};
	const now = new Date();

	let details,
		state,
		smallImageKey,
		smallImageText,
		largeImageText,
		largeImageKey;

	var qualities = 0;
	var VersionNumber = `System Volume is at: ${sysVol}% Player volume is at: ${volume}%`;

	if (CountdownTimerVar === true) {
		if (RealCountdown >= 340 && RealCountdown < 360) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 360s ]';
		}
		if (RealCountdown >= 330 && RealCountdown < 350) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 350s ]';
		}
		if (RealCountdown >= 320 && RealCountdown < 340) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 340s ]';
		}
		if (RealCountdown >= 310 && RealCountdown < 330) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 330s ]';
		}
		if (RealCountdown >= 300 && RealCountdown < 320) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 320s ]';
		}
		if (RealCountdown >= 290 && RealCountdown < 310) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 310s ]';
		}
		if (RealCountdown >= 280 && RealCountdown < 300) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 300s ]';
		}
		if (RealCountdown >= 270 && RealCountdown < 290) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 290s ]';
		}
		if (RealCountdown >= 260 && RealCountdown < 280) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 280s ]';
		}
		if (RealCountdown >= 250 && RealCountdown < 270) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 270s ]';
		}
		if (RealCountdown >= 240 && RealCountdown < 260) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 260s ]';
		}
		if (RealCountdown >= 230 && RealCountdown < 250) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 250s ]';
		}
		if (RealCountdown >= 220 && RealCountdown < 240) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 240s ]';
		}
		if (RealCountdown >= 210 && RealCountdown < 230) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 230s ]';
		}
		if (RealCountdown >= 200 && RealCountdown < 220) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 220s ]';
		}
		if (RealCountdown >= 190 && RealCountdown < 210) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 210s ]';
		}
		if (RealCountdown >= 180 && RealCountdown < 190) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 190s ]';
		}
		if (RealCountdown >= 170 && RealCountdown < 180) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 180s ]';
		}
		if (RealCountdown >= 160 && RealCountdown < 170) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 170s ]';
		}
		if (RealCountdown >= 150 && RealCountdown < 160) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 160s ]';
		}
		if (RealCountdown >= 140 && RealCountdown < 150) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 150s ]';
		}
		if (RealCountdown >= 130 && RealCountdown < 140) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 140s ]';
		}
		if (RealCountdown >= 120 && RealCountdown < 130) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 130s ]';
		}
		if (RealCountdown >= 110 && RealCountdown < 120) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 120s ]';
		}
		if (RealCountdown >= 100 && RealCountdown < 110) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 110s ]';
		}
		if (RealCountdown >= 90 && RealCountdown < 100) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 100s ]';
		}
		if (RealCountdown >= 80 && RealCountdown < 90) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 90s ]';
		}
		if (RealCountdown >= 70 && RealCountdown < 80) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 80s ]';
		}
		if (RealCountdown >= 60 && RealCountdown < 70) {
			ThirdEntry = '⚠️•';
			warningText = '[' + quitText + ' in 70s ]';
		}
		if (RealCountdown >= 50 && RealCountdown < 60) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 60s ]';
		}
		if (RealCountdown >= 40 && RealCountdown < 50) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 50s ]';
		}
		if (RealCountdown >= 30 && RealCountdown < 40) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 40s ]';
		}
		if (RealCountdown >= 20 && RealCountdown < 30) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 30s ]';
		}
		if (RealCountdown >= 10 && RealCountdown < 20) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 20s ]';
		}
		if (RealCountdown >= 0 && RealCountdown < 10) {
			ThirdEntry = '⚠️•';
			warningText = '[ ' + quitText + ' in 10s ]';
		} else(
			RealCountdown = 'error counting down!'
		)
	}

	if (title && CountdownTimerVar === false) {
		warningText = '';
		if (repeat.includes('off')) {
			var ThirdEntry = '▶️ •';
			qualities += 1;
		} else if (repeat.includes('all')) {
			ThirdEntry = '🔁 •';
			qualities += 2;
		} else if (repeat.includes('one')) {
			ThirdEntry = '🔂 •';
			qualities += 3;
		}
	}

	if (paused === false && notPlayingDisconnect === true && connectCounter == 0) {
		reconnect();
		ConnectDis = ' [ Connected ]';
		error_bool = false;
		connectCounter += 1;
		console.log("ALIVENESS");
	}

	if (paused === true && notPlayingDisconnect === true && connectCounter == 1) {
		rpc.destroy();
		ConnectDis = ' [ Disconnected ]';
		error_bool = true;
		connectCounter -= 1;
		console.log("DEADNESS");
	}

	if (paused && qualities === 1 && CountdownTimerVar === false) {
		ThirdEntry = '⏸ •';
	} else if (paused && qualities === 2) {
		ThirdEntry = '⏸ •';
	} else if (paused && qualities === 3) {
		ThirdEntry = '⏸ •';
	}

	if (!title && CountdownTimerVar === false) {
		let o = 1;
	} else if (repeat.includes('off') && paused) {
		ThirdEntry = '⏸ •';
	}

	if (title && paused) {
		var NewTitle = `${title}`;
	} else if (title && !paused) {
		NewTitle = title;
	}

	if (TogglePlaylist === true) {
		if (!playlist) {
			var plaaylist = 'https://google.com';
		} else if (playlist) {
			plaaylist = playlist;
		}
	} else {
		plaaylist = 'https://google.com';
	}

	// if (Explicit === 1 && !paused) {
	// 	NewTitle = `${title}`;
	// } else if (Explicit === 1 && paused) {
	// 	NewTitle = `${title}`;
	// }

	if (!Explicit) {
		NewerTitle = ` `;
	} else if (Explicit === 1 && !paused) {
		var NewerTitle = `🅴`;
	} else if (Explicit === 1 && paused) {
		NewerTitle = `🅴`;
	}

	if (!title & !artist) {
		// smallImageKey = 'stawwped';
		// smallImageText = 'not playing';
		largeImageKey = 'https://i.postimg.cc/XNPqqY9f/owo.jpg'; /* https://i.postimg.cc/Y9zgFMdS/uwu.webp */
		largeImageText = VersionNumber; // ----------------------------- //
		startTimestamp = now;
		endTimestamp = 0;
		detailsTwo = details;
		stateTwo = state;
	} else {
		startTimestamp = now - (time[0] * 1000);
		endTimestamp = startTimestamp + (time[1] * 1000);
		details = `${ThirdEntry} ${NewTitle} ${warningText}`;
		detailsThree = `${NewTitle} • ${warningText}`;
		state = `${NewerTitle} ${artist[0] || 'Unknown'} • ${artist[1] || 'Unknown'} • ${artist[2] || 'Unknown'}`;

		let fennecc = imageicon.replace('w60', 'w2080');
		fennec = fennecc.replace('h60', 'h2080');
		let largeImagePresent = VersionNumber; // ----------------------------- //

		if (repeat.includes('one')) {
			// smallImageKey = 'repeat_one';
			// smallImageText = 'Repeat one - Playing';
			largeImageText = largeImagePresent;
			largeImageKey = fennec;
		}

		if (repeat.includes('one') && paused) {
			// smallImageKey = 'paws ]';
			// smallImageText = 'Repeat one - Paused';
			startTimestamp = 0;
			endTimestamp = 0;
		}

		if (repeat.includes('all')) {
			// smallImageKey = 'repeat_all';
			// smallImageText = 'Repeat all - Playing';
			largeImageText = largeImagePresent;
			largeImageKey = fennec;
		}
		if (repeat.includes('all') && paused) {
			// smallImageKey = 'paws ]';
			// smallImageText = 'Repeat all - Paused';
			startTimestamp = 0;
			endTimestamp = 0;
		}

		if (repeat.includes('off')) {
			// smallImageKey = 'pway';
			// smallImageText = 'Repeat off - Playing';
			largeImageText = largeImagePresent;
			largeImageKey = fennec;
		}
		if (repeat.includes('off') && paused) {
			// smallImageKey = 'paws ]';
			// smallImageText = 'Repeat off - Paused';
			startTimestamp = 0;
			endTimestamp = 0;
		}

		// SECTION FOR ALL WRITE-OUT DATA WITH THE TERMINAL -- CHECK HERE
		process.stdout.write('\x1Bc');
		console.log('-- Here\'s Some Info Lovely --\n');
		// console.log('');
		// // console.log('--', searchAbout, 'is Forming --\n');
		// console.log('-- Love Is Forming --');
		console.log(songInfo);
		detailsTwo = details;
		stateTwo = state;
	}

	if (error_bool === true) {
		largeImageKey = 'https://i.postimg.cc/0QTQdXmp/whatt.png';
		largeImageText = 'error';
		startTimestamp = 0;
		endTimestamp = 0;
	}

	// var theElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)').textContent";

	const joinn1 = String(join1).slice(0, 31, '-');
	var joinn2 = String(join2).slice(0, 31, '-');

	if (ToggleButtons === false) {
		var activity = {
			details,
			state,
			startTimestamp,
			largeImageKey,
			largeImageText,
			smallImageKey,
			smallImageText,
			instance: true,
		};
	}
	if (ToggleButtons === true) {
		if (ToggleArtist === false && TogglePlaylist === false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				smallImageKey,
				smallImageText,
				instance: true,
			};
		}
		if (ToggleArtist === true && TogglePlaylist === true) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				smallImageKey,
				smallImageText,
				buttons: [{
					label: `${joinn2}`,
					url: plaaylist,
				}, {
					label: `${joinn1}`,
					url: channel,
				}],
				instance: true,
			};
		}
		if (ToggleArtist === true && TogglePlaylist === false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				smallImageKey,
				smallImageText,
				buttons: [{
					label: `${joinn1}`,
					url: channel,
				}],
				instance: true,
			};
		}
		if (TogglePlaylist === true && ToggleArtist === false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				smallImageKey,
				smallImageText,
				buttons: [{
					label: `${joinn2}`,
					url: plaaylist,
				}],
				instance: true,
			};
		}
		if (error_bool === true & !title & !artist) {
			details = '>>>>>>>>>>>>>>>';
			state = '>>>>>>>>>>>>>>>';
			largeImageKey = 'https://i.postimg.cc/0QTQdXmp/whatt.png';
			largeImageText = 'error';
			startTimestamp = 0;
			endTimestamp = 0;
			detailsTwo = '>>>>>>>>>>>>>>>';
			stateTwo = '>>>>>>>>>>>>>>>';
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				smallImageKey,
				smallImageText,
				instance: true,
			};
		}
	}
	if (endTimestamp) activity.endTimestamp = endTimestamp;
	rpc.setActivity(activity);
}

// largeImageURL({ format, size } = {}) {
// 	if (!this.largeImage) return null;
// 	if (/^spotify:/.test(this.largeImage)) {
// 		return `https://i.scdn.co/image/${this.largeImage.slice(8)}`;
// 	} else if (/^twitch:/.test(this.largeImage)) {
// 		return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.largeImage.slice(7)}.png`;
// 	}
// 	return this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationId, this.largeImage, {
// 		format,
// 		size,
// 	});
// }

async function updateSongInfo() {
	if (!rpc || !win) {
		return;
	}
	songInfo = await getContent().catch(console.log);

	// eslint-disable-next-line no-empty-function
	const {
		title,
		time
	} = songInfo || {
		title: `title is${undefined}`,
		artist: `artist is${undefined}`,
		time: `time is${undefined}`,
		paused: `paused is${undefined}`,
		isFirst: `isFirst is${undefined}`,
		repeat: `repeat is${undefined}`,
	};

	win.setThumbnailClip({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	win.setThumbarButtons([
		// {
		// 	icon: getNativeImage('resources/assets/images/Left.png')
		// },
		{
			tooltip: 'Previous Song',
			icon: getNativeImage('assets/images/prev.png'),
			async click() {
				var result = await executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button.previous-button.style-scope.ytmusic-player-bar\').click()');
				// result.click();
			},
		}, {
			tooltip: 'Play',
			icon: getNativeImage('assets/images/play.png'),
			async click() {
				var result = await executeJavaScript('document.querySelector(\'#play-pause-button\').click()');
				// result.click();
			},
		}, {
			tooltip: 'Next Song',
			icon: getNativeImage('assets/images/next.png'),
			async click() {
				var result = await executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button.next-button.style-scope.ytmusic-player-bar\').click()');
				// result.click();
			},
		},
		// {
		// 	icon: getNativeImage('resources/assets/images/Right.png')
		// },
	]);

	if (!title && !artist) {
		if (process.platform === 'win32') {
			win.setProgressBar(1 + 1e-10);
		}
		win.setOverlayIcon(null, 'Browsing');
	} else if (process.platform === 'win64') {
		win.setProgressBar(time[0] / time[1], {
			mode: paused ? 'paused' : 'normal',
		});

		if (isFirst) {
			toolTipButtons[1].flags = ['enabled'];
		}

		// var playingImage = 'https://i.postimg.cc/3NMxTsy0/Playing.png';
		// var PausedImage = 'https://i.postimg.cc/DyPy9Y7m/Paused.png';
		// var StoppedImage = 'https://i.postimg.cc/Vk7s6rr8/Stopped.png';
		// var RepeatAll = 'https://i.postimg.cc/VLmzWBXw/Repeat-all.png';
		// var RepeatOne = 'https://i.postimg.cc/sxcdNq5r/Repeat-one.png';
		var playingImage = 'assets/images/Playing.png';
		var PausedImage = 'https://i.postimg.cc/DyPy9Y7m/Paused.png';
		var StoppedImage = 'https://i.postimg.cc/Vk7s6rr8/Stopped.png';
		var RepeatAll = 'https://i.postimg.cc/VLmzWBXw/Repeat-all.png';
		var RepeatOne = 'https://i.postimg.cc/sxcdNq5r/Repeat-one.png';

		if (repeat.includes('one')) {
			win.setOverlayIcon(getNativeImage(RepeatOne, 'Repeat One'));
			win.setThumbarButtons(toolTipButtons);
		}
		if (repeat.includes('one') && paused) {
			win.setOverlayIcon(getNativeImage(playingImage, 'Playing'));
			win.setThumbarButtons(toolTipButtons);
		}

		if (repeat.includes('all')) {
			win.setOverlayIcon(getNativeImage(RepeatAll, 'Repeat All'));
			win.setThumbarButtons(toolTipButtons);
		}
		if (repeat.includes('all') && paused) {
			win.setOverlayIcon(getNativeImage(PausedImage, 'Playing'));
			win.setThumbarButtons(toolTipButtons);
		}

		if (repeat.includes('off')) {
			win.setOverlayIcon(getNativeImage(playingImage, 'Playing'));
			win.setThumbarButtons(toolTipButtons);
		}
		if (paused) {
			win.setOverlayIcon(getNativeImage(PausedImage, 'Paused'));
		}
	} else {
		win.setProgressBar(time[0] / time[1]);
		// win.setOverlayIcon(getNativeImage(StoppedImage), 'Stopped');
		// win.setThumbarButtons(toolTipButtons);
	}
}

rpc.once('disconnected', title => {
	rpc.destroy();
	// reconnectTimer = setInterval(reconnect, 5e3);
	ConnectDis = ' [ Disconnected ]';
});

function reconnect() {
	rpc = new DiscordRPC.Client({
		transport: 'ipc'
	});
	DiscordRPC.register(clientId);
	rpc.login({
		clientId
	}).then(() => {
		clearInterval(reconnectTimer);
		ConnectDis = ' [ Connected ]';
		console.log('-- Connected --');
		win.setTitle(`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${getNAME}`); // Added 'PageTitleReload' function for constant reload
	}).catch(err => {
		rpc = null;
		console.error(err);
		ConnectDis = ' [ Disconnected ]';
		win.setTitle(`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${getNAME}`); // Added 'PageTitleReload' function for constant reload
	});
}

function getNativeImage(filePath) {
	return nativeImage.createFromPath(path.join(process.cwd(), resourcePath, filePath));
}

function setPageName() {
	win.setTitle(`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${getNAME}`); // Added 'PageTitleReload' function for constant reload
}

// function fullSync() { // ======== A FUNCTION TO SEND DATA TO A WEB-SERVER ========
// 	if (volume === 0) {
// 		console.log('Waiting for load...');
// 	} else {
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\PlaylistCounter.txt', PlaylistCounter, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\PlaylistCounter.txt', 'Error: SecondTitleErrored'); // -- PlaylistCounter --
// 		});
// 		// ============
// 		if (secondTitle === true) {
// 			var SecondTitleErrored = 'true';
// 		} else {
// 			SecondTitleErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\secondTitle.txt', SecondTitleErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\secondTitle.txt', 'Error: secondTitle'); // -- SecondTitle --
// 			// testToImage.generateSync('owo', path('X:\\Webserver\\Images'));
// 		});
// 		// ============
// 		if (thirdTitle === true) {
// 			var thirdTitleErrored = 'true';
// 		} else {
// 			thirdTitleErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\thirdTitle.txt', thirdTitleErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\thirdTitle.txt', 'Error: thirdTitle'); // -- thirdTitle --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\stateTwo.txt', stateTwo, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\stateTwo.txt', 'Error: stateTwo'); // -- stateTwo --
// 		});
// 		// ============
// 		if (error_bool === true) {
// 			var error_boolErrored = 'true';
// 		} else {
// 			error_boolErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\error_bool.txt', error_boolErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\error_bool.txt', 'Error: error_bool'); // -- error_bool --
// 		});
// 		// ============
// 		var detailsTwoTwo = detailsTwo;
// 		var detailsTwoTwoErrored = JSON.stringify(detailsTwoTwo);
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsTwo.txt', detailsTwoTwoErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsTwo.txt', 'Error: detailsTwo'); // -- detailsTwo --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsThree.txt', detailsThree, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsThree.txt', 'Error: detailsThree'); // -- detailsThree --
// 		});
// 		// ============
// 		fs.writeFile('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\titleTwo.txt', titleTwo, error => {
// 			if (error) fsLibrary.writeFile('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\titleTwo.txt', 'Error: titleTwo'); // -- titleTwo --
// 		});
// 		// ============
// 		if (ToggleButtons === true) {
// 			var ToggleButtonsErrored = 'true';
// 		} else {
// 			ToggleButtonsErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleButtons.txt', ToggleButtonsErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleButtons.txt', 'Error: ToggleButtons'); // -- ToggleButtons --
// 		});
// 		// ============
// 		if (TogglePlaylist === true) {
// 			var TogglePlaylistErrored = 'true';
// 		} else {
// 			TogglePlaylistErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\TogglePlaylist.txt', TogglePlaylistErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\TogglePlaylist.txt', 'Error: TogglePlaylist'); // -- TogglePlaylist --
// 		});
// 		// ============
// 		if (ToggleArtist === true) {
// 			var ToggleArtistErrored = 'true';
// 		} else {
// 			ToggleArtistErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleArtist.txt', ToggleArtistErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleArtist.txt', 'Error: ToggleArtist'); // -- ToggleArtist --
// 		});
// 		// ============
// 		var artistTwo = artist;
// 		var artistErrored = JSON.stringify(artistTwo);
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\artist.txt', artistErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\artist.txt', 'Error: artist'); // -- artist --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeNow.txt', timeNow, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeNow.txt', 'Error: timeNow'); // -- timeNow --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeMax.txt', timeMax, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeMax.txt', 'Error: timeMax'); // -- timeMax --
// 		});
// 		// ============
// 		if (paused === true) {
// 			var pausedErrored = 'true';
// 		} else {
// 			pausedErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\paused.txt', pausedErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\paused.txt', 'Error: paused'); // -- paused --
// 		});
// 		// ============
// 		if (isFirst === true) {
// 			var isFirstErrored = 'true';
// 		} else {
// 			isFirstErrored = 'false';
// 		}
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\isFirst.txt', SecondTitleErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\', 'Error: isFirst'); // -- isFirst --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\imageicon.txt', imageicon, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\imageicon.txt', 'Error: imageicon'); // -- imageicon --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\repeat.txt', repeat, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\repeat.txt', 'Error: repeat'); // -- repeat --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channel.txt', channel, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channel.txt', 'Error: channel'); // -- channel --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\playlist.txt', playlist, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\playlist.txt', 'Error: playlist'); // -- playlist --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\fennec.txt', fennec, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\fennec.txt', 'Error: fennec'); // -- fennec --
// 		});
// 		// ============
// 		var ExplicitErrored = JSON.stringify(Explicit);
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\Explicit.txt', ExplicitErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\Explicit.txt', 'Error: Explicit'); // -- Explicit --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channelname.txt', channelname, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channelname.txt', 'Error: channelname'); // -- channelname --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join1.txt', join1, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join1.txt', 'Error: join1'); // -- join1 --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join2.txt', join2, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join2.txt', 'Error: join2'); // -- join2 --
// 		});
// 		// ============
// 		var volumeErrored = JSON.stringify(volume);
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\volume.txt', volumeErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\volume.txt', 'Error: volume'); // -- volume --
// 		});
// 		// ============
// 		var sysVolErrored = JSON.stringify(sysVol);
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\sysVol.txt', sysVolErrored, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\sysVol.txt', 'Error: sysVol'); // -- sysVol --
// 		});
// 		// ============
// 		fs.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ConnectDis.txt', ConnectDis, error => {
// 			if (error) fsLibrary.writeFile('C:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ConnectDis.txt', 'Error: ConnectDis'); // -- ConnectDis --
// 		});
// 	}
// }

rpc.on('ready', title => {
	setActivity();
	setInterval(setActivity, 1e3);
	setInterval(soundDevices, 1e3);
	//setInterval(fullSync, 1e3);
	setInterval(updateSongInfo, 1e3);
	setInterval(setPageName, 1e3);
	ConnectDis = ' [ Connected ]';
});

rpc.login({
	clientId
});