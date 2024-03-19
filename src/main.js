process.on('unhandledRejection', (error) => {
	console.error('Unhandled Promise Rejection:', error);
	// Add additional error handling logic as needed
});

// var scrapeWebContent = require('app.scrapeWebContent');
/* eslint-disable no-inline-comments */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* ---------------------------------DEFINE BEFORE RUN--------------------------------- */
const DiscordRPC = require("discord-rpc");
const crypto = require('crypto');
const easyVolume = require("easy-volume");
const os = require('os');
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
const { spawn, ChildProcess } = require("child_process");
const { setTimeout } = require("timers/promises");



const configUrl = 'https://raw.githubusercontent.com/FennBoii/YTM-OP/master/config.json';
let configPath = path.resolve(os.homedir(), 'config.json');
console.log(configPath);
function refreshConfig() {
	try {
		// Try to read the config file from the specified path
		config = JSON.parse(fs.readFileSync(configPath, "utf8"));
	} catch (error) {
		if (error.code === 'ENOENT') {
			// File doesn't exist in the specified path, try default location
			console.error('Config file not found in specified path:', configPath);
			console.log('Attempting to read config file from default location...');
			configPath = path.resolve(os.homedir(), 'config.json');
			try {
				config = JSON.parse(fs.readFileSync(configPath, "utf8"));
			} catch (defaultError) {
				console.error('Error reading config file from default location:', defaultError);
				console.log('Creating a new config file...');
				// Create a new config file
				fs.writeFileSync(configPath, '{}');
				config = {};
			}
		} else {
			// Other error, log and rethrow
			console.error('Error reading config file:', error);
			throw error;
		}
	}
}

function downloadDefaultConfig() {
	axios.get('https://raw.githubusercontent.com/FennBoii/YTM-OP/master/config.json')
		.then(response => {
			// Convert response.data to a string
			const dataString = JSON.stringify(response.data);

			// Write the string data to the local config file
			fs.writeFileSync(configPath, dataString);
			console.log('Default config file downloaded successfully.');
			app.quit();
			app.relaunch();
		})
		.catch(error => {
			console.error('Failed to download default config file:', error);
		});
}

if (!fs.existsSync(configPath)) {
	// Download the default config file if it doesn't exist
	downloadDefaultConfig();
} else {
	console.log('Config file already exists.');
}

let blockMediaKeys = false;
var config = {};

refreshConfig(); // Initialize config

function updateConfigFile(key, value) {
	refreshConfig();
	config[key] = value;
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}














/* ---------------------------------DEFINE FUNCTIONS--------------------------------- */
refreshConfig();
var publicPageURL;
var thelink, VersionNumber, synctimeGET, systemVolume = 0, ToggleButtons = true, ChannelToggle = false, TogglePlaylist = true, ToggleArtist = true, volume = 0, artist, songUrl = "https://music.youtube.com", titleTwo = "", detailsTwo = "- Loading -", stateTwo = "- Loading -", ConnectDis = " [ Disconnected ]", detailsThree = "Default", channel = "https://music.youtube.com", error_bool = false, PlaylistCounter = "", ConnectionTitle = "", RealCountdown, CountdownTime, secondTitle = true, thirdTitle = true, textView = false, paused, imageicon, repeat, playlist, channelname, Explicit, join1, join2, timeNow = 1, timeMax, notPlayingDisconnect = false, notPlayingDisconnectText = "", buttonOne = false, buttonTwo = false, buttonThree = false, buttonFour = false, warningText = "", getNAME, TitleExit = "", quitText = "", connectCounter = 1, RealCountdownTitleBar = "", CountdownTimerVar = false, sysVol, LICKCHeck = "", playlistToggleVisible = true;
var ToggArtAlb = false, configWindow, finalContactVar, GfinalContactVar, urlFinal, outputTest, title, ImageIcon, playlistname, FINALTHREEVAR, joinn1, joinn2, largeImageText, plaaylist, largeImageKey, details, state, ThirdEntry, qualities = 0, result, timeMaxMinus, startTimestamp, endTimestamp, stopTime = 0, timeoutDisco = 0, globalCounter = 0, imgVer = 0, globalDisconnect = false, theFinalowoNess = "Nada There is nothing YET NONEEEEE", systemVolumeDEC;
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
			reject(new Error('Window or webContents is not initialized.'));
		} else {
			win.webContents.executeJavaScript(code)
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		}
	});
}



