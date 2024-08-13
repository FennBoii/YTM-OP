const WebSocket = require('ws');
let ws;
let messageRecievedCount = 0;
let messageSentCount = 0;

var FennBoii = `FennBoii`;

function connectWebSocket() {
    ws = new WebSocket(`wss://getname.ytmopdata.net/${FennBoii}`);

    ws.onopen = function (event) {
        console.log(`- LOG -- CONNECTED TO WEBSOCKET: '${FennBoii}' -`);
    };

    ws.onmessage = function (event) {
        messageRecievedCount += 1;
        console.log(`- LOG - MESSAGE RECIEVED - ${event.data} -`);
        if (event.data === 'ping') {
            console.log(`- LOG -- SENDING 'pong' MESSAGE BACK -`);
            messageSentCount += 1;
            ws.send('pong');
        }
    };

    ws.onclose = function (event) {
        // ${event.code} - ${event.reason}
        console.log(`- LOG -- CONNECTION CLOSED 'R-(${messageRecievedCount})' -- 'S-(${messageSentCount})' -`);
        reconnectWebSocket();
    };
    
    ws.onerror = function (error) {
        console.error(`- LOG -- WEBSOCKET ERROR: ${error} -`);
    };
}

function reconnectWebSocket() {
    console.log(`- LOG -- RECONNECTING TO WEBSOCKET (0 - SECONDS) -`);
    connectWebSocket();
}

process.on('SIGINT', () => {
    console.log(`- LOG -- CONNECTION CLOSED 'R-(${messageRecievedCount})' -- 'S-(${messageSentCount})' -`);
    process.exit();
});

connectWebSocket();
