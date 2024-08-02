const { contextBridge, ipcRenderer } = require('electron');
const axios = require('axios');
const path = require("path");
const fs = require('fs');
const os = require('os');
const yaml = require('js-yaml')

contextBridge.exposeInMainWorld('axios', axios);
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

const configPath = path.resolve(os.homedir(), 'config.yaml');

var config = {};

function refreshConfig() {
    try {
        const data = fs.readFileSync(configPath, "utf8");
        config = yaml.load(data); // Use yaml.load to parse YAML
    } catch (err) {
        console.error("Error reading or parsing config file:", err);
        config = {}; // Set config to an empty object on error
    }
}

function updateConfigFile(key, value) {
    refreshConfig();
    config[key] = value;
    try {
        const yamlData = yaml.dump(config); // Use yaml.dump to stringify YAML
        fs.writeFileSync(configPath, yamlData, "utf8");
    } catch (err) {
        console.error("Error writing to config file:", err);
    }
}

refreshConfig();

const baseURL = 'https://getname.ytmopdata.net/token_verifier.php'; // Replace with your base URL

const theData = {
    givenNameToken: config.givenNameToken, // Replace with your token values
    randomToken: config.randomToken, // Replace with your token values
    siteName: config.nameToken, // Replace with your siteName
};

console.log(config.loadLastURL);

sendData();
async function sendData() {
    try {
        const response = await axios.get(`${baseURL}/token_verifier.php`, { params: theData });
        console.log('Tokens response:', response.data);

        console.log("success variable:", response.data.success);
        if (response.data.success === true) {
            setTimeout(success, 1000);
            function success() {
                const beginningTitleElement = document.getElementById('BeginningTitle');
                const beginningTitleElement2 = document.getElementById('BeginningTitle2');
                if (beginningTitleElement) {
                    // Modify the element as needed
                    beginningTitleElement2.textContent = 'Success!';
                    beginningTitleElement.textContent = 'Tokens Matched!';
                }

                const myElement = document.getElementById('BeginningTitle');
                if (myElement) {
                    myElement.style.color = 'green'; // Change to any desired color
                }

                if (beginningTitleElement) {
                    // Modify the element as needed
                    beginningTitleElement.textContent = 'Loading last url...';
                }
                setTimeout(finalSuccess, 1000);
            }
            function finalSuccess() {
                ipcRenderer.send('key-exchange-successful');
                window.close();
            }
        } else {
            setTimeout(fail, 1000);
            function fail() {
                const beginningTitleElement = document.getElementById('BeginningTitle');
                const beginningTitleElement2 = document.getElementById('BeginningTitle2');
                if (beginningTitleElement) {
                    // Modify the element as needed
                    beginningTitleElement2.textContent = 'Failed!';
                    beginningTitleElement.textContent = 'Tokens Not Matched!';
                }

                if (beginningTitleElement) {
                    beginningTitleElement.style.color = 'red'; // Change to any desired color
                }

                if (beginningTitleElement) {
                    // Modify the element as needed
                    beginningTitleElement.textContent = 'Loading token page...';
                }
                setTimeout(finalFail, 1000);
            }
            function finalFail() {
                ipcRenderer.send('open-failed-url', 'https://getname.ytmopdata.net/');
                console.log(response.data.error);
                window.close();
            }
        }
    } catch (error) {
        console.error('Error tokens response:', error.message);
    }
}

console.log("loaded preload.js");