// fs.readFile("./currentPath.txt", 'utf-8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     const currentLocation = config.SETlocation;
//     const newLocation = config.MOVElocation;

//     if (newLocation && fs.existsSync(newLocation)) {
//         fs.rename(currentLocation, newLocation, (err) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }

//             config.SETlocation = newLocation; // Update parsedConfig, not the outer config
//             fs.writeFile(config.SETlocation, JSON.stringify(config), (err) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }

//                 console.log(`File moved from ${currentLocation} to ${newLocation}`);
//             });
//         });
//     } else {
// 		console.log("LOCATIONS");
// 		console.log("-----------------");
// 		console.log(config.SETlocation);
// 		console.log(config.MOVElocation);
// 		console.log("-----------------");
//         console.error(`Invalid new location: ${newLocation}`);
//     }
// });

function SETITSNAME() {
	// console.log('-- Welcome Back ' + config.username + ' --');
	console.log("-- " + config.username + " --");
}

process.stdout.write("\x1Bc");
setTimeout(SETITSNAME, 600);

function checkSync() {
	if (ConnectionTitle.includes("-- Sending --")) {
		const baseURL = "https://getname.ytmopdata.net/changeTheLink.php";

		const theLinkData = {
			siteName: config.nameToken,
			givenNameToken: config.givenNameToken,
			randomToken: config.randomToken,
			thelink: songUrl.toString(),
		};

		async function updateTheLink() {
			try {
				const response = await axios.get(`${baseURL}/updateTheLink.php`, {
					params: theLinkData,
				});
				console.log('Update "thelink" response:', response.data);
			} catch (error) {
				console.error('Error updating "thelink":', error.message);
			}
		}

		updateTheLink();

	} else if (ConnectionTitle.includes("-- Recieving --")) {
		const phpScriptURL = "https://getname.ytmopdata.net/token_verifier.php";

		const queryParameters = {
			siteName: config.nameToken,
			givenNameToken: config.givenNameToken,
			randomToken: config.randomToken,
		};

		axios.get(phpScriptURL, {
			params: queryParameters,
		})
			.then((response) => {
				const { thelink, synctime } = response.data;
				synctimeGET = response.data.synctime;

				const timeParamStart = thelink.indexOf("&t=") + 3;
				const timeParamValue = thelink.substring(timeParamStart);

				const linkWithoutTimeParam = thelink.slice(
					0,
					thelink.indexOf("&t=") + 3
				);
				const linksCombined = linkWithoutTimeParam + timeParamValue;

				if (songUrl == linksCombined) {
					// Check the time difference
					if (Math.abs(synctime - timeNow) < config.outOfSyncPlayingSong) {
						console.log("This doesn't need to be synced again");
					} else {
						win.webContents.executeJavaScript(
							`document.getElementsByTagName('video')[0].currentTime = ${synctime}`
						);
						console.log("syncedTime");
					}
				} else {
					win.loadURL(thelink);
					console.log("Reloaded for some reason");
				}
			})
			.catch((error) => {
				if (error.response) {
					// The request was made, but the server responded with an error status code
					console.error(
						"Server responded with status code:",
						error.response.status
					);
					console.error("Response data:", error.response.data);
				} else if (error.request) {
					// The request was made, but no response was received
					console.error("No response received from the server.");
				} else {
					// Something else went wrong
					console.error("Error:", error.message);
				}
			});
	} else {
		console.log("rawerrrrrr~");
	}
	console.log("executed rawerr~");
}

