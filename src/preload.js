const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
    console.log('The Preload file has been loaded.');
  }
});

function updateSystemVolumeElement() {
    const targetElement = document.querySelector('#right-content > ytmusic-settings-button');
    if (targetElement) {
        // Create the system volume element if it doesn't exist
        let systemVolumeElement = document.getElementById('systemVolume');
        if (!systemVolumeElement) {
            systemVolumeElement = document.createElement('div');
            systemVolumeElement.id = 'systemVolume';
            targetElement.appendChild(systemVolumeElement);
        }

        // Listen for systemVolume updates from the main process
        ipcRenderer.on('updateSystemVolume', (event, systemVolume) => {
            systemVolumeElement.textContent = systemVolume;
            systemVolumeElement.style.backgroundColor = 'green';
            systemVolumeElement.style.textAlign = 'center';
            systemVolumeElement.style.outline = 'double 2px #ffffff';
            systemVolumeElement.style.width = 'min-content';
            systemVolumeElement.style.left = '10px';
            systemVolumeElement.style.width = '40px';
            systemVolumeElement.style.position = 'relative';
            // systemVolumeElement.style.display = 'grid';
        });

        // Stop checking for the element once it's created
        clearInterval(checkIntervalSystem);
    }
}

function updatePlayerVolumeElement() {
  const targetElement = document.querySelector('#right-content > ytmusic-settings-button');
  if (targetElement) {
      // Create the system volume element if it doesn't exist
      let playerVolumeElement = document.getElementById('playerVolume');
      if (!playerVolumeElement) {
          playerVolumeElement = document.createElement('div');
          playerVolumeElement.id = 'playerVolume';
          targetElement.appendChild(playerVolumeElement);
      }

      // Listen for playerVolume updates from the main process
      ipcRenderer.on('updatePlayerVolume', (event, playerVolume) => {
          playerVolumeElement.textContent = playerVolume;
          playerVolumeElement.style.backgroundColor = 'green';
          playerVolumeElement.style.textAlign = 'center';
          playerVolumeElement.style.outline = 'double 2px #ffffff';
          playerVolumeElement.style.width = 'min-content';
          playerVolumeElement.style.left = '10px';
          playerVolumeElement.style.width = '40px';
          playerVolumeElement.style.position = 'relative';
          // playerVolumeElement.style.display = 'grid';
      });

      // Stop checking for the element once it's created
      clearInterval(checkIntervalPlayer);
  }
}

// Check for the target element every 100 milliseconds
const checkIntervalPlayer = setInterval(updatePlayerVolumeElement, 100);
const checkIntervalSystem = setInterval(updateSystemVolumeElement, 100);


// let myPolicy;
// if (window.trustedTypes && window.trustedTypes.createPolicy) { // Feature detection
//   myPolicy = window.trustedTypes.createPolicy('myPolicy', {
//     createHTML: (string) => {
//       // Implement your validation and escaping logic here
//       // For demonstration, we're just returning the string,
//       // but in a real application, you should properly sanitize the input.
//       return string;
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//   const targetElement = document.querySelector('.center-content.style-scope.ytmusic-nav-bar');

//   if (targetElement) {
//       const button = document.createElement('button');
//       button.textContent = 'Click Me!';
//       button.className = 'my-custom-button';
//       button.addEventListener('click', () => {
//           console.log('Button was clicked!');
//       });

//       targetElement.appendChild(button);
//   } else {
//       console.error('Target element not found');
//   }
// });
