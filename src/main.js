// process.on('unhandledRejection', (error) => {
// 	console.error('Unhandled Promise Rejection:', error);
// 	// Add additional error handling logic as needed
// });

// const readline = require('readline');

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode = true;

// var scrapeWebContent = require('app.scrapeWebContent');
/* eslint-disable no-inline-comments */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* ---------------------------------DEFINE BEFORE RUN--------------------------------- */
const DiscordRPC = require("discord-rpc");
const crypto = require('crypto');
const easyVolume = require("easy-volume");
const util = require('util');
const localShortcut = require('electron-localshortcut');
const exec = util.promisify(require('child_process').exec);
const os = require('os');
const yaml = require('js-yaml');
const WebSocket = require('ws');
const {
	app,
	Menu,
	shell,
	session,
	ipcMain,
	clipboard,
	ipcRenderer,
	webContents,
	nativeImage,
	BrowserWindow,
	globalShortcut,
} = require("electron");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const {
	spawn,
	ChildProcess
} = require("child_process");
const {
	setTimeout
} = require("timers/promises");

// function delay(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

let configPath = path.resolve(os.homedir(), 'config.yaml');
let config = {};

// Function to refresh the configuration
function refreshConfig() {
	try {
		config = yaml.load(fs.readFileSync(configPath, 'utf8'));
		// console.log(`- LOG -- REFRESHED CONFIG FILE -`);
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log(`- LOG -- UNABLE TO LOCATE CONFIG FILE: ${configPath} -`);
			console.log(`- LOG -- TRYING ALTERNATE DIRECTORY -`);
			downloadDefaultConfig();
		} else {
			console.log(`- LOG -- ERROR READING 'config' FILE: ${error} -`);
			throw error;
		}
	}
}

// Function to download and save the default configuration file
function downloadDefaultConfig() {
	axios.get('https://raw.githubusercontent.com/FennBoii/YTM-OP/underConstruction/config.yaml')
		.then(response => {
			const data = response.data;
			fs.writeFileSync(configPath, data, 'utf8');
			console.log('Default config file downloaded successfully.');
			// Reload the configuration after downloading
			refreshConfig();
		})
		.catch(error => {
			console.error('Failed to download default config file:', error);
		});
}

if (!fs.existsSync(configPath)) {
	downloadDefaultConfig();
} else {
	console.log('Config file already exists.');
	refreshConfig();
}

// Function to update the configuration file
function updateConfigFile(key, value) {
	refreshConfig();
	config[key] = value;
	const yamlStr = yaml.dump(config);
	fs.writeFileSync(configPath, yamlStr, 'utf8');
}

// Variable to block media keys
let blockMediaKeys = false;

/* ---------------------------------DEFINE FUNCTIONS--------------------------------- */
refreshConfig();
var publicPageURL;
var VersionNumber, synctimeGET, systemVolume = 0,
	ToggleButtons = true,
	ChannelToggle = false,
	TogglePlaylist = true,
	ToggleArtist = true,
	volume = 0,
	artist, songUrl = "https://music.youtube.com",
	titleTwo = "",
	detailsTwo = '',
	stateTwo = '',
	ConnectDis = " [ Disconnected ]",
	detailsThree = "Default",
	channel = "https://music.youtube.com",
	error_bool = false,
	PlaylistCounter = "",
	ConnectionTitle = "",
	RealCountdown, CountdownTime, secondTitle = true,
	thirdTitle = true,
	paused, imageicon = "https://google.com/h60/w60",
	repeat, playlist, channelname, Explicit, join1, join2, timeNow = 1,
	timeMax, notPlayingDisconnect = false,
	notPlayingDisconnectText = "",
	buttonOne = false,
	buttonTwo = false,
	buttonThree = false,
	buttonFour = false,
	warningText = "",
	TitleExit = "",
	quitText = "",
	connectCounter = 1,
	RealCountdownTitleBar = "",
	CountdownTimerVar = false;
var ToggArtAlb = false,
	configWindow, urlFinal, title, playlistname, FINALTHREEVAR, joinn1, joinn2, largeImageText, plaaylist, largeImageKey, details, state, ThirdEntry, qualities = 0,
	result, timeMaxMinus, startTimestamp, endTimestamp, stopTime = 0,
	timeoutDisco = 0,
	globalCounter = 0,
	imgVer = 0,
	theFinalowoNess = "Nada There is nothing YET NONEEEEE",
	systemVolumeDEC, url1, imageiconNOW, imageReplace2, isDisOpen = false,
	disconLog = true,
	decreasingTimerUp, decreasingTimerDown, decreasingTimerOverlay, playingFrom, wsSend = false,
	wsReceive = false,
	getCurrentSongUrl;
var albumORsong = config.albumORsong;

var countDownLoadAgain = 10;
var finalExtractNow;
var theTimeNowGot;
var sendCurrentUrl = false;
var nextSongCounter = 1;
var messageReceivedCount = 0;
var messageSentCount = 0;
var globalWS;
// [ ------------------------------------------------------- ]
// [ ------------------------------------------------------- ]

// var VersionNumber = `Volume is: ${volume}`; // 'Updated(v3.3.1 - 18:12 - 03-13-2022);';

// [ ------------------------------------------------------- ]
// [ ------------------------------------------------------- ]

let reconnectTimer, injected;

const resourcePath =
	process.platform == "darwin" ? "Contents/Resources" : "resources ]";

function executeJavaScript(code) {
	return new Promise((resolve, reject) => {
		if (!win || !win.webContents) {
			console.log(`- LOG -- NO WINDOW IS INITIALIZED -`);
		} else {
			win.webContents.executeJavaScript(code)
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		}
	});
}

console.log("-- " + config.username + " --");
process.stdout.write("\x1Bc");