function syncTimeSync() {
	if (ConnectionTitle.includes("-- Sending --")) {
		const baseURL = "https://getname.ytmopdata.net/changeSyncTime.php"; // Replace with your base URL

		// Define the data for updating the "synctime" value
		const syncTimeData = {
			siteName: config.nameToken,
			givenNameToken: config.givenNameToken,
			randomToken: config.randomToken,
			synctime: timeNow,
		};

		async function updateSyncTime() {
			try {
				const response = await axios.get(baseURL, {
					params: syncTimeData,
				});
				console.log('Update "synctime" response:', response.data);
			} catch (error) {
				console.error('Error updating "synctime":', error.message);
			}
		}

		updateSyncTime();
	}
	console.log("executed synctime");
}

let win, settingsWin;
const menuTemplate = [
	{
		label: "Utils",
		submenu: [
			{
				label: "RefreshImage",
				click() {
					reloadImageUrl();
					setLargeIconImage();
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
				label: "Sites",
				submenu: [
					{
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
				submenu: [
					{
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
				submenu: [
					{
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
				submenu: [
					// {
					// 	label: '- Button Stats -',
					// 	label:	PlaylistCounter,
					// },
					{
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
				label: "Incoming Connections",
				submenu: [
					{
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
						label: "Recieving",
						click() {
							ConnectionTitle = " [ -- Recieving -- ]";
						},
					},
				],
			},
			{
				label: "Extra",
				submenu: [
					{
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
	// Quit the application
	app.quit();
	app.relaunch();
});

ipcMain.on("load-config", (event) => {
	fs.readFile(
		path.join(configPath),
		"utf8",
		(err, data) => {
			if (err) {
				// Handle the error
				console.error("Error reading the config file", err);
				return;
			}
			const config = JSON.parse(data);
			console.log("Sending config data:", config); // Check the entire config object
			event.sender.send("config-loaded", config);
		}
	);
	console.log("executed load-Config");
});

// Listen for a request to save the updated config file
ipcMain.on("save-config", (event, updatedConfig) => {
	fs.writeFile(
		configPath,
		JSON.stringify(updatedConfig, null, 2),
		"utf8",
		(err) => {
			if (err) {
				// Handle error
				return;
			}
			// Optionally, confirm that the file was saved
			event.sender.send("config-saved", "success");
		}
	);
	console.log("executed saveConfig");
});

ipcMain.on("request-config", (event) => {
	fs.readFile(configPath, "utf8", (err, data) => {
		if (err) {
			// Handle error, maybe send an error message back to renderer
			console.error("Error reading the file", err);
			event.reply("config-response", {
				error: err.message,
			});
			return;
		}
		event.reply("config-response", {
			data: JSON.parse(data),
		});
	});
	console.log("executed request-Config");
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
	console.log("executed FocusElectronApp");
}


const SimpleTemplate = [
	{
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
			shell.openExternal('https://getname.ytmopdata.net/userRedirects/' + config.nameToken + "/" + config.nameToken + ".html");
		},
	},
];

function createConfigWindow() {
	configWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
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

	console.log("executed CreateConfigWindow")
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
		width: 800,
		height: 700,
		webPreferences: {
			// preload: path.join(process.cwd(), 'src', 'preload.js'),
			preload: path.join(__dirname, "preload.js"),
		},
	});
	settingsWin.setMinimumSize(300, 300);
	settingsWin.setResizable(true);
	Menu.setApplicationMenu(menu);
	settingsWin.setMenuBarVisibility(true);
	console.log("executed createSettingsWindow");
}

function createPREWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		icon: "resources/assets/images/Youtube-Music-logo.png",
		webPreferences: {
			// preload: path.join(process.cwd(), 'src', 'preload.js'),
			preload: path.join(__dirname, "../PRE/preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
		},
	});

	win.loadFile("PRE/index.html");

	// Listen for message from PRE app
	ipcMain.on('key-exchange-successful', () => {
		// Open the main window
		createWindow();
		if (!config.loadLastURL.includes("music")) {
			win.loadURL("https://music.youtube.com/")
		}
	});
	ipcMain.on('open-failed-url', () => {
		// Open the main window
		createWindow();
		win.loadURL("https://getname.ytmopdata.net/")
	});
	console.log("executed createPREWindow");

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
}


function toggleBlockMediaKeys(block) {
	blockMediaKeys = block;
}

function createWindow() { // lower0
	// Create the browser window.
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		icon: "resources/assets/images/Youtube-Music-logo.png",
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	let albumORsong = config.albumORsong;

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
		var { time } = tempInfo || {
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

	setInterval(() => {
		// systemVolume++;
		win.webContents.send('updateSystemVolume', "system vol:\n" + systemVolumeDEC);
	}, 1000); // Update every 5 seconds

	setInterval(() => {
		// volume++;
		win.webContents.send('updatePlayerVolume', "player vol:\n" + volume);
	}, 1000); // Update every 5 seconds

	// win.webContents.on("dom-ready", settingsHook);
	win.webContents.on("will-prevent-unload", (e) => e.preventDefault());
	console.log("executed createWindow");

}










app.on("ready", createPREWindow);
app.on("ready", focusElectronApp);


ipcMain.on("sendDataToMain", (event, dataToUpdate) => {
	const filePath = path.join(configPath);

	// Read the existing JSON file
	fs.readFile(filePath, "utf8", (readErr, data) => {
		if (readErr) {
			console.error("Error reading file:", readErr);
			event.sender.send("updateResponse", {
				success: false,
				error: readErr.message,
			});
			return;
		}

		// Parse the existing data
		let config = JSON.parse(data);

		// Merge the new data with the existing data
		let mergedData = {
			...config,
			...dataToUpdate,
		};

		// Write the updated object back to the file
		fs.writeFile(
			filePath,
			JSON.stringify(mergedData, null, 2),
			"utf8",
			(writeErr) => {
				if (writeErr) {
					console.error("Error writing to file:", writeErr);
					event.sender.send("updateResponse", {
						success: false,
						error: writeErr.message,
					});
				} else {
					console.log("File updated with merged data successfully.");
					// Send success response back to the renderer
					event.sender.send("updateResponse", {
						success: true,
						message: "Data received and file updated",
					});
					event.sender.send("configData", {
						success: true,
						config: mergedData,
					});
				}
			}
		);
	});
	console.log("executed senddatatomain");
	loadCurrentGivenURL();
});

function loadCurrentGivenURL() {
	win.loadURL(config.loadLastURL);
}

let efyud = 0;
if (efyud == 0) {
	setTimeout(10000, reloadPage);
	efyud += 1;
	console.log("DIDMEDIDIT");
}
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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			titleResult = await executeJavaScript(javascriptCode);
			// console.log("Load0-1");
			if (titleResult.length > 50) {
				title = titleResult.substring(0, 50);
				titleTwo = titleResult.substring(0, 49);
			} else {
				title = titleResult;
				titleTwo = titleResult;
			}
		} catch (error) {
			// console.log("Load0-2");
			console.log("Script error, title:", error); // Log any errors
			console.log("ERRORED title OBJECT");
		}

		// artist Name Get Element
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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			let artiste = await executeJavaScript(javascriptCode);
			artist = artiste.split(" • ")
			// console.log("Load2-1");
		} catch (error) {
			// console.log("Load2-2");
			console.log("Script error:", error); // Log any errors
		}

		// timeNow Name Get Element
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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
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
			// console.log("Load3-2");
			console.log("Script error:", error); // Log any errors
		}

		// timeMax Name Get Element
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
									} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
										clearInterval(interval);
										resolve('None'); // Resolve with 'None' instead of rejecting
									}
								}, 500); // Check every 500ms
							});
						})();
					`;
			timeMax = await executeJavaScript(javascriptCode);
			// console.log("Load4-1");
		} catch (error) {
			// console.log("Load4-2");
			console.log("Script error:", error); // Log any errors
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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('None'); // Resolve with 'None' instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			paused = await executeJavaScript(javascriptCode);
			// console.log("Load5-1");
		} catch (error) {
			// console.log("Load5-2");
			console.log("Script error:", error); // Log any errors
		}

		// repeat Get Element
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
						} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;

			repeat = await executeJavaScript(javascriptCode);
			// console.log("Load6-1");
		} catch (error) {
			console.log("Script error, ImageIcon:", error); // Log any errors
			console.log("ERRORED REPEAT OBJECT");
			// console.log("Load6-2");
		}


		// result = await executeJavaScript('document.querySelector(\'#movie_player > div.ytp-chrome-top > div.ytp-title > div > a\').href');
		if (win.webContents.getURL() != null) {
			result = win.webContents.getURL();
			// console.log("Load7-1");
		}
		if (result.includes("watch?v")) {
			songUrl = result;
		}
		if (!result) {
			// console.log("Load7-2");
			return reject('Error grabbing song url');
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
						} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;

			playlistname = await executeJavaScript(javascriptCode);
			// console.log("Load8-1");
		} catch (error) {
			// console.log("Load8-2");
			console.log("Script error:", error); // Log any errors
			console.log("ERRORED playlistName OBJECT");
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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								clearInterval(interval);
								resolve('https://google.com'); // Resolve with the default URL instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			playlist = await executeJavaScript(javascriptCode);
			// console.log("Load9-1");
			// Additional logic here...
			if (playlist == "https://google.com") {
				TogglePlaylist = false;
			} else {
				TogglePlaylist = true;
			}
		} catch (error) {
			// console.log("Load9-2");
			console.log("Script error:", error); // Log any errors
			console.log("ERRORED playlist OBJECT");
		}

		// Channel Link Get Element
		try {
			const javascriptCode = `
				(function() {
					console.log('Script started for fetching channel'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							console.log('Checking for channel element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								console.log('Channel element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.href);
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								console.log('Timeout reached, channel element not found'); // Log timeout
								clearInterval(interval);
								resolve('https://google.com'); // Resolve with the default URL instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;
			channel = await executeJavaScript(javascriptCode);
			// console.log("Load10-1");
			if (channel == "https://google.com") {
				ToggleArtist = false;
			}
			if (channel != "https://google.com") {
				ToggleArtist = true;
			}
		} catch (error) {
			// console.log("Load10-2");
			console.error("Script error for fetching channel:", error); // Log any errors
			channel = "https://google.com/";
			console.log("ERRORED channel OBJECT");
		}

		// Channel Name Get Element
		if (ChannelToggle == true) {
			const javascriptCode = `
				(function() {
					console.log('Script started for fetching channel name (ChannelToggle == true)'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							console.log('Checking for channel name element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								console.log('Channel name element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.innerText);
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								console.log('Timeout reached, channel name element not found'); // Log timeout
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
			}
			if (channelname != "Unknown Channel") {
				ToggleArtist = true;
			}
		} else if (ChannelToggle == false) {
			const javascriptCode = `
				(function() {
					console.log('Script started for fetching channel name (ChannelToggle == false)'); // Log start
					return new Promise((resolve) => {
						const startTime = Date.now();
						const interval = setInterval(() => {
							console.log('Checking for alternative channel name element...'); // Log each check
							const element = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)');
							if (element) {
								console.log('Alternative channel name element found:', element); // Log element found
								clearInterval(interval);
								resolve(element.textContent);
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
								console.log('Timeout reached, alternative channel name element not found'); // Log timeout
								clearInterval(interval);
								resolve('Unknown Channel'); // Resolve with a default value instead of rejecting
							}
						}, 500); // Check every 500ms
					});
				})();
			`;

			channelname = await executeJavaScript(javascriptCode);
			// console.log("Load11-1");
			if (channelname == "Unknown Channel") {
				// console.log("Load11-2");
				ToggleArtist = false;
			}
			if (channelname != "Unknown Channel") {
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
						} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
							clearInterval(interval);
							resolve('None'); // Resolve with 'None' instead of rejecting
						}
					}, 500); // Check every 500ms
				});
			})();
			`;
			Explicit = await executeJavaScript(javascriptCode);
			// console.log("Load12-1");
		} catch (error) {
			// console.log("Load12-2");
			console.log("Script error:", error); // Log any errors
		}

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
							} else if (Date.now() - startTime > 1000) { // Timeout after 1 second
								clearInterval(interval);
								resolve(0); // Resolve with 0 if slider is not found
							}
						}, 500); // Check every 500ms
					});
				})();
				`;

			volume = await executeJavaScript(javascriptCode);
			// console.log("Load13-1");
		} catch (error) {
			// console.log("Load13-2");
			console.log("Script error:", error); // Log any errors
			console.log("ERRORED volume OBJECT");
		}


		// Get Volume
		// getVolume().then(volume => {
		// 	console.log('Volume:', volume);
		// }).catch(error => {
		// 	// console.error('Error:', error);
		// 	console.log("CAUGHT ERROR VOLUME");
		// });



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
		}
		if ((TogglePlaylist == true) & (ToggleArtist == false)) {
			PlaylistCounter = "playlist = true, artist = false";
		}
		if ((TogglePlaylist == false) & (ToggleArtist == true)) {
			PlaylistCounter = "playlist = false, artist = true";
		}
		if ((TogglePlaylist == true) & (ToggleArtist == true)) {
			PlaylistCounter = "playlist = true, artist = true";
		}

		timeMaxMinus = timeMax - 3;
		CountdownTime = timeMax - timeNow;
		RealCountdown = CountdownTime - 3;

		if (CountdownTimerVar == true) {
			RealCountdownTitleBar = " [ Countdown Till End: " + RealCountdown + " ]";
		}

		if (CountdownTimerVar == false) {
			RealCountdownTitleBar = "";
		}

		if (buttonFour == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";
				var exec = require("child_process").exec;

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
		}

		if (buttonThree == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";
				var exec = require("child_process").exec;

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
		}

		if (buttonTwo == true) {
			if (timeNow == timeMaxMinus) {
				rpc.destroy();
				ConnectDis = " [ Disconnected ]";
				var exec = require("child_process").exec;

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
		}

		if (buttonOne == true) {
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
		}

		if (ToggArtAlb == true) {
			join2 = Dash + config.AlternateTopButtonValue + Dash;
			join1 = Dash + config.AlternateBottomButtonValue + Dash;
		}

		let albumORsong = config.albumORsong;

		if (albumORsong == "song") {
			if (title && playlist) {
				updateConfigFile("loadLastURL", songUrl.toString());
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

		// var newPlaylist = playlistname.split('music.')[1];
		// var playlistnameTwo = `https://music.${newPlaylist}`;
		// console.log(playlistnameTwo);

		var expanse0 = "-------------------------------------------";
		var expanse1 = "-------------------------------------------";
		var expanse2 = "-";
		var expanse3 = "-";
		var expanse4 = "-------------------------------------------";
		var expanse5 = "-------------------------------------------";

		const executablePath = "C:/Program Files/YTM-OP/VolumeFind.exe";

		const child = spawn(executablePath);

		child.stdout.on("data", (data) => {
			let secondString = data.slice(0, -2);
			systemVolume = Math.floor(parseFloat(secondString));
		});

		// Create Element Section
		if (textView == true) {
			document.createElement("textarea");
		}

		publicPageURL = win.webContents.getURL();

		globalCounter += 1;

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
			globalCounter,
			time: [timeNow, timeMax],
			expanse5,
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
			stopTime,
			timeoutDisco,
			notPlayingDisconnect,
			connectCounter,
			imgVer,
			theFinalowoNess,
			blockMediaKeys,
			toggleBlockMediaKeys,
			// CountdownTimerVar, thelink, VersionNumber, synctimeGET, systemVolume, ToggleButtons, ChannelToggle, TogglePlaylist, ToggleArtist, volume, artist, songUrl, titleTwo, detailsTwo, stateTwo, ConnectDis, detailsThree, channel, error_bool, PlaylistCounter, ConnectionTitle, RealCountdown, CountdownTime, secondTitle, thirdTitle, textView, paused, imageicon, repeat, playlist, channelname, Explicit, join1, join2, timeNow, timeMax, notPlayingDisconnect, notPlayingDisconnectText, buttonOne, buttonTwo, buttonThree, buttonFour, warningText, getNAME, TitleExit, quitText, connectCounter, RealCountdownTitleBar, CountdownTimerVar, sysVol, LICKCHeck, playlistToggleVisible,
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
					} else if (Date.now() - startTime > 1000) { // Timeout after 1 seconds
						clearInterval(interval);
						resolve('None'); // Resolve with 'None' instead of rejecting
					}
				}, 500); // Check every 500ms
			});
		})();
	`;

		imageicon = await executeJavaScript(javascriptCode);
	} catch (error) {
		console.log("Script error, imageIcon:", error); // Log any errors
	}


	let url1 = imageicon.replace("w60", "w512");
	urlFinal = url1.replace("h60", "h512");
	// console.log("urlFinal =", urlFinal);
	let finalURL = encodeURIComponent(urlFinal);

	const baseURL = 'https://getname.ytmopdata.net/webpageEdit.php'; // Replace with your base URL

	const theLinkData = {
		givenNameToken: config.givenNameToken,
		randomToken: config.randomToken, // Replace with your token values
		sitename: config.nameToken, // Replace with your siteName
		thelink: finalURL,
		imgVer: imgVer,
	};

	try {
		const response = await axios.get(`${baseURL}/webpageEdit.php`, { params: theLinkData });
		// console.log('Update "thelink" response:', response.data);
		// console.log("response:", response);
	} catch (error) {
		console.error('Error updating "thelink":', error.message);
	} //LOWER1
	imgVer += 1;
}


console.log("TitleTwo Output:" + titleTwo.toString());

getContent()
	.then(data => {
		console.log("SUCCESS" + data);
	})
	.catch(error => {
		console.error("FAILED" + error);
	});

// eslint-disable-next-line no-inline-comments
const clientId = config.discordID; /* 633709502784602133*/
DiscordRPC.register(clientId);

let rpc = new DiscordRPC.Client({
	transport: "ipc",
});

let songInfo;

function setLargeIconImage() {
	// Use stopTime here
	if (title) {
		theFinalowoNess = "https://getname.ytmopdata.net/userRedirects/" + config.nameToken + "/" + config.nameToken + ".png" + '?timestamp=' + stopTime.toString().substring(0, 8) + globalCounter.toString() + '?songName=' + encodeURIComponent(artist[0].toString().substring(3, 0)) + '?v=' + imgVer;
	}
}

// eslint-disable-next-line complexity
function setActivity() {
	if (!rpc || !win) {
		return;
	}

	const { title, time } = songInfo || {
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

	systemVolumeDEC = Math.round(systemVolume);
	VersionNumber = `Player volume is at: ${volume}% System Volume is at: ${systemVolumeDEC}%`;

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
			console.log("yayDONE1");
			ThirdEntry = "▶️ •";
			qualities = 1;
		} else if (repeat.includes("all") && paused == "Pause") {
			console.log("yayDONE2");
			ThirdEntry = "🔁 •";
			qualities = 2;
		} else if (repeat.includes("one") && paused == "Pause") {
			console.log("yayDONE3");
			ThirdEntry = "🔂 •";
			qualities = 3;
		}

		if (repeat.includes("off") && paused == "Play") {
			console.log("bruhNO2")
			ThirdEntry = "⏸ •d";
		}
	}

	if (paused == 'Play' && qualities == 1 && CountdownTimerVar == false) {
		console.log("SetACTbru")
		ThirdEntry = "⏸ •a";
	} else if (paused == 'Play' && qualities == 2 && CountdownTimerVar == false) {
		ThirdEntry = "⏸ •b";
	} else if (paused == 'Play' && qualities == 3 && CountdownTimerVar == false) {
		ThirdEntry = "⏸ •c";
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
			console.log("CUT");
		}
		else {
			NewTitle = `${title}`;
			console.log("CUT-NOT");
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
	} else if (Explicit == 1) {
		NewerTitle = `🅴`;
	}

	if (!title & !artist) {
		console.log("pausedFALSE");
		largeImageKey =
			"https://i.postimg.cc/XNPqqY9f/owo.jpg"; /* https://i.postimg.cc/Y9zgFMdS/uwu.webp */
		largeImageText = "VersionNumberDed"; // ----------------------------- //
		startTimestamp = now;
		endTimestamp = 0;
		detailsTwo = details;
		stateTwo = state;
	} else {
		console.log("pausedTRUE");
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

		console.log("executed setLargeIconImage");

		if (timeNow <= 3 && paused == "Pause") {
			stopTime = Date.now();
			reloadImageUrl();
			setLargeIconImage();
		}

		if (timeNow >= 4) {
			FINALTHREEVAR = theFinalowoNess;
			console.log("I SET THE NEW VALUE");
		}

		if (title) { // LOWER3
			if (repeat.includes("one")) {
				largeImageText = VersionNumber;
				largeImageKey = FINALTHREEVAR;
			}

			if (repeat.includes("one") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}

			if (repeat.includes("all")) {
				largeImageText = VersionNumber;
				largeImageKey = FINALTHREEVAR;

			}
			if (repeat.includes("all") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}

			if (repeat.includes("off")) {
				largeImageText = VersionNumber;
				largeImageKey = FINALTHREEVAR;
			}
			if (repeat.includes("off") && paused == "Play") {
				startTimestamp = 0;
				endTimestamp = 0;
			}
		}

		// SECTION FOR ALL WRITE-OUT DATA WITH THE TERMINAL -- CHECK HERE
		process.stdout.write("\x1Bc");
		console.log("-- Here's Some Info Lovely --\n");
		// console.log('');
		// console.log('--', searchAbout, 'is Forming --\n');
		// console.log('-- Love Is Forming --');
		console.log(songInfo);
		detailsTwo = details;
		stateTwo = state;
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
				buttons: [
					{
						label: `${joinn2}`,
						url: plaaylist,
					},
					{
						label: `${joinn1}`,
						url: channel,
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
				buttons: [
					{
						label: `${joinn1}`,
						url: channel,
					},
				],
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
				buttons: [
					{
						label: `${joinn2}`,
						url: plaaylist,
					},
				],
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
	if (timeoutDisco == 0) {
		rpc.setActivity(activity);
	}
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
	const { title, time } = songInfo || {
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

	win.setThumbarButtons([
		{
			tooltip: 'button1',
			icon: nativeImage.createFromPath(path.join(__dirname, 'button1.png')),
			click() { console.log('button1 clicked') }
		}, {
			tooltip: 'button2',
			icon: nativeImage.createFromPath(path.join(__dirname, 'button2.png')),
			flags: ['enabled', 'dismissonclick'],
			click() { console.log('button2 clicked.') }
		}
	])

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
			win.setProgressBar(progress, { mode: mode, color: color });
		} else {
			win.setProgressBar(progress);
		}

		// Update any other UI elements based on the state
	}

}

rpc.once("disconnected", (title) => {
	rpc.destroy();
	// reconnectTimer = setInterval(reconnect, 5e3);
	ConnectDis = " [ Disconnected ]";
});

function reconnect() {
	rpc = new DiscordRPC.Client({
		transport: "ipc",
	});
	DiscordRPC.register(clientId);
	rpc
		.login({
			clientId,
		})
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
	if (artist && titleTwo) {
		if (buttonOne == true || buttonTwo == true || buttonThree == true || buttonFour == true) {
			win.setTitle(
				`${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
			);
		} else {
			win.setTitle(
				`${titleTwo} - ${stateTwo}${ConnectDis}${TitleExit}${ConnectionTitle}${RealCountdownTitleBar}${notPlayingDisconnectText} ${config.username}`
			);
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
	setInterval(checkSync, config.resyncSongUrl);
	setInterval(syncTimeSync, 1000);
	//setInterval(fullSync, 1e3);
	setInterval(updateSongInfo, 1e3);
	setInterval(setPageName, 1e3);
	setTimeout(setLargeIconImage, 10000);
	ConnectDis = " [ Connected ]";
});

rpc.login({
	clientId,
});
