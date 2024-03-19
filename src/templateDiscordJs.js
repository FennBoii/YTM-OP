const DiscordRPC = require('discord-rpc');
const clientId = '835023222562095124';
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity() {
  if (!rpc) {
    return;
  }

  try {
    await rpc.setActivity({
      details: 'Your Details Here',
      state: 'Your State Here',
      startTimestamp: new Date(),
      largeImageKey: 'large_image_key',
      largeImageText: 'Large Image Text',
      smallImageKey: 'small_image_key',
      smallImageText: 'Small Image Text',
      instance: false,
    });
  } catch (error) {
    console.error(error);
  }
}

rpc.on('ready', () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
