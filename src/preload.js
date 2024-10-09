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


function updatePlayerVolumeElement() {
  const targetElement = document.querySelector('#right-content > ytmusic-settings-button');
  if (targetElement) {
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

function updateConfigUpdatesElement() {
  const targetElement = document.querySelector('#right-content > ytmusic-settings-button');
  if (targetElement) {
    let configUpdatesElement = document.getElementById('configUpdates');
    if (!configUpdatesElement) {
      configUpdatesElement = document.createElement('div');
      configUpdatesElement.id = 'configUpdates';
      targetElement.appendChild(configUpdatesElement);
    }
    
    // Listen for playerVolume updates from the main process
    ipcRenderer.on('updateConfigUpdates', (event, statusColor) => {
      configUpdatesElement.style.backgroundColor = statusColor;
      configUpdatesElement.style.textAlign = 'center';
      configUpdatesElement.style.width = '8px';
      configUpdatesElement.style.height = '8px';
      configUpdatesElement.style.left = '148px';
      configUpdatesElement.style.top = '10px';
      configUpdatesElement.style.position = 'relative';
      configUpdatesElement.style.borderRadius = '28px';
      configUpdatesElement.style.zIndex = '1';
      // playerVolumeElement.style.display = 'grid';
    });

    // Stop checking for the element once it's created
    clearInterval(updateStatusConfig);
  }
}

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
      systemVolumeElement.style.left = '14px';
      systemVolumeElement.style.width = '40px';
      systemVolumeElement.style.position = 'relative';
      // systemVolumeElement.style.display = 'grid';
    });

    // Stop checking for the element once it's created
    clearInterval(checkIntervalSystem);
  }
}


