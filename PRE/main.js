const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

window.loadAxios().then(() => {
    // Now you can use window.axios to make requests
    window.axios.get('https://example.com/api/data')
    .then(response => {
            console.log("works??1");
            console.log(response.data);
        })
        .catch(error => {
            console.log("works??2");
            console.error(error);
        });
        console.log("whaaa?");
    });


console.log("main.js Loaded");
