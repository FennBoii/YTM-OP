// const { ipcRenderer } = require('electron');

// const nodeAlsaCtl = require("node-alsa-ctl");

console.log('The Preload file has been loaded.');

// function init() {
// 	window.isElectron = true;
// 	window.ipcRenderer = ipcRenderer;
// 	window.Boolean = true;
// }

// init();

// var THEEXEC = 'Y:/Downloads/YTM-OP/svcl.exe /Stdout /GetPercent "Realtek High Definition Audio\Device\Speakers\Render"'

// const { exec } = require("child_process")
// exec(THEEXEC, function(err, stdout, stderr, data) {
//   // function will get here with a fully populated stdout
//   // when command
//   console.log(stdout);
//   console.log(stderr);
//   console.log(err);
//   console.log(data);
// })

// var exec = require('child_process').exec;

// 				var OUTPUT = exec('Y:/Downloads/YTM-OP/svcl.exe /Stdout /GetPercent "Realtek High Definition Audio\Device\Speakers\Render"',
// 					function (error, stdout, stderr) {
// 						console.log('stdout: ' + stdout);
// 						console.log('stderr: ' + stderr);
// 						console.log(OUTPUT);
// 						if (error !== null) {
// 							console.log('exec error: ' + error);
// 						}
// 					});

// const { spawn } = require('node:child_process');
// const ls = spawn('Y:/Downloads/YTM-OP/svcl.exe /Stdout /GetPercent "Realtek High Definition Audio\Device\Speakers\Render"');

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// const { exec } = require('node:child_process')

// exec('svcl.exe /Stdout /GetPercent "Realtek High Definition Audio\Device\Speakers\Render" > ouputFILE.txt', (err, output) => {
//     if (err) {
//         console.error("could not execute command: ", err);
//         return
//     }
//     console.log(output);
// })

// async function soundDevices(err, stdout, stderr) {
// 	let volumes = await soundVolume.listSoundVolumes({
// 		type: "Application",
// 		direction: "Render",
// 	});
// 	console.log(volumes);
// 	console.log(err);
// 	console.log(stdout);
// 	console.log(stderr);
// }

// const loudness = require('loudness');

// async function soundDevices(err) {
//     const vol = await loudness.getVolume();
//     console.log(vol);
// }

// soundDevices();