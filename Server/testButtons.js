const DiscordRPC = require('discord-rpc');

const clientId = '835023222562095124'; // Replace with your actual client ID

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('Connected to Discord as', rpc.user.username);
  // Set your activity details and buttons
  rpc.setActivity({
    details: 'Playing a game',
    state: 'In the jungle',
    buttons: [{ label: 'Button 1', url: 'https://example.com/button1' }],
  });
});

rpc.login({ clientId }).catch(console.error);