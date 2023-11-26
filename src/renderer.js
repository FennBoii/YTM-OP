// Request the current config data on page load
window.api.send('load-config');

// Listen for the config data from the main process
window.api.receive('config-loaded', (configData) => {
    console.log("Received config data in renderer:", configData); // Log received data
    document.getElementById('configTextarea').value = JSON.stringify(configData, null, 2);
});

// Handle form submission for saving changes
document.getElementById('configForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const configString = document.getElementById('configTextarea').value;
    try {
        const configData = JSON.parse(configString);
        window.api.send('save-config', configData);
    } catch (error) {
        alert('Invalid JSON format: ' + error.message);
    }
});




/*
const fs = require('fs');
const { dialog } = require('electron').remote;
const { ipcRenderer } = require('electron');

document.getElementById('saveButton').addEventListener('click', () => {
    const updatedConfig = {
        // collect data from your form fields
    };
    fs.writeFile('C:\\Program Files\\YTM-OP\\config.json', JSON.stringify(updatedConfig), 'utf8', err => {
        if (err) {
            console.error("Error writing the file", err);
            return;
        }
        alert('Config saved successfully!');
    });
});

ipcRenderer.send('request-config');
ipcRenderer.send('load-config');

ipcRenderer.on('config-response', (event, { data, error }) => {
    if (error) {
        console.error("Error: ", error);
        return;
    }
    for (const key in data) {
        const input = document.getElementById(key);
        if (input) {
            input.value = data[key];
        }
    }
});

ipcRenderer.on('config-loaded', (event, configData) => {
    document.getElementById('configTextarea').value = JSON.stringify(configData, null, 2);
});

document.getElementById('configForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const configString = document.getElementById('configTextarea').value;

    try {
        const configData = JSON.parse(configString);
        ipcRenderer.send('save-config', configData);
    } catch (error) {
        alert('Invalid JSON format: ' + error.message);
    }
});
*/