let win, settingsWin;
const menuTemplate = [{
		label: "Utils",
		submenu: [{
				label: "RefreshImage",
				click() {
					reloadImageUrl();
					setLargeIconImage();
					imgVer += 1;
				},
			},
			{
				label: "Not Playing Disconnect",
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
				label: "Send Current Url",
				click() {
					sendCurrentUrl = true;
				},
			},
			{
				label: "Sites",
				submenu: [{
						label: "Go to YTM-OP Site",
						click() {
							win.loadURL("https://getname.ytmopdata.net/");
							error_bool = true;
							rpc.destroy();
							ConnectDis = " [ Disconnected ]";
							connectCounter -= 1;
						},
					},
					{
						label: "Go to YTM Homepage",
						click() {
							win.loadURL("https://music.youtube.com/");
							if (connectCounter == 0) {
								notPlayingDisconnect = false;
								reconnect();
								ConnectDis = " [ Connected ]";
								error_bool = false;
								connectCounter += 1;
							}
							if (connectCounter == 1) {
								console.log("NO!");
							}
						},
					},
				],
			},
			{
				label: "Connection",
				submenu: [{
						label: "-- Connect --",
						click() {
							if (connectCounter == 0) {
								reconnect();
								ConnectDis = " [ Connected ]";
								error_bool = false;
								connectCounter += 1;
							}
							if (connectCounter == 1) {
								console.log("NO!");
							}
						},
						accelerator: "Ctrl+Alt+1",
					},
					{
						label: "-- Disconnect --",
						click() {
							error_bool = true;
							rpc.destroy();
							ConnectDis = " [ Disconnected ]";
							connectCounter -= 1;
						},
						accelerator: "Ctrl+Alt+2",
					},
					{
						label: "Reset RPC Connection",
						click() {
							setTimeout(DiscordDisconnect, 0);
							setTimeout(DiscordConnect, 100);
						},
					},
				],
			},
			{
				label: "On End Power Options",
				submenu: [{
						label: "Quit Application",
						click() {
							if (buttonOne == false) {
								buttonOne = true;
								buttonTwo = false;
								buttonThree = false;
								buttonFour = false;
								TitleExit = " [ -- 𝑪𝑳𝑶𝑺𝑰𝑵𝑮 𝑨𝑷𝑷𝑳𝑰𝑪𝑨𝑻𝑰𝑶𝑵 𝑶𝑵 𝑬𝑵𝑫 -- ]";
								CountdownTimerVar = true;
								quitText = "quitting app";
							} else {
								buttonOne = false;
								TitleExit = "";
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: "Sleep PC",
						click() {
							if (buttonTwo == false) {
								buttonOne = false;
								buttonTwo = true;
								buttonThree = false;
								buttonFour = false;
								TitleExit = " [ -- 𝑺𝑳𝑬𝑬𝑷𝑰𝑵𝑮 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]";
								CountdownTimerVar = true;
								quitText = "sleeping pc";
							} else {
								buttonTwo = false;
								TitleExit = "";
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: "Restart PC",
						click() {
							if (buttonThree == false) {
								buttonOne = false;
								buttonTwo = false;
								buttonThree = true;
								buttonFour = false;
								TitleExit = " [ -- 𝑹𝑬𝑺𝑻𝑨𝑹𝑻𝑰𝑵𝑮 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]";
								CountdownTimerVar = true;
								quitText = "restarting pc";
							} else {
								buttonThree = false;
								TitleExit = "";
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: "Shutdown PC",
						click() {
							if (buttonFour == false) {
								buttonOne = false;
								buttonTwo = false;
								buttonThree = false;
								buttonFour = true;
								TitleExit = " [ -- 𝑺𝑯𝑼𝑻𝑻𝑰𝑵𝑮 𝑫𝑶𝑾𝑵 𝑷𝑪 𝑶𝑵 𝑬𝑵𝑫 -- ]";
								CountdownTimerVar = true;
								quitText = "shutting down pc";
							} else {
								buttonFour = false;
								TitleExit = "";
								CountdownTimerVar = false;
							}
						},
					},
					{
						label: "Toggle Off",
						click() {
							buttonOne = false;
							buttonTwo = false;
							buttonThree = false;
							buttonFour = false;
							TitleExit = "";
							CountdownTimerVar = false;
						},
					},
				],
			},
			{
				label: "Buttons",
				submenu: [{
						label: "ToggleButtonsOn",
						click() {
							ToggleButtons = true;
							ToggleArtist = true;
							TogglePlaylist = true;
							secondTitle = true;
							thirdTitle = true;
						},
					},
					{
						label: "ToggleButtonsOff",
						click() {
							ToggleButtons = false;
							ToggleArtist = false;
							TogglePlaylist = false;
							secondTitle = false;
							thirdTitle = false;
						},
					},
					{
						label: "TogglePlaylist",
						click() {
							if (TogglePlaylist == true) {
								TogglePlaylist = false;
								secondTitle = false;
							} else {
								TogglePlaylist = true;
								secondTitle = true;
							}
						},
					},
					{
						label: "ToggleArtist",
						click() {
							if (ToggleArtist == true) {
								ToggleArtist = false;
								thirdTitle = false;
							} else {
								ToggleArtist = true;
								thirdTitle = true;
							}
						},
					},
					{
						label: "ChangeButtonsAlb/Art",
						click() {
							if (ToggArtAlb == true) {
								ToggArtAlb = false;
							} else {
								ToggArtAlb = true;
							}
						},
					},
				],
			},
			{
				label: "Websocket Connections",
				submenu: [{
						label: "None",
						click() {
							ConnectionTitle = "";
						},
					},
					{
						label: "Sending",
						click() {
							ConnectionTitle = " [ -- Sending -- ]";
						},
					},
					{
						label: "Receiving",
						click() {
							ConnectionTitle = " [ -- Receiving -- ]";
						},
					},
				],
			},
			{
				label: "Extra",
				submenu: [{
						role: "Reload",
					},
					{
						type: "separator",
					},
					{
						role: "toggledevtools",
					},
					{
						type: "separator",
					},
					{
						role: "minimize",
					},
					{
						type: "separator",
					},
					{
						role: "undo",
					},
					{
						role: "redo",
					},
					{
						type: "separator",
					},
					{
						role: "cut",
					},
					{
						role: "copy",
					},
					{
						role: "paste",
					},
					{
						type: "separator",
					},
					{
						role: "quit",
						accelerator: "Ctrl+Q",
					},
					{
						type: "separator",
					},
					{
						label: "Copy PageURL",
						click() {
							clipboard.writeText(win.webContents.getURL());
						},
					},
					{
						label: "Copy SongImageURL",
						click() {
							clipboard.writeText(urlFinal);
						},
					},
				],
			},
		],
	},
	{
		label: "Go Back",
		click() {
			win.webContents.goBack();
		},
	},
	{
		label: "Go Forward",
		click() {
			win.webContents.goForward();
		},
	},
	{
		label: "EditConfigFile",
		click() {
			createConfigWindow();
		},
	},
];

ipcMain.on('quit-app', () => {
	app.quit();
	app.relaunch();
});

ipcMain.on("load-config", (event) => {
	fs.readFile(
		path.join(configPath),
		"utf8",
		(err, data) => {
			if (err) {
				console.error("Error reading the config file", err);
				return;
			}
			try {
				// const config = yaml.load(data); // Use yaml.load to parse YAML
				// console.log("Sending config data:", config);
				console.log("Sending config data:", data);
				event.sender.send("config-loaded", data);
			} catch (parseErr) {
				console.error("Error parsing YAML", parseErr);
			}
		}
	);
	console.log(`- LOG -- 'load-Config' -`);
});

ipcMain.on("save-config", (event, updatedConfig) => {
	try {
		const yamlData = updatedConfig; // Use yaml.dump to stringify YAML
		fs.writeFile(
			configPath,
			yamlData,
			"utf8",
			(err) => {
				if (err) {
					console.error("Error saving the config file", err);
					return;
				}
				event.sender.send("config-saved", "success");
			}
		);
	} catch (stringifyErr) {
		console.error("Error converting to YAML", stringifyErr);
	}
	console.log(`- LOG -- EXECUTED 'saveConfig' -`);
});

ipcMain.on("request-config", (event) => {
	fs.readFile(configPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading the file", err);
			event.reply("config-response", {
				error: err.message,
			});
			return;
		}
		try {
			const config = yaml.load(data); // Use yaml.load to parse YAML
			event.reply("config-response", {
				data: config,
			});
		} catch (parseErr) {
			console.error("Error parsing YAML", parseErr);
			event.reply("config-response", {
				error: parseErr.message,
			});
		}
	});
	console.log(`- LOG -- 'request-Config' -`);
});

const keyword = "Connected";

function focusElectronApp() {
	const win = BrowserWindow.getAllWindows().find((win) =>
		win.getTitle().includes(keyword)
	);

	if (win) {
		win.show();
		win.focus();
	}
	console.log(`- LOG -- EXECUTED 'FocusElectronApp' -`);
}


const SimpleTemplate = [{
		label: "Close Config Window",
		click() {
			configWindow.close();
			const menu = Menu.buildFromTemplate(menuTemplate);
			Menu.setApplicationMenu(menu);
		},
	},
	{
		label: "Go to your info site",
		click() {
			shell.openExternal('https://getname.ytmopdata.net/userRedirects/' + config.websocketName + "/" + config.websocketName + ".html");
		},
	},
];

function createConfigWindow() {
	configWindow = new BrowserWindow({
		frame: true,
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
			sandbox: true,
		},
	});
	const menu = Menu.buildFromTemplate(SimpleTemplate);
	Menu.setApplicationMenu(menu);

	configWindow.loadFile("src/index.html");
	configWindow.on("closed", () => {
		configWindow = null;
		const menu = Menu.buildFromTemplate(menuTemplate);
		Menu.setApplicationMenu(menu);
	});

	console.log(`- LOG -- EXECUTED 'CreateConfigWindow -`);
} //lower5

function DiscordConnect() {
	reconnect();
	console.log("Discord Connected");
}

function DiscordDisconnect() {
	console.log("disconnected");
	rpc.destroy();
	ConnectDis = " [ Disconnected ]";
	console.log("Discord Disconnected");
}

if (process.platform == "win64") {
	menuTemplate.unshift({});
}

function createSettingsWindow() {
	settingsWin = new BrowserWindow({
		frame: true,
		width: 800,
		height: 700,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	settingsWin.setMinimumSize(300, 300);
	settingsWin.setResizable(true);
	Menu.setApplicationMenu(Menu);
	settingsWin.setMenuBarVisibility(true);
	console.log(`- LOG -- EXECUTED 'createSettingsWindow' -`);
}

function createPREWindow() {
	win = new BrowserWindow({
		frame: true,
		width: 1200,
		height: 800,
		icon: "resources/assets/images/Youtube-Music-logo.png",
		webPreferences: {
			preload: path.join(__dirname, "../PRE/preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
			webSecurity: true,
		},
	});

	win.loadFile("PRE/index.html");

	ipcMain.on('key-exchange-successful', () => {
		createWindow();
		if (!config.loadLastURL.includes("music")) {
			win.loadURL("https://music.youtube.com/")
		}
	});
	ipcMain.on('open-failed-url', () => {
		createWindow();
		win.loadURL("https://getname.ytmopdata.net/")
	});
	console.log(`- LOG -- EXECUTED 'createPREWindow' -`);

	let runningDecreaseUp = 0;
	let volumeDecVar = 0;
	globalShortcut.register('VolumeUp', () => {
		callVolumeWindow();
		decreasingTimerUp = 50;

		if (runningDecreaseUp == 0) {
			var timerIntervalUp = setInterval(decrementAndCheckUp, 1);
			decreasingTimerUp = 50;
			runningDecreaseUp = 1;
		} else {
			decreasingTimerUp = 50;
		}
		volumeDecVar += 1250;


		function decrementAndCheckUp() {
			decreasingTimerUp -= 1;

			if (decreasingTimerUp <= 0) {
				runningDecreaseUp = 0;
				clearInterval(timerIntervalUp);
				setVolumeDecAddFin();
				volumeDecVar = 0;
			}
		}
	});


	let runningDecreaseDown = 0;
	globalShortcut.register('VolumeDown', () => {
		callVolumeWindow();
		decreasingTimerDown = 50;

		if (runningDecreaseDown == 0) {
			var timerIntervalDown = setInterval(decrementAndCheckDown, 1);
			decreasingTimerDown = 50;
			runningDecreaseDown = 1;
		} else {
			decreasingTimerDown = 50;
		}
		volumeDecVar -= 1250;


		function decrementAndCheckDown() {
			decreasingTimerDown -= 1;

			if (decreasingTimerDown <= 0) {
				runningDecreaseDown = 0;
				clearInterval(timerIntervalDown);
				setVolumeDecAddFin();
				volumeDecVar = 0;
			}
		}
	});

	function setVolumeDecAddFin() {
		// if (systemVolumeDEC == 0) {
		// 	console.log(`- LOG -- VOLUME WAS 0 -`);
		// 	exec(`"C:/Program Files/YTM-OP/nircmd.exe" mutesysvolume 1`);
		// }
		exec(`"C:/Program Files/YTM-OP/nircmd.exe" changesysvolume ${volumeDecVar} -`);
		console.log(`- LOG -- SET THE VOLUME TO ${systemVolumeDEC} && ${volumeDecVar} -`);
	}


	let muteCount = 0;
	globalShortcut.register('VolumeMute', (event) => {
		callVolumeWindow();
		if (muteCount == 0) {
			console.log(`- LOG -- VOLUME MUTED -`);
			exec(`"C:/Program Files/YTM-OP/nircmd.exe" mutesysvolume 1`);
			muteCount = 1;
		} else if (muteCount == 1) {
			console.log(`- LOG -- VOLUME UNMUTED -`);
			exec(`"C:/Program Files/YTM-OP/nircmd.exe" mutesysvolume 0`);
			muteCount = 0;
		}
	});
}


var ifVolOverlay = false;
let runningDecreaseOverlay = 0;
let volWin;

function callVolumeWindow() {
	if (ifVolOverlay == false) {
		ifVolOverlay = true;
		console.log(`- LOG -- EXECUTED 'callVolumeWindow' -`);
		volWin = new BrowserWindow({
			width: 800, // was 200
			height: 600,
			length: 650,
			frame: false,
			alwaysOnTop: true,
			transparent: true,
			webPreferences: {
				preload: path.join(__dirname, "../sysVolpreload.js"),


			},
		});




		volWin.loadFile("C:/Program Files/YTM-OP/volWin.html");

	}
	decreasingTimerOverlay = config.volWinDelay * 100;

	if (runningDecreaseOverlay == 0) {
		var timerIntervalOverlay = setInterval(decrementAndCheckUp, 1);
		decreasingTimerOverlay = config.volWinDelay * 100;
		runningDecreaseOverlay = 1;
	} else {
		decreasingTimerOverlay = config.volWinDelay * 100;
	}


	function decrementAndCheckUp() {
		decreasingTimerOverlay -= 1;

		if (decreasingTimerOverlay <= 0) {
			volWin.close();
			runningDecreaseOverlay = 0;
			clearInterval(timerIntervalOverlay);
			// setVolumeDecAddFin();
			ifVolOverlay = false;
		}
	}
};


ipcMain.on("PlsSendVolOwO", (event) => {
	console.log(`- LOG -- SENT 'PlsSendVolOwO' FUNC -`);
	event.sender.send("getSysVolNow", systemVolumeDEC);
});

// ipcMain.on("getSysVolNow", (event) => {
// 	event.sender.send("sysVolVar", systemVolumeDEC);
// });

function toggleBlockMediaKeys(block) {
	blockMediaKeys = block;
}

function createWindow() { // lower
	win = new BrowserWindow({
		frame: true,
		width: 1200,
		height: 800,
		icon: "resources/assets/images/Youtube-Music-logo.png",
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (albumORsong == "song") {
		win.loadURL(config.loadLastURL);
	} else if (albumORsong == "album") {
		win.loadURL(config.loadLastURL);
	} else if (albumORsong == "default") {
		win.loadURL("https://music.youtube.com/");
	}

	win.setMinimumSize(300, 300);
	win.setResizable(true);
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
	win.setMenuBarVisibility(true);
	// win.webContents.openDevTools(); //LOWER2

	win.on("close", async () => {
		let tempInfo = await getContent().catch(console.log);
		// eslint-disable-next-line no-unused-vars
		var {
			time
		} = tempInfo || {
			time: 1,
			paused: undefined,
		};
		app.exit();
	});
	win.on("closed", () => {
		rpc.destroy();
		ConnectDis = " [ Disconnected ]";
		win = null;
	});
	win.on("page-title-updated", (e, title) => {
		if (buttonOne == true || buttonTwo == true || buttonThree == true || buttonFour == true) {
			win.setTitle(
				`${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
			);
		} else {
			win.setTitle(
				`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
			);
		}
		BrowserWindow.title = "owo";
		e.preventDefault();

	});

	globalShortcut.register('MediaPreviousTrack', (event) => {
		if (!blockMediaKeys) {
			win.webContents.executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button.previous-button.style-scope.ytmusic-player-bar\').click()');
		} else {
			win.webContents.executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button:nth-child(2)\').click()');
		}
	});

	globalShortcut.register('MediaPlayPause', (event) => {
		if (!blockMediaKeys) {
			win.webContents.executeJavaScript('document.querySelector(\'#play-pause-button\').click()');
		} else {
			win.webContents.executeJavaScript('document.querySelector(\'#play-pause-button\').click()');
		}
	});

	globalShortcut.register('MediaNextTrack', (event) => {
		if (!blockMediaKeys) {
			win.webContents.executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button.next-button.style-scope.ytmusic-player-bar\').click()');
		} else {
			win.webContents.executeJavaScript('document.querySelector(\'#left-controls > div > tp-yt-paper-icon-button:nth-child(5)\').click()');
		}
	});

	globalShortcut.register('Alt+VolumeUp', (event) => {
		console.log(`- LOG -- VOLUME INCREASED (with Alt) -`);
	});

	globalShortcut.register('Alt+VolumeDown', (event) => {
		console.log(`- LOG -- VOLUME DECREASED (with Alt) -`);
	});

	let typedCharacters;

	win.webContents.on('before-input-event', (event, input) => {
		if (input.type === 'keyDown' && /^[a-zA-Z]$/.test(input.key)) {
			typedCharacters;
			typedCharacters += input.key.toLowerCase();
			if (typedCharacters.endsWith('coo')) {
				console.log('"coo" typed!');
				const progressContainer = win.webContents.executeJavaScript('document.getElementById("#progressContainer")');
				progressContainer.classList.add('animate-background');
				setTimeout(() => {
					progressContainer.classList.remove('animate-background');
				}, 6000);
				typedCharacters = '';
			}
		} else {
			typedCharacters = '';
		}
	});
	win.webContents.on("will-prevent-unload", (e) => e.preventDefault());
	console.log(`- LOG -- EXECUTED CREATEWINDOW -`);
}

setInterval(() => {
	try {
		win.webContents.send('changeYTLayout', imageReplace2);
	} catch (error) {
		console.log("ERROR SETTING WINDOW CONTENTS line: 935");
	}
	// console.log(`- LOG -- EXECUTED 'changeYTLayout' -`)
}, 2000);

// FUNCTION TO GET SYSTEM VOLUME uwu
setInterval(() => {
	// systemVolume++;
	// console.log(`- LOG -- EXECUTED 'GETVOL' -`);
	const executableName = "VolumeFind.exe";
	const downloadUrl = "https://github.com/FennBoii/YTM-OP/raw/master/VolumeFind.exe";
	const programFilesPaths = [
		path.join("C:", "Program Files", "YTM-OP", executableName),
		path.join("C:", "Program Files (x86)", "YTM-OP", executableName)
	];

	function trySpawnExecutable() {
		try {
			const executablePath = programFilesPaths.find(fs.existsSync);

			if (executablePath) {
				spawnExecutable(executablePath);
			} else {
				console.log(`Executable not found in either directory. Downloading from ${downloadUrl}...`);

				const downloadPath = programFilesPaths[0]; // Prefer "Program Files" for download
				const file = fs.createWriteStream(downloadPath);
				https.get(downloadUrl, (response) => {
					response.pipe(file);
					file.on('finish', () => {
						file.close(() => spawnExecutable(downloadPath));
					});
				}).on('error', (err) => {
					fs.unlink(downloadPath, () => console.error(`Download error: ${err.message}`));
				});
			}
		} catch (error) {
			console.error(`Error: ${error.message}`);
		}
	}

	function spawnExecutable(executablePath) {
		try {
			const child = spawn(executablePath);

			child.stdout.on("data", (data) => {
				let secondString = data.toString().trim();
				const systemVolume = Math.floor(parseFloat(secondString));
				console.log(`- LOG -- GOT SYS VOL: ${systemVolume}`);
			});

			child.stderr.on("data", (data) => {
				console.error(`stderr: ${data}`);
			});

			child.on('close', (code) => {
				console.log(`Child process exited with code ${code}`);
			});
		} catch (error) {
			console.error(`Error spawning executable: ${error.message}`);
		}
	}

	// Run the function
	trySpawnExecutable();


	systemVolumeDEC = Math.round(systemVolume);

	try {
		win.webContents.send('updateSystemVolume', "system vol:\n" + systemVolumeDEC);
	} catch (error) {
		console.log("ERROR WITH line: 962")
	}

}, 1000);

let volumeOUTGET;
// FUNCTION TO GET PLAUYER VOLUME owo
setInterval(() => {
	// volume++;

	try {
		const javascriptCode = `
    (function() {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const interval = setInterval(() => {
                const slider = document.querySelector('#volume-slider');
                if (slider) {
                    clearInterval(interval);
                    resolve(slider.value); // Resolve with the slider's value
                } else if (Date.now() - startTime > 3000) { // Timeout after 3 seconds
                    clearInterval(interval);
                    resolve(0); // Resolve with 0 if slider is not found
                }
            }, 500); // Check every 500ms
        });
    })();
    `;

		executeJavaScript(javascriptCode).then((volumeOUT) => {
			// console.log(`- LOG -- GOT THE PLAYER VOL ELE ${volumeOUT} -`);
			volumeOUTGET = volumeOUT;
			win.webContents.send('updatePlayerVolume', "player vol:\n" + volumeOUT);
		}).catch((error) => {
			console.log(`- LOG -- GOT PLAYER VOL ERR, VOL: ${volume}, ERR: ${error} -`);
		});
	} catch (error) {
		console.log(`- LOG -- GOT PROMISE ERR, VOL: ${volume}, ERR: ${error} -`);
	}
}, 2000);

let intervalIdDisco;
let aftersendStatus = false;

app.on("ready", createPREWindow);
app.on("ready", focusElectronApp);


ipcMain.on("sendDataToMain", (event, dataToUpdate) => {
	const filePath = path.join(configPath);

	fs.readFile(filePath, "utf8", (readErr, data) => {
		if (readErr) return sendError("Error reading file:", readErr);

		let config;
		try {
			config = yaml.load(data);
		} catch (parseErr) {
			return sendError("Error parsing YAML:", parseErr);
		}

		const mergedData = {
			...config,
			...dataToUpdate
		};

		try {
			const yamlData = yaml.dump(mergedData);
			fs.writeFile(filePath, yamlData, "utf8", (writeErr) => {
				if (writeErr) return sendError("Error writing to file:", writeErr);

				console.log("File updated with merged data successfully.");
				event.sender.send("updateResponse", {
					success: true,
					message: "Data received and file updated"
				});
				event.sender.send("configData", {
					success: true,
					config: mergedData
				});
				// if (event.sender.send("configData")) {
				// 	updateConfigFile(10, resyncSongUrl);
				// }
			});
		} catch (stringifyErr) {
			sendError("Error converting to YAML:", stringifyErr);
		}
	});

	console.log(`- LOG -- 'sendDataToMain' -`);
	loadCurrentGivenURL();

	function sendError(message, err) {
		console.error(message, err);
		event.sender.send("updateResponse", {
			success: false,
			error: err.message
		});
	}
});

function loadCurrentGivenURL() {
	win.loadURL(config.loadLastURL);
}

setTimeout(10000, reloadPage);

function reloadPage() {
	win.webContents.reloadIgnoringCache();
}

// async function createCustomElement() {
// 	// Create a new element
// 	const customElement = document.createElement('div');
// 	customElement.textContent = `System Volume: ${systemVolume}`;
// 	customElement.style.padding = '5px';
// 	customElement.style.border = '2px solid green';
// 	customElement.style.backgroundColor = 'lightgreen';

// 	// Get the parent element
// 	const parentElement = document.querySelector('#right-content > ytmusic-settings-button');

// 	// Append the new element to the parent
// 	parentElement.appendChild(customElement);
// }

// createCustomElement();


ipcMain.on("settings-clicked", () => {
	createSettingsWindow();
});

async function getContent() {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {

		let titleResult;
		// Title Get Element
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const element = document.querySelector('div.content-info-wrapper yt-formatted-string.title');
							if (element) {
								clearInterval(interval);
								resolve(element.title || 'None');
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			titleResult = await executeJavaScript(javascriptCode);
			if (titleResult.length > 50) {
				title = titleResult.substring(0, 50);
				titleTwo = titleResult.substring(0, 49);
			} else {
				title = titleResult;
				titleTwo = titleResult;
			}
		} catch (error) {
			console.log(`- LOG -- ERRORED 'titleResult' OBJECT -`);
		}

		// Artist Name Get Element
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const element = document.querySelector('span.subtitle yt-formatted-string.byline');
							if (element) {
								clearInterval(interval);
								resolve(element.title || 'None');
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			let artiste = await executeJavaScript(javascriptCode);
			artist = artiste.split(" • ")
		} catch (error) {
			console.log(`- LOG -- ERRORED 'artist' OBJECT -`);
		}

		// TimeNow Name Get Element
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const element = document.querySelector('#progress-bar');
							if (element) {
								clearInterval(interval);
								resolve(element.getAttribute('aria-valuenow') || 'None');
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			timeNow = await executeJavaScript(javascriptCode);
			// console.log("Load3-1");
		} catch (error) {
			console.log(`- LOG -- ERRORED 'timeNow' OBJECT -`);
		}

		// TimeMax Name Get Element
		try {
			const javascriptCode = `
						(function() {
							return new Promise((resolve) => {
								const startTime = Date.now();
								const interval = setInterval(() => {
									const element = document.querySelector('#progress-bar');
									if (element) {
										clearInterval(interval);
										resolve(element.getAttribute('aria-valuemax') || 'None');
									} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
										clearInterval(interval);
										resolve('None'); // Resolve with 'None' instead of rejecting
									}
								}, 500); // Check every 500ms
							});
						})();
					`;
			timeMax = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'timeMax' OBJECT -`);
		}

		// paused Name Get Element
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const element = document.querySelector('#play-pause-button');
							if (element) {
								clearInterval(interval);
								resolve(element.title || 'None');
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			paused = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'paused' OBJECT -`);
		}

		// repeat status Get Element
		try {
			const javascriptCode = `
			(function() {
				return new Promise((resolve) => {
					const startTime = Date.now();
					const interval = setInterval(() => {
						const element = document.querySelector('#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar');
						if (element) {
							clearInterval(interval);
							resolve(element.title || 'None');
						} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;

			repeat = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'repeat' OBJECT -`);
		}


		// result = await executeJavaScript('document.querySelector(\'#movie_player > div.ytp-chrome-top > div.ytp-title > div > a\').href');
		if (win.webContents.getURL() != null) {
			result = win.webContents.getURL();
		} else if (result.includes("watch?v")) {
			songUrl = result;
		} else if (!result) {
			return reject(`- LOG -- ERRORED 'songUrl' OBJECT -`);
		}


		// Playlist Name Get Element
		try {
			const javascriptCode = `
			(function() {
				return new Promise((resolve) => {
					const startTime = Date.now();
					const interval = setInterval(() => {
						const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)');
						if (element) {
							clearInterval(interval);
							resolve(element.textContent || 'None');
						} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;

			playlistname = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'playlistname' OBJECT -`);
		}

		// Playlist URL Get Element
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)');
							if (element) {
								clearInterval(interval);
								resolve(element.href);
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('https://google.com'); // Resolve with the default URL instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			playlist = await executeJavaScript(javascriptCode);
			if (playlist == "https://google.com") {
				TogglePlaylist = false;
			} else {
				TogglePlaylist = true;
			}
		} catch (error) {
			console.log(`- LOG -- ERRORED 'timeMax' OBJECT -`);
		}

		// Channel Link Get Element
		try {
			const javascriptCode = `
				(function() {
					// console.log('Script started for fetching channel'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							// console.log('Checking for channel element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								// console.log('Channel element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.href);
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								// console.log('Timeout reached, channel element not found'); // Log timeout
								clearInterval(interval);
								resolve('https://google.com'); // Resolve with the default URL instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			channel = await executeJavaScript(javascriptCode);

			if (channel == "https://google.com") {
				ToggleArtist = false;
			}
			if (channel != "https://google.com") {
				ToggleArtist = true;
			}
		} catch (error) {
			channel = "https://google.com/";
			console.log(`- LOG -- ERRORED 'channel' OBJECT -`);
		}

		// Channel Name Get Element
		if (ChannelToggle == true) {
			const javascriptCode = `
				(function() {
					// console.log('Script started for fetching channel name (ChannelToggle == true)'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							// console.log('Checking for channel name element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								// console.log('Channel name element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.innerText);
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								// console.log('Timeout reached, channel name element not found'); // Log timeout
								clearInterval(interval);
								resolve('Unknown Channel'); // Resolve with a default value instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			channelname = await executeJavaScript(javascriptCode);
			if (channelname == "Unknown Channel") {
				ToggleArtist = false;
			} else {
				ToggleArtist = true;
			}
		} else if (ChannelToggle == false) {
			const javascriptCode = `
				(function() {
					// console.log('Script started for fetching channel name (ChannelToggle == false)'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							// console.log('Checking for alternative channel name element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								// console.log('Alternative channel name element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.textContent);
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
								// console.log('Timeout reached, alternative channel name element not found'); // Log timeout
								clearInterval(interval);
								resolve('Unknown Channel'); // Resolve with a default value instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;

			channelname = await executeJavaScript(javascriptCode);
			if (channelname == "Unknown Channel") {
				ToggleArtist = false;
			} else {
				ToggleArtist = true;
			}
		}

		// Explicit Get Element
		try {
			const javascriptCode = `
			(function() {
				return new Promise((resolve) => {
					const startTime = Date.now();
					const interval = setInterval(() => {
						const element = document.querySelector('#badges.ytmusic-player-bar');
						if (element) {
							clearInterval(interval);
							resolve(element.children.length || 'None');
						} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;
			Explicit = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'Explicit' OBJECT -`);
		}

		// Get player volume live
		try {
			const javascriptCode = `
				(function() {
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							const slider = document.querySelector('#volume-slider');
							if (slider) {
								clearInterval(interval);
								resolve(slider.value); // Resolve with the slider's value
							} else if (Date.now() - startTime > 3000) { // Timeout after 1 second
								clearInterval(interval);
								resolve(0); // Resolve with 0 if slider is not found
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			volume = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'volume' OBJECT -`);
		}


		// getCurrentSongUrl
		try {
			const javascriptCode = `
					(function() {
						return new Promise((resolve) => {
							const startTime = Date.now();
							const interval = setInterval(() => {
								const element = document.querySelector('#movie_player > div.ytp-chrome-top > div.ytp-title > div > a');
								if (element) {
									clearInterval(interval);
									resolve(element.href || 'None');
								} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
									clearInterval(interval);
									resolve('None'); // Resolve with 'None' instead of rejecting
								}
							}, 500); // Check every 500ms
						});
					})();
				`;

			getCurrentSongUrl = await executeJavaScript(javascriptCode);
			// let extract1 = await executeJavaScript(javascriptCode);
			// let extract2 = extract1.indexOf('&t=');
			// getCurrentSongUrl = extract1 !== -1 ? extract1.substring(0, extract1) : extract1;
			// if (extract2 !== -1) {
			// 	getCurrentSongUrl = extract1.substring(0, extract2);
			// } else {
			// 	getCurrentSongUrl = extract1;
			// }
		} catch (error) {
			console.log(`- LOG -- ERRORED 'getCurrentSongUrl' OBJECT: ${error} -`);
		}

		// getImageURLNOW
		try {
			const javascriptCode = `
			(function() {
				return new Promise((resolve) => {
					const startTime = Date.now();
					const interval = setInterval(() => {
						const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img');
						if (element) {
							clearInterval(interval);
							resolve(element.src || 'None');
						} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
		`;

			imageiconNOW = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'imageiconNOW' OBJECT -`);
		}

		// get playing from Name
		try {
			const javascriptCode = `
					(function() {
						return new Promise((resolve) => {
							const startTime = Date.now();
							const interval = setInterval(() => {
								const element = document.querySelector('#tab-renderer > div > ytmusic-queue-header-renderer > div.container-name.style-scope.ytmusic-queue-header-renderer > yt-formatted-string.subtitle.style-scope.ytmusic-queue-header-renderer');
								if (element) {
									clearInterval(interval);
									resolve(element.innerHTML || 'None');
								} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
									clearInterval(interval);
									resolve('None'); // Resolve with 'None' instead of rejecting
								}
							}, 500); // Check every 500ms
						});
					})();
				`;

			playingFrom = await executeJavaScript(javascriptCode);
		} catch (error) {
			console.log(`- LOG -- ERRORED 'get playing from name' OBJECT -`);
		}

		let imageReplace1 = "https://getname.ytmopdata.net?w60?h4122";
		if (!isDisOpen == true) {
			imageReplace1 = "https://getname.ytmopdata.net?w60?h4122";
		} else if (isDisOpen == true) {
			imageReplace1 = imageiconNOW.replace("w60", "w4112");
			imageReplace2 = imageReplace1.replace("h60", "h4112");
		}

		// <---- Custom CSS Starts Here

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

		if ((TogglePlaylist == false) & (ToggleArtist == false)) {
			PlaylistCounter = "playlist = false, artist = false";
		} else if ((TogglePlaylist == true) & (ToggleArtist == false)) {
			PlaylistCounter = "playlist = true, artist = false";
		} else if ((TogglePlaylist == false) & (ToggleArtist == true)) {
			PlaylistCounter = "playlist = false, artist = true";
		} else if ((TogglePlaylist == true) & (ToggleArtist == true)) {
			PlaylistCounter = "playlist = true, artist = true";
		}

		timeMaxMinus = timeMax - 3;
		CountdownTime = timeMax - timeNow;
		RealCountdown = CountdownTime - 3;

		if (CountdownTimerVar == true) {
			RealCountdownTitleBar = " [ Countdown Till End: " + RealCountdown + " ]";
		} else if (CountdownTimerVar == false) {
			RealCountdownTitleBar = "";
		}


		if (buttonFour == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";

				exec("shutdown /s /t 0", function (error, stdout, stderr) {
					console.log("stdout: " + stdout);
					console.log("stderr: " + stderr);
					if (error !== null) {
						console.log("exec error: " + error);
					}
				});
				app.quit();
				console.log("SHUTDOWN TIME");
			}
		} else if (buttonThree == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";

				exec("shutdown /r /t 0", function (error, stdout, stderr) {
					console.log("stdout: " + stdout);
					console.log("stderr: " + stderr);
					if (error !== null) {
						console.log("exec error: " + error);
					}
				});
				app.quit();
				console.log("REBOOT TIME");
			}
		} else if (buttonTwo == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";

				exec(
					"rundll32.exe powrprof.dll, SetSuspendState Sleep",
					function (error, stdout, stderr) {
						console.log("stdout: " + stdout);
						console.log("stderr: " + stderr);
						if (error !== null) {
							console.log("exec error: " + error);
						}
					}
				);
				app.quit();
				console.log("SLEEP TIME");
			}
		} else if (buttonOne == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";
				if (timeNow == timeMaxMinus) {
					app.quit();
				}
				console.log("QUIT TIME");
			}
		}

		let Dash = "";
		if (ToggArtAlb == false) {
			join1 = Dash + channelname + Dash;
			join2 = Dash + playlistname + Dash;
		} else if (ToggArtAlb == true) {
			join2 = Dash + config.AlternateTopButtonValue + Dash;
			join1 = Dash + config.AlternateBottomButtonValue + Dash;
		}

		// var newPlaylist = playlistname.split('music.')[1];
		// var playlistnameTwo = `https://music.${newPlaylist}`;
		// console.log(playlistnameTwo);

		var expanse0 = "-------------------------------------------";
		var expanse1 = "-------------------------------------------";
		var expanse2 = "-";
		var expanse3 = "-";
		var expanse4 = "-------------------------------------------";
		var expanse5 = "-------------------------------------------";

		publicPageURL = win.webContents.getURL();

		globalCounter += 1;
		VersionNumber += 1;

		return resolve({
			// VersionNumber,
			// playlistname,
			// detailsThree,
			// ToggArtAlb,
			// songUrl,
			// publicPageURL,
			// ImageIcon,
			// connectCounter,
			// notPlayingDisconnect,
			// ConnectionTitle,
			// expanse0,
			// PlaylistCounter,
			// secondTitle,
			// thirdTitle,
			// error_bool,
			// detailsThree,
			// title,
			// expanse1,
			// ToggleButtons,
			// expanse2,
			// TogglePlaylist,
			// expanse3,
			// ToggleArtist,
			// expanse4,
			// expanse5,
			'playing from:': playingFrom,
			ConnectionTitle,
			globalCounter,
			time: [timeNow, timeMax],
			title,
			titleTwo,
			ThirdEntry,
			thirdTitle,
			artist,
			paused,
			Explicit,
			qualities,
			repeat,
			details,
			detailsTwo,
			detailsThree,
			stateTwo,
			FINALTHREEVAR,
			largeImageKey,
			largeImageText,
			joinn2,
			plaaylist,
			buttons: [playlist, channel],
			joinn1,
			channel,
			artistStuff: [artist[0], artist[1], artist[2]],
			// stopTime,
			// timeoutDisco,
			notPlayingDisconnect,
			connectCounter,
			imgVer,
			theFinalowoNess,
			blockMediaKeys,
			toggleBlockMediaKeys,
			urlFinal,
			url1,
			isDisOpen,
			nextSongCounter,
			getCurrentSongUrl,
			finalExtractNow,
			countDownLoadAgain,
			theTimeNowGot,
			// finalURL,
			// CountdownTimerVar, thelink, VersionNumber, synctimeGET, systemVolume, ToggleButtons, ChannelToggle, TogglePlaylist, ToggleArtist, volume, artist, songUrl, titleTwo, detailsTwo, stateTwo, ConnectDis, detailsThree, channel, error_bool, PlaylistCounter, ConnectionTitle, RealCountdown, CountdownTime, secondTitle, thirdTitle, paused, imageicon, repeat, playlist, channelname, Explicit, join1, join2, timeNow, timeMax, notPlayingDisconnect, notPlayingDisconnectText, buttonOne, buttonTwo, buttonThree, buttonFour, warningText, getNAME, TitleExit, quitText, connectCounter, RealCountdownTitleBar, CountdownTimerVar, sysVol, LICKCHeck, playlistToggleVisible,
			// ToggArtAlb, configWindow, finalContactVar, GfinalContactVar, urlFinal, outputTest, title, ImageIcon, playlistname, FINALTHREEVAR, joinn1, joinn2, largeImageText, plaaylist, largeImageKey, details, endTimestamp, startTimestamp
			// LICKCHeck,
			// synctimeGET,
			// systemVolume,
			// getNAME,
			// RealCountdownTitleBar,
			// ConnectionTitle,
			// ConnectDis,
			// stateTwo,
			// TitleExit,
			// buttonOne,
			// buttonTwo,
			// buttonThree,
			// buttonFour,
			// CountdownTime,
			// RealCountdown,
			// timeMaxMinus,
			// paused,
			// imageicon,
			// repeat,
			// channel,
			// playlist,
			// Explicit,
			// channelname,
			// join1,
			// join2,
			// volume,
			// warningText,
			// CountdownTimerVar,
			// sysVol,
			// ConnectDis,
			// notPlayingDisconnect,
			// connectCounter,
			// outputTest,
		});
	});
}

async function reloadImageUrl() {
	// imageIcon Get Element
	try {
		const javascriptCode = `
		(function() {
			return new Promise((resolve) => {
				const startTime = Date.now();
				const interval = setInterval(() => {
					const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img');
					if (element) {
						clearInterval(interval);
						resolve(element.src || 'None');
					} else if (Date.now() - startTime > 3000) { // Timeout after 1 seconds
						clearInterval(interval);
						resolve('None'); // Resolve with 'None' instead of rejecting
					}
				}, 500); // Check every 500ms
			});
		})();
	`;

		imageicon = await executeJavaScript(javascriptCode);
	} catch (error) {
		console.log(`- LOG -- ERRORED 'imageicon' OBJECT -`);
	}
}

function setUserPageImage() {
	// console.log(`- LOG -- EXECUTED 'setUserPageImage' FUNC -`);
	url1 = imageicon.replace("w60", "w1028");
	urlFinal = url1.replace("h60", "h1028");
	// url1 = imageicon.replace("w60", "w4112");
	// urlFinal = url1.replace("h60", "h4112");
	// let finalURL = encodeURIComponent(urlFinal);
	// // console.log(finalURL);

	const baseURL = 'https://getname.ytmopdata.net/webpageEdit.php';


	const theLinkData = {
		givenwebsocketName: config.givenwebsocketName,
		randomToken: config.randomToken,
		sitename: config.websocketName,
		thelink: urlFinal,
		imgVer: imgVer,
	};

	try {
		const response = axios.get(`${baseURL}/webpageEdit.php`, {
			params: theLinkData
		});
		// console.log(`- LOG -- DATA GOT 'theLink' RESPONSE: ${response.data} -`);
	} catch (error) {
		console.log(`- LOG -- ERRORED UPDATING 'theLink' -`);
	} //LOWER1
	imgVer + 1;
}

getContent()
	.then(data => {
		console.log("SUCCESS" + data);
	})
	.catch(error => {
		console.error("FAILED" + error);
	});

// eslint-disable-next-line no-inline-comments
const clientId = config.discordID; /* 633709502784602133*/
if (isDisOpen == true) {
	DiscordRPC.register(clientId);
}
var rpc = new DiscordRPC.Client({
	transport: 'ipc',
});


let songInfo;

function setLargeIconImage() {
	// Use stopTime here
	if (title) {
		if (timeNow <= 2) {
			theFinalowoNess = "https://getname.ytmopdata.net/userRedirects/" + config.websocketName + "/" + config.websocketName + ".png" + '?timestamp=' + stopTime.toString().substring(0, 8) + globalCounter.toString() + '?songName=' + encodeURIComponent(artist[0].toString().substring(3, 0)) + '?v=' + imgVer;
		}
	}
}

let OnlySendOnce = 0;
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
		paused: 'Pause',
		Explicit: false,
		repeat: "off",
		playlist: "https://e621.net/",
		channel: "https://e621.net",
		join1: "-",
		join2: "-",
	};
	const now = new Date();

	VersionNumber = `Player Volume is at: ${volume}% System Volume is at: ${systemVolumeDEC}%`;

	if (CountdownTimerVar == true) {
		if (RealCountdown >= 0 && RealCountdown < 360) {
			ThirdEntry = "⚠️•";
			// Calculate the nearest multiple of 10 above or equal to RealCountdown
			let nearestMultipleOfTen = Math.ceil(RealCountdown / 5) * 5;
			warningText = "[ " + quitText + " in " + nearestMultipleOfTen + "s ]";
		} else {
			RealCountdown = "error counting down!";
		}
	}

	//The 5) * 5 = 5 seconds so "234) * 234" is 234 seconds!

	if (title && CountdownTimerVar == false) {
		warningText = "";
		if (repeat.includes("off") && paused == "Pause") {
			// console.log("yayDONE1");
			ThirdEntry = "▶️ •";
			qualities = 1;
		} else if (repeat.includes("all") && paused == "Pause") {
			// console.log("yayDONE2");
			ThirdEntry = "🔁 •";
			qualities = 2;
		} else if (repeat.includes("one") && paused == "Pause") {
			// console.log("yayDONE3");
			ThirdEntry = "🔂 •";
			qualities = 3;
		}

		if (repeat.includes("off") && paused == "Play") {
			// console.log("bruhNO2");
			ThirdEntry = "⏸ •";
		}
	}

	if (paused == 'Play' && qualities == 1 && CountdownTimerVar == false) {
		console.log("SetACTbru")
		ThirdEntry = "⏸ •";
	} else if (paused == 'Play' && qualities == 2 && CountdownTimerVar == false) {
		ThirdEntry = "⏸ •";
	} else if (paused == 'Play' && qualities == 3 && CountdownTimerVar == false) {
		ThirdEntry = "⏸ •";
	}

	if (paused == 'Pause' && notPlayingDisconnect == true && connectCounter == 0) {
		ConnectDis = " [ Connected ]";
		reconnect();
		error_bool = false;
		connectCounter + 1;
		timeoutDisco = 0;
		connectCounter = 1;
		console.log("CONNECTeeeeeeeeeD");
		if (connectCounter >= 1) {
			console.log("NO!");
		}
	}

	if (paused == 'Play' && notPlayingDisconnect == true && connectCounter == 1) {
		if (timeoutDisco == 0) {
			ConnectDis = " [ Disconnected ]";
			rpc.destroy();
			error_bool = true;
			connectCounter = 0;
			timeoutDisco = 1;
			console.log("DISCONNECTeeeeeeeeeD");
		}
	}


	if (title) {
		let length = 256;
		if (title.length > length) {
			var NewTitle = title.substring(0, length);
			// console.log("CUT");
		} else {
			NewTitle = `${title}`;
			// console.log("CUT-NOT");
		}
	}

	if (TogglePlaylist == true) {
		if (!playlist) {
			plaaylist = "https://music.youtube.com";
		} else if (playlist) {
			plaaylist = playlist;
			// plaaylist = playlist;
		}
	} else {
		plaaylist = "https://music.youtube.com";
	}

	if (Explicit == 'None') {
		var NewerTitle = ` `;
	} else if (Explicit == 1) {
		NewerTitle = `🅴`;
	}

	if (!title & !artist) {
		largeImageKey =
			"https://i.postimg.cc/XNPqqY9f/owo.jpg"; /* https://i.postimg.cc/Y9zgFMdS/uwu.webp */
		largeImageText = "VersionNumberDed"; // ----------------------------- //
		startTimestamp = now;
		endTimestamp = 0;
		detailsTwo = details;
		stateTwo = state;
		try {
			win.webContents.send('updateConfigUpdates', "#007aFF");
		} catch (error) {
			console.log("ERROR WITH line: 962")
		}
	} else {
		try {
			win.webContents.send('updateConfigUpdates', "#FFF000");
		} catch (error) {
			console.log("ERROR WITH line: 962")
		}
		if (songInfo != undefined) {
			win.webContents.send('updateConfigUpdates', "#00FF00");
			reloadImageUrl();
			setLargeIconImage();
			imgVer += 1;
		}
		// console.log("pausedTRUE");
		startTimestamp = now - time[0] * 1000;
		endTimestamp = startTimestamp + time[1] * 1000;
		details = `${ThirdEntry} ${NewTitle} ${warningText}`;
		detailsThree = `${NewTitle} • ${warningText}`;
		let star1 = "•";
		let star2 = "•";
		let artistZRe;
		if (artist[1] == undefined && artist[2] == undefined) {
			artistZRe = "[ " + artist[0] + " ]";
			toggleBlockMediaKeys(true);
		} else {
			artistZRe = artist[0];
			toggleBlockMediaKeys(false);
		}
		if (artist[1] == undefined) {
			star1 = "";
		} else {
			star1 = "•";
		}
		if (artist[2] == undefined) {
			star2 = "";
		} else {
			star2 = "•";
		}
		state = `${NewerTitle} ${artistZRe || "Unknown"} ${star1} ${artist[1] || ""} ${star2} ${artist[2] || ""}`;

		if (timeNow <= 3 && paused == "Pause") {
			stopTime = Date.now();
			imgVer += 1;
			reloadImageUrl();
			setLargeIconImage();
		}

		if (timeNow == 0) {
			nextSongCounter = 0;
		}

		if (timeNow < 2) {
			// nextSongCounter = 0;
			if (nextSongCounter == 0) {
				if (wsSend) {
					nextSongCounter += 1;
					globalWS.send('SNS');
				}
			}
		}

		if (timeNow >= 2) {
			FINALTHREEVAR = urlFinal;
		}

		if (title) { // LOWER3
			if (repeat.includes("one")) {
				largeImageText = VersionNumber;
				if (artist[1] == undefined && artist[2] == undefined) {
					largeImageKey = FINALTHREEVAR;
				} else {
					largeImageKey = urlFinal;
				}
			}

			if (repeat.includes("one") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}

			if (repeat.includes("all")) {
				largeImageText = VersionNumber;
				if (artist[1] == undefined && artist[2] == undefined) {
					largeImageKey = FINALTHREEVAR;
				} else {
					largeImageKey = urlFinal;
				}

			}
			if (repeat.includes("all") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}

			if (repeat.includes("off")) {
				largeImageText = VersionNumber;
				if (artist[1] == undefined && artist[2] == undefined) {
					largeImageKey = FINALTHREEVAR;
				} else {
					largeImageKey = urlFinal;
				}
			}
			if (repeat.includes("off") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}
		}

		// SECTION FOR ALL WRITE-OUT DATA WITH THE TERMINAL -- CHECK HERE -- LOWER 0
		process.stdout.write("\x1Bc");
		console.log("-- Here's Some Info Lovely --\n");
		console.log(songInfo);
		detailsTwo = details;
		stateTwo = state;

		let albumORsong = config.albumORsong;
		let specificTime = config.specificTime;
		let lastUrlMoment = win.webContents.getURL();
		let lastUrlMomentSpecific = win.webContents.getURL() + `&t=${timeNow}`;

		// https://music.youtube.com/watch? SONG

		// https://music.youtube.com/&t=325 NO SONG

		if (lastUrlMoment == "https://music.youtube.com/") {
			if (title && playlist) {
				updateConfigFile("loadLastURL", lastUrlMoment);
			}
		} else if (lastUrlMoment.includes('https://music.youtube.com/channel/') && albumORsong == "song" && specificTime == "n" || specificTime == "N" || specificTime == "no" || specificTime == "NO" || specificTime == "No") {
			if (title && playlist) {
				updateConfigFile("loadLastURL", lastUrlMoment);
			}
		} else if (lastUrlMoment.includes('https://music.youtube.com/watch?') && albumORsong == "song" && specificTime == "y" || specificTime == "Y" || specificTime == "yes" || specificTime == "YES" || specificTime == "Yes") {
			if (title && playlist) {
				updateConfigFile("loadLastURL", lastUrlMomentSpecific);
			}
		} else if (albumORsong == "album") {
			if (title && playlist) {
				updateConfigFile("loadLastURL", playlist.toString());
			}
		} else if (albumORsong == "default") {
			if (title && playlist) {
				updateConfigFile("https://music.youtube.com/");
			}
		}
		// console.log(albumORsong);
		// console.log(albumORsongURL);
	}

	if (error_bool == true) {
		largeImageKey = "https://i.postimg.cc/0QTQdXmp/whatt.png";
		largeImageText = "error";
		startTimestamp = 0;
		endTimestamp = 0;
	}

	// var theElement = "document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)').textContent";

	joinn1 = String(join1).slice(0, 31, "-");
	joinn2 = String(join2).slice(0, 31, "-");

	if (ToggleButtons == false) {
		var activity = {
			details,
			state,
			startTimestamp,
			largeImageKey,
			largeImageText,
			instance: true,
		};
	}
	if (ToggleButtons == true) {
		if (ToggleArtist == false && TogglePlaylist == false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				instance: true,
			};
		}
		if (ToggleArtist == true && TogglePlaylist == true) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				buttons: [{
						label: joinn2.toString(),
						url: plaaylist
					},
					{
						label: joinn1.toString(),
						url: channel
					},
				],
				instance: true,
			};
		}
		if (ToggleArtist == true && TogglePlaylist == false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				buttons: [{
					label: `${joinn1}`,
					url: channel,
					style: 5,
				}, ],
				instance: true,
			};
		}
		if (TogglePlaylist == true && ToggleArtist == false) {
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				buttons: [{
					label: `${joinn2}`,
					url: plaaylist,
					style: 5,
				}, ],
				instance: true,
			};
		}
		if ((error_bool == true) & !title & !artist) {
			details = ">>>>>>>>>>>>>>>";
			state = ">>>>>>>>>>>>>>>";
			largeImageKey = "https://i.postimg.cc/0QTQdXmp/whatt.png";
			largeImageText = "error";
			startTimestamp = 0;
			endTimestamp = 0;
			detailsTwo = ">>>>>>>>>>>>>>>";
			stateTwo = ">>>>>>>>>>>>>>>";
			activity = {
				details,
				state,
				startTimestamp,
				largeImageKey,
				largeImageText,
				instance: true,
			};
		}
	}
	if (endTimestamp) activity.endTimestamp = endTimestamp;
	if (isDisOpen == true) rpc.setActivity(activity);


	// // Declare WebSocket variables
	// let wsSend = null;
	// let wsReceive = null;

	const RECONNECT_DELAY = 5000;
	const MESSAGE_SEND_INTERVAL = 500;

	// Function to initialize and manage WebSocket for sending messages
	function setupSendWebSocket() {

		if (timeNow > 2) {
			OnlySendOnce = 0;
			console.log(`- LOG -- TIMENOW MORE THAN 2 -`);
		}

		if (OnlySendOnce == 0) {
			if (timeNow < 2) {
				globalWS.send(`SONGURLNOWLIVE:${getCurrentSongUrl}`);
				console.log(`- LOG -- I SENT URL NOW -`);
				OnlySendOnce += 1;
			}
		}

		if (!wsSend || wsSend.readyState === WebSocket.CLOSED) {
			wsSend = new WebSocket(`wss://getname.ytmopdata.net/${config.websocketName}`);
			globalWS = wsSend;

			wsSend.onopen = function (event) {
				console.log(`RUNNING SENDING CONNECTED INTERNAL: ${event}`);
				messageSentCount += 1;
				wsSend.send(theFinalowoNess);


				wsReceive.onmessage = function (event) {
					messageReceivedCount += 1;
					// console.log(`- LOG - MESSAGE RECEIVED - ${event.data} -`);

					if (sendCurrentUrl == true) {
						globalWS.send(`CURRENTURL:${win.webContents.getURL()}`);
						sendCurrentUrl = false;
					}
				};

				setInterval(() => {
					if (globalWS.readyState === WebSocket.OPEN) {
						messageSentCount += 1;
						wsSend.send(`SYNCMOMENT:${timeNow}`);
					}
				}, MESSAGE_SEND_INTERVAL);
			};

			wsSend.onclose = function (event) {
				console.log(`- LOG -- CONNECTION CLOSED 'R-(${messageReceivedCount})' -- 'S-(${messageSentCount})' -`);
				wsSend = null;
				setTimeout(() => {
					console.error(`-- LOG - RECONNECTING WEBSOCKET -`);
					setupSendWebSocket();
				}, RECONNECT_DELAY);
			};

			wsSend.onerror = function (error) {
				console.error(`-- LOG -- WEBSOCKET ERROR: ${error} -`);
			};
		} else {
			console.log(`- LOG -- WEBSOCKET CURRENTLY CONNECTED 'sending' -`);
		}
	}

	function setupReceiveWebSocket() {
		if (!wsReceive || wsReceive.readyState === WebSocket.CLOSED) {
			wsReceive = new WebSocket(`wss://getname.ytmopdata.net/${config.websocketName}`);
			globalWS = wsReceive;

			wsReceive.onopen = function (event) {
				messageReceivedCount += 1;
				console.log(`CONNECTED TO WEBSOCKET FROM RECEIVING`);
			};

			wsReceive.onmessage = function (event) {
				messageReceivedCount += 1;
				// console.log(`- LOG - MESSAGE RECEIVED - ${event.data} -`);

				if (event.data.includes('SYNCMOMENT')) {
					let value = event.data.toString();
					let parts = value.split('SYNCMOMENT:');
					if (parts.length > 1) {
						let finalExtract = parts[1].trim();
						// console.log('Extracted value:', finalExtract);
						theTimeNowGot = finalExtract;
					} else {
						console.log('SYNCMOMENT delimiter not found');
					}
				}

				if (event.data.includes('SONGURLNOWLIVE')) {
					let value = event.data.toString();
					let parts = value.split('SONGURLNOWLIVE:');

					if (parts.length > 1) {
						let finalExtractNow = parts[1].trim();

						win.webContents.loadURL(finalExtractNow);
						console.log(`- LOG -- LOADED URL FROM 'WHATSURURL' -`)
					} else {
						console.log('SYNCURL delimiter not found');
					}
				}

				if (theTimeNowGot != undefined) {
					if (Math.abs(theTimeNowGot - timeNow) < config.outOfSyncPlayingSong) {
						// console.log(`- LOG -- NO RESYNCING NEEDED -`);
					} else {
						win.webContents.executeJavaScript(
							`document.getElementsByTagName('video')[0].currentTime = ${theTimeNowGot}`
						);
						console.log("syncedTime");
					}
				}

				if (event.data === 'ping') {
					console.log(`- LOG -- SENDING 'pong' MESSAGE BACK -`);
					messageSentCount += 1;
					globalWS.send('pong');
				}
			};

			wsReceive.onclose = function (event) {
				console.log(`- LOG -- CONNECTION CLOSED 'R-(${messageReceivedCount})' -- 'S-(${messageSentCount})' -`);
				wsReceive = null;
				setTimeout(() => {
					console.error(`-- LOG - RECONNECTING WEBSOCKET -`);
					setupSendWebSocket();
				}, RECONNECT_DELAY);
			};

			wsReceive.onerror = function (error) {
				console.error(`-- LOG -- WEBSOCKET ERROR: ${error} -`);
			};
		} else {
			console.log(`- LOG -- WEBSOCKET CURRENTLY CONNECTED 'receiving' -`);
		}
	}

	function manageWebSocketConnections() {
		if (ConnectionTitle.includes("Sending")) {
			// console.log(`RUNNING SENDING ${wsSend}`);
			console.log(`RUNNING SENDING`);
			setupSendWebSocket();
		} else if (ConnectionTitle.includes("Receiving")) {
			// console.log(`RUNNING RECEIVING ${wsReceive}`);
			console.log(`RUNNING RECEIVING`);
			setupReceiveWebSocket();
		}
	}

	manageWebSocketConnections();

}

// if (isDisOpen === true) {
// 	var isDisOpenInterval = setInterval(afterSend, 5000);
// 	console.log(`- LOG -- EXECUTED 'afterSend' -`);
// }

const intervalId = setInterval(isDiscordRunning, 2000);

var discoConnCount = 0;
let isDiscoRunningStr;

async function isDiscordRunning() {
	try {
		const {
			stdout
		} = await exec('wmic process where name="Discord.exe" get ProcessId');
		const outputGotten = stdout.trim().replace(/\D/g, '');

		if (outputGotten.length > 10 && !isDisOpen == true) {
			isDiscoRunningStr = `Discord Is Running`;
			console.log(`- LOG -- DISCORD IS OPEN -`);
			isDisOpen = true;

			if (discoConnCount == 0) {
				console.log(`- LOG -- LAUNCHING 'afterRecieve' ${config.delayBeforeLunchingDiscord * 1000}s -`);
				let intervalIdquick1 = setInterval(() => {
					clearInterval(intervalIdquick1);
					console.log(`- LOG -- (${config.delayBeforeLunchingDiscord}s) COUNTDOWN FINISHED, CONNECTING TO DISCORD... `);
					setTimeout(afterSend(), 5000); // Rerun the function after 5 seconds
				}, config.delayBeforeLunchingDiscord * 1000); // RUN FOR 20 SECONDS
			}
		} else if (outputGotten.length <= 10 && isDisOpen == true) { // Check if Discord is closed and was previously detected
			isDiscoRunningStr = `Discord Is NOT Running`;
			console.log(`- LOG -- DISCORD IS CLOSED -`);
			isDisOpen = false;
		}
	} catch (error) {
		console.error(`- LOG -- ERROR CHECKING DISCORD RUNNING -`);
		isDisOpen = false;
	}
}





















if (disconLog) {
	intervalIdDisco = setInterval(() => {
		// console.log(`- LOG -- AFTERCONNECTED -`);
		process.stdout.write("\x1Bc");
		console.log(`- / / :DISCONNECTED INFO: \\ \\ -`);
		console.log(`- LOG -- DISCORD IS 'NOT' OPEN -`);
		console.log(`- LOG -- SYSTEM VOL IS: '${systemVolumeDEC}' -`);
		console.log(`- LOG -- PLAYER VOL IS: '${volumeOUTGET}' -`);
		console.log(`- LOG -- ISDISOPEN IS: '${isDisOpen}' -`);
		console.log(`- LOG -- 'aftersendStatus' IS: '${aftersendStatus}' -`);
		console.log(`- LOG -- 'isDiscoRunningStr' IS: '${isDiscoRunningStr}' -`);
		console.log(`- LOG -- 'discoConnCount' IS: '${discoConnCount}' -`);
		console.log(`- LOG -- 'decreasingTimerUp' IS: '${decreasingTimerUp}' -`);
		console.log(`- LOG -- 'decreasingTimerDown' IS: '${decreasingTimerDown}' -`);
		console.log(`- LOG -- 'decreasingTimerOverlay' IS: '${decreasingTimerOverlay}' -`);
		console.log(`- LOG -- 'ifVolOverlay' IS: '${ifVolOverlay}' -`);
		// console.log(`- LOG -- ISDISOPEN INFO: '${}' -`);
	}, 500);
}











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
		repeat: `repeat is${undefined}`,
	};

	win.setThumbnailClip({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	win.setThumbarButtons([{
		tooltip: 'button1',
		icon: nativeImage.createFromPath(path.join(__dirname, 'button1.png')),
		click() {
			console.log('button1 clicked')
		}
	}, {
		tooltip: 'button2',
		icon: nativeImage.createFromPath(path.join(__dirname, 'button2.png')),
		flags: ['enabled', 'dismissonclick'],
		click() {
			console.log('button2 clicked.')
		}
	}])

	// win.setThumbarButtons([
	// 	// {
	// 	// 	icon: getNativeImage('resources/assets/images/Left.png')
	// 	// },
	// 	{
	// 		tooltip: "Previous Song",
	// 		icon: getNativeImage("../resources/assets/images/prev.png"),
	// 		click() { executeJavaScript("document.querySelector('#left-controls > div > tp-yt-paper-icon-button.previous-button.style-scope.ytmusic-player-bar').click()"), console.log("Pressed Right"); },
	// 	},
	// 	{
	// 		tooltip: "Play",
	// 		icon: getNativeImage("../resources/assets/images/play.png"),
	// 		async click() {
	// 			var result = await executeJavaScript(
	// 				"document.getElementById('play-pause-button').click()"
	// 			);
	// 			result.click();
	// 			console.log("Pressed Middle");
	// 		},
	// 	},
	// 	{
	// 		tooltip: "Next Song",
	// 		icon: getNativeImage("../resources/assets/images/next.png"),
	// 		async click() {
	// 			var result = await executeJavaScript(
	// 				"document.querySelector('#left-controls > div > tp-yt-paper-icon-button.next-button.style-scope.ytmusic-player-bar').click()"
	// 			);
	// 			result.click();
	// 			console.log("Pressed Left");
	// 		},
	// 	},
	// 	// {
	// 	// 	icon: getNativeImage('resources/assets/images/Right.png')
	// 	// },
	// ]);

	let isPaused = (paused === 'Play');

	if (!title && !artist) {
		// Handle no audio playing
		win.setProgressBar(-1); // Remove the progress bar
		win.setOverlayIcon(null, "Browsing");
	} else {
		// Handle audio playing or paused
		let progress = time[0] / time[1];
		let mode = isPaused ? "paused" : "normal";
		let color = isPaused ? '#FFFF00' : '#00FF00'; // Yellow when paused, green when playing

		if (process.platform === "win32") {
			win.setProgressBar(progress, {
				mode: mode,
				color: color
			});
		} else {
			win.setProgressBar(progress);
		}

		// Update any other UI elements based on the state
	}

}

rpc.once("disconnected", (title) => {
	rpc.destroy();
	win.webContents.send('updateConfigUpdates', "#007aFF");
	clearInterval(afterSend);
	clearInterval(setActivity);
	// setInterval(checkSync, config.resyncSongUrl);
	// clearInterval(syncTimeSync);
	clearInterval(updateSongInfo);
	clearInterval(setPageName);
	// clearInterval(isDiscordRunning); DONT STOP DISCORD CHECK FROM HAPPENING NATE... WHAT IS THIS SUPPOSED TO MEAN PAST NATE??
	clearInterval(setLargeIconImage);
	clearInterval(intervalId);

	// reconnectTimer = setInterval(reconnect, 5e3);
	ConnectDis = " [ Disconnected ]";
});

function reconnect() {
	rpc = new DiscordRPC.Client({
		transport: "ipc",
	});
	DiscordRPC.register(clientId);
	rpc.login({
			clientId
		}).catch(console.error)
		.then(() => {
			clearInterval(reconnectTimer);
			ConnectDis = " [ Connected ]";
			console.log("-- Connected --");
			if (buttonOne == true || buttonTwo == true || buttonThree == true || buttonFour == true) {
				win.setTitle(
					`${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			} else {
				win.setTitle(
					`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			}
		})
		.catch((err) => {
			rpc = null;
			console.error(err);
			ConnectDis = " [ Disconnected ]";
			if (buttonOne == true || buttonTwo == true || buttonThree == true || buttonFour == true) {
				win.setTitle(
					`${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			} else {
				win.setTitle(
					`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			}
		});
}


function getNativeImage(filePath) {
	return nativeImage.createFromPath(
		path.join(process.cwd(), resourcePath, filePath)
	);
}

function setPageName() {
	if (isDisOpen == true) {
		if (buttonOne == true || buttonTwo == true || buttonThree == true || buttonFour == true) {
			try {
				win.setTitle(
					`${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			} catch (error) {
				console.error("Failed to set window title 1:", error);
			}
		} else {
			try {
				win.setTitle(
					`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
				);
			} catch (error) {
				console.error("Failed to set window title 2:", error);

			}
		}
	}
}

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

rpc.on("ready", () => {
	setActivity();
	setInterval(setActivity, 1e3);
	// setInterval(reloadImageUrl, 5e3);
	// setInterval(syncTimeSync, 1e8);
	//setInterval(fullSync, 1e3);
	setInterval(updateSongInfo, 1e3);
	setInterval(setPageName, 1e3);
	// setInterval(isDiscordRunning, 3e3);
	setTimeout(setLargeIconImage, 10000);
	setInterval(setUserPageImage, 2000);
	ConnectDis = " [ Connected ]";
});

function afterSend() {
	rpc.login({
		clientId
	})
	// setTimeout(afterSend, 5000); // Rerun the function after 5 seconds
	clearInterval(intervalIdDisco);
	// isDiscordRunningVar = true;
}

function afterRecieve() {
	if (!isDisOpen == true) {
		rpc.destroy();
		isDisOpen = false;
		// setInterval(isDisOpenInterval);
		console.log(`- LOG -- EXECUTED 'afterRecieve' func -`);
	}
	if (isDisOpen == true) {
		aftersendStatus = true;
		// setTimeout(2000, afterSend);
		console.log(`- LOG -- AFTERSEND SENT -`);
		clearInterval(intervalIdDisco);
		const clientId = config.discordID; /* 633709502784602133*/
		DiscordRPC.register(clientId);
		console.log(`- LOG -- STARTED DISCORDRPC CONNECTION -`);
	}
	console.log(`- LOG -- EXECUTED FUNCTION 'afterRecieve' -`);
}