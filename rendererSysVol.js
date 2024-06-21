window.api.send('PlsSendVolOwO');

window.api.receive('getSysVolNow', (fetchedData) => {
    let intervalIdquick = setInterval(() => {
        clearInterval(intervalIdquick);
        window.api.send('PlsSendVolOwO');
    }, 250);
    document.getElementById('text').innerText = fetchedData.toString();
});