function changeYTLayoutElement() {
  const imageIcon = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img');
  const parentElement = document.querySelector('#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar');
  // document.body.style = "--paper-slider-knob-color: #f00";

  if (parentElement) {

    imageIcon.style.display = "none";

    let imageIconREAL = document.createElement('img');
    imageIconREAL.id = 'daddysMilk';
    parentElement.appendChild(imageIconREAL);

    let menuButtons = document.querySelector('#items > ytmusic-guide-entry-renderer:nth-child(1) > tp-yt-paper-item');
    
    ipcRenderer.on('changeYTLayout', (event, imageUrl) => {
      imageIconREAL.src = imageUrl;
      imageIconREAL.style.position = "relative";
      imageIconREAL.style.overflow = "hidden";
      imageIconREAL.style.left = "20px";
      imageIconREAL.style.position = "fixed";
      imageIconREAL.style.top = "-200px";
      imageIconREAL.style.width = "min-content";
      imageIconREAL.style.height = "200px";
      imageIconREAL.style.zIndex = "1";

      const styleElement = document.createElement('style');
      styleElement.textContent = `
        #daddysMilk {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
    
        #daddysMilk:hover {
          opacity: 0.3;
          pointer-events: none;
        }
      `;
      document.head.appendChild(styleElement);

      // const styleElement = document.createElement('style');
      // styleElement.textContent = `
      //     @keyframes colorChange {
      //         0% { background-color: rgba(255, 0, 0, 1); }
      //         10% { background-color: rgba(255, 154, 0, 1); }
      //         20% { background-color: rgba(208, 222, 33, 1); }
      //         30% { background-color: rgba(79, 220, 74, 1); }
      //         40% { background-color: rgba(63, 218, 216, 1); }
      //         50% { background-color: rgba(47, 201, 226, 1); }
      //         60% { background-color: rgba(28, 127, 238, 1); }
      //         70% { background-color: rgba(95, 21, 242, 1); }
      //         80% { background-color: rgba(186, 12, 248, 1); }
      //         90% { background-color: rgba(251, 7, 217, 1); }
      //         100% { background-color: rgba(255, 0, 0, 1); }
      //     }
  
      //     .animate-background {
      //         animation: colorChange 6s infinite;
      //     }
      // `;
      // document.head.appendChild(styleElement);

      // imageIconREAL.classList.add('animate-background');
    });



    const progressBar = document.querySelector("#progress-bar");
    const progressBarLower = document.querySelector("#progress-bar>div");
    const parentPlayerBar = document.querySelector("#layout>ytmusic-player-bar");
    const sliderContainer = document.querySelector("#sliderContainer");
    const sliderBar = document.querySelector("#sliderBar");
    // const sliderBarKnob = document.getElementsByClassName("slider-knob-inner.style-scope.tp-yt-paper-slider");
    const sliderBarKnob = document.querySelectorAll('#sliderKnobContainer')[1];
    const hoverVolumeSlider = document.querySelector('#volume-slider');
    const progressContainer = document.querySelectorAll('#progressContainer')[2];
    const sliderKnobContainer = document.querySelectorAll('#sliderKnobContainer')[2];
    const sliderVolumeKnob = document.querySelector('#volume-slider');
    const parentCenterDiv = document.createElement("div");

    // if (sliderVolumeKnob) {
    //   sliderVolumeKnob.style.backgroundColor = "red";
    //   sliderVolumeKnob.style.width = "5px";
    //   sliderVolumeKnob.style.left = "0.3vw"
    //   sliderVolumeKnob.style.position = "relative";
    //   sliderVolumeKnob.style.top = "-1vh";
    // }

    // if (sliderVolumeKnob) {
      // sliderVolumeKnob.style.backgroundColor = "red";
      // sliderVolumeKnob.style.left = "0.3vw"
      // sliderVolumeKnob.style.position = "relative";
      // sliderVolumeKnob.style.top = "-1vh";
    // }

    if (progressContainer) {
      progressContainer.style.top = "-10px";
    }

    if (sliderKnobContainer) {
      sliderKnobContainer.style.top = "-10px";
    }

    if (sliderBarKnob) {
      sliderBarKnob.style.backgroundColor = 'red';
      sliderBarKnob.style.top = '13.5px';
    }

    if (hoverVolumeSlider) {
      hoverVolumeSlider.style.opacity = 1;
      hoverVolumeSlider.style.pointerEvents = 1;
    }
    parentCenterDiv.id = "progress-barPercent";
    // parentCenterDiv.style.backgroundColor = "blue";
    // parentCenterDiv.style.backgroundColor = "tra";
    parentCenterDiv.style.position = "absolute";
    parentCenterDiv.style.display = "flex";
    parentCenterDiv.style.justifySelf = "center";
    parentCenterDiv.style.top = "62px";
    parentCenterDiv.appendChild(progressBar);
    parentPlayerBar.appendChild(parentCenterDiv);


    if (progressBar) {
      sliderContainer.style.height = "10px";
      sliderBar.style.top = "-13px";
      progressBar.style = "--paper-slider-height: 4px";
      progressBar.style.display = "flex";
      progressBar.style.width = "min-content";
      progressBar.style.position = "relative";
      progressBar.style.margin = "auto";
      progressBar.style.justifyContent = "center";
      progressBar.style.alignSelf = "center";
      progressBar.style.left = "0px";
      progressBar.style.top = "10px";
      // parentPlayerBar.appendChild(newDivElement);
      // newDivElement.appendChild(parentPlayerBar);
      // progressBar.style.margin = "6.3vh";
      // progressBar.width = "min-content";
      // progressBar.style = "--paper-slider-knob-start-border-color: #0f0";
      // progressBar.style = "--paper-slider-knob-start-color: #ff0";
      // progressBar.style.left = "0px";
      // progressBar.style.top = "4.4vh";
      // progressBar.style.top = "";
      // console.log("DoneWithIt2");
      // progressBar.style.position = "inherit";
      // progressBar.style.width = "350px";
    }

    if (progressBarLower) {
      progressBarLower.style.margin = "0 0";
      progressBarLower.style.width = "650px";
      progressBarLower.style.left = "0px";
      // progressBarLower2.style.width = "30%";
      // progressBarLower2.style.margin = "0px auto";
      // progressBarLower2.style.top = "2vh";
      // progressBarLower3.style.width = "30%";
      // progressBarLower3.style.margin = "0px auto";
      // progressBarLower3.style.top = "2vh";
      // console.log("DoneWithIt3");
    }
    clearInterval(changeYTLayout);
  }
}

