const WebSocket = require('ws');
let ws;
let messageCount = 0;

function connectWebSocket() {
    ws = new WebSocket(`wss://getname.ytmopdata.net/FennBoii`);

    ws.onopen = function (event) {
        console.log(`- LOG -- CONNECTED TO WEBSOCKET-`);
    };

    ws.onmessage = function (event) {
        messageCount + 1;
        console.log(`- LOG - MESSAGE RECIEVED - ${event.data} -`);
        if (event.data === 'ping') {
            console.log(`- LOG -- SENDING 'pong' MESSAGE BACK -`);
            ws.send('pong');
        }
    };

    ws.onclose = function (event) {
        // ${event.code} - ${event.reason}
        console.log(`- LOG -- CONNECTION CLOSED (${messageCount} - MESSAGES) -`);
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
    console.log(`- LOG -- CONNECTION CLOSED (${messageCount} - MESSAGES) -`);
    process.exit();
});

connectWebSocket();
