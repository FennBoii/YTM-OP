const { contextBridge, ipcRenderer } = require('electron');
const axios = require('axios');
const path = require("path");
const fs = require('fs');
const os = require('os');
const WebSocket = require('ws');
const yaml = require('js-yaml')

contextBridge.exposeInMainWorld('axios', axios);
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

const configPath = path.resolve(os.homedir(), 'config.yaml');
const yamlConfigUrl  = "https://raw.githubusercontent.com/FennBoii/YTM-OP/underConstruction/config.yaml";

var config = {};

refreshConfig();

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

function downloadDefaultConfig() {
    try {
        // Fetch the YAML configuration file from the URL
        console.log('Fetching YAML configuration from URL...');
        const response = axios.get(yamlConfigUrl);
        const yamlData = response.data;

        config = yaml.load(yamlData) || {};


        fs.writeFileSync(configPath, yamlData, 'utf8');
        console.log('Config file fetched and saved successfully.');
        
        console.log('Loaded configuration:', config);
    } catch (err) {
        console.error('Error fetching or parsing config file:', err);
        config = {};
    }
}

// const baseURL = 'https://getname.ytmopdata.net/token_verifier.php'; // Replace with your base URL

// async function sendData() {
//     try {
//         const response = await axios.get(`${baseURL}/token_verifier.php`, { params: theData });
//         console.log('Tokens response:', response.data);

//         console.log("success variable:", response.data.success);
//         if (response.data.success === true) {
//             setTimeout(success, 1000);
//             function success() {
//                 const beginningTitleElement = document.getElementById('BeginningTitle');
//                 const beginningTitleElement2 = document.getElementById('BeginningTitle2');
//                 if (beginningTitleElement) {
//                     // Modify the element as needed
//                     beginningTitleElement2.textContent = 'Success!';
//                     beginningTitleElement.textContent = 'Tokens Matched!';
//                 }

//                 const myElement = document.getElementById('BeginningTitle');
//                 if (myElement) {
//                     myElement.style.color = 'green'; // Change to any desired color
//                 }

//                 if (beginningTitleElement) {
//                     // Modify the element as needed
//                     beginningTitleElement.textContent = 'Loading last url...';
//                 }
//                 setTimeout(finalSuccess, 1000);
//             }
//             function finalSuccess() {
//                 ipcRenderer.send('key-exchange-successful');
//                 window.close();
//             }
//         } else {
//             setTimeout(fail, 1000);
//             function fail() {
//                 const beginningTitleElement = document.getElementById('BeginningTitle');
//                 const beginningTitleElement2 = document.getElementById('BeginningTitle2');
//                 if (beginningTitleElement) {
//                     // Modify the element as needed
//                     beginningTitleElement2.textContent = 'Failed!';
//                     beginningTitleElement.textContent = 'Tokens Not Matched!';
//                 }

//                 if (beginningTitleElement) {
//                     beginningTitleElement.style.color = 'red'; // Change to any desired color
//                 }

//                 if (beginningTitleElement) {
//                     // Modify the element as needed
//                     beginningTitleElement.textContent = 'Loading token page...';
//                 }
//                 setTimeout(finalFail, 1000);
//             }
//             function finalFail() {
//                 ipcRenderer.send('open-failed-url', 'https://getname.ytmopdata.net/');
//                 console.log(response.data.error);
//                 window.close();
//             }
//         }
//     } catch (error) {
//         console.error('Error tokens response:', error.message);
//     }
// }





sendData();

async function sendData() {
    const url = `wss://getname.ytmopdata.net/${config.websocketName}`;

    try {
        const isConnected = await connectWebSocket(url);

        if (isConnected) {
            await handleSuccess();
        } else {
            await handleFailure();
        }
    } catch (error) {
        console.error('Error in WebSocket connection:', error.message);
        await handleFailure();
    }
}

function connectWebSocket(url) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('Connection opened.');
            ws.close(); // Close immediately if only testing the connection
            resolve(true);
        };

        ws.onerror = (error) => {
            console.error('Connection error:', error);
            resolve(false);
        };
    });
}

async function handleSuccess() {
    updateDOM('Success!', 'Tokens Matched!', 'green', 'Loading last url...');
    setTimeout(() => {
        ipcRenderer.send('key-exchange-successful');
        window.close();
    }, 1000);
}

async function handleFailure() {
    downloadDefaultConfig();
    updateDOM('Failed!', 'Tokens Not Matched!', 'red', 'Loading token page...');
    setTimeout(() => {
        ipcRenderer.send('open-failed-url', 'https://getname.ytmopdata.net/');
        window.close();
    }, 1000);
}

function updateDOM(titleText, subtitleText, color, statusText) {
    const beginningTitleElement = document.getElementById('BeginningTitle');
    const beginningTitleElement2 = document.getElementById('BeginningTitle2');

    if (beginningTitleElement) {
        beginningTitleElement.textContent = titleText;
        beginningTitleElement.style.color = color;
    }
    if (beginningTitleElement2) {
        beginningTitleElement2.textContent = subtitleText;
    }

    const statusElement = document.getElementById('BeginningTitle');
    if (statusElement) {
        statusElement.textContent = statusText;
    }
}




console.log("loaded preload.js");