// Check for the target element every 100 milliseconds
const updateStatusConfig = setInterval(updateConfigUpdatesElement, 100); //100
const checkIntervalPlayer = setInterval(updatePlayerVolumeElement, 100); //100
const checkIntervalSystem = setInterval(updateSystemVolumeElement, 100); //100
const changeYTLayout = setInterval(changeYTLayoutElement, 100); //1000

(function () {
  'use strict';

  const adBlockCSS = `
      .video-ads, .ytp-ad-module, .ytp-ad-player-overlay, .ytp-ad-overlay-container,
      .ytp-ad-image-overlay, .ytp-ad-skip-button, .ytp-ad-progress, .ytp-ad-marker-container,
      .ytp-ad-markers, .ad-showing, .ad-interrupting, .ad-created, .ad-display,
      .ytp-ad-preview-container, .ytp-ad-overlay-slot, .ytp-ad-overlay-background,
      .ytp-ad-overlay-image, .ytp-ad-overlay-close-button, .ytp-ad-overlay-container,
      .ytmusic-player-bar .ytp-ad-thumbnail, #ad-container, .ytm-ad-module, div[class*='ad-container'],
      #player-ads, .html5-ads, .ytp-ad-feedback-dialog, .ad-container-loaded, [id^="ad_block"],
      [class*="overlay-ad"], [class*="ad-block"], [class*="advertisement"], [class*="sponsored"],
      [id*="ad_block_container"], .html5-video-player[id*="ad"]
      {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
      }
      .ytp-ad-module, .ytp-ad-player-overlay, #secondary[ytd-watch-flexy][is-two-columns], 
      .ytp-ad-text-overlay, .ytp-ad-message-container, .ytp-player-content.ad-interrupting {
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
      }
  `;

  const style = document.createElement('style');
  style.innerHTML = adBlockCSS;
  document.head.appendChild(style);
  
  const adObserverCallback = (mutations) => {
      const adContainers = document.querySelectorAll(`
          .video-ads, .ytp-ad-module .ad-showing, .ytp-ad-player-overlay, .ytp-ad-overlay-container, 
          .ytmusic-player-bar .ytp-ad-thumbnail, #ad-container, .ytm-ad-module, [id^="ad_block"], 
          [class*="overlay-ad"], [class*="ad-block"], [class*="advertisement"], [class*="sponsored"], 
          [id*="ad_block_container"], .html5-video-player[id*="ad"]
      `);
      
      adContainers.forEach(adContainer => {
          if (adContainer) {
              adContainer.remove();
          }
      });

      const skipButtons = document.querySelectorAll('.ytp-ad-skip-button, .ytp-ad-overlay-close-button');
      skipButtons.forEach(button => {
          if (button && button.style.display !== 'none') {
              button.click();
          }
      });
  };

  const observeAdElements = () => {
      const observer = new MutationObserver(adObserverCallback);
      observer.observe(document.body, { childList: true, subtree: true });
  };

  const hijackXHR = () => {
      const originalXHR = window.XMLHttpRequest;
      
      function newXHR() {
          const xhr = new originalXHR();
          const originalOpen = xhr.open;
          
          xhr.open = function (method, url) {
              if (url.includes('ad') || url.includes('doubleclick.net') || url.includes('googlesyndication') || url.includes('googleadservices')) {
                  url = 'about:blank';
              }
              originalOpen.apply(xhr, arguments);
          };

          xhr.addEventListener('readystatechange', function () {
              if (this.readyState === 4 && this.status === 200 && this.responseURL.includes('/get_video_info')) {
                  let responseText = this.responseText;
                  if (responseText.includes('ad')) {
                  }
              }
          });

          return xhr;
      }

      window.XMLHttpRequest = newXHR;
  };

  const hideAdDetectOverlay = () => {
      const detectionOverlays = document.querySelectorAll('div[id*="adBlock"], div[class*="ad-block"]');
      detectionOverlays.forEach(overlay => {
          overlay.remove();
      });
  };

  const observeDetectionOverlay = () => {
      const observer = new MutationObserver(hideAdDetectOverlay);
      observer.observe(document.body, { childList: true, subtree: true });
  };

  observeAdElements();
  hijackXHR();
  observeDetectionOverlay();
})()

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
