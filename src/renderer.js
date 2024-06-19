// Request the current config data on page load
window.api.send('load-config');

var errorCatch = 0;


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
        console.log("Error");
        errorCatch += 1;
    }
});

document.getElementById('saveConfig').addEventListener('click', function () {
    setTimeout(() => {
        this.style.animation = 'slideOut 2s';
        this.style.backgroundColor = 'yellow';
        this.innerText = 'Submitting..';
    }, 200); // After 1 second, start the slide-in animation

    if (errorCatch == 1) {
        setTimeout(() => {
            this.style.animation = 'slideIn 1s';
            this.style.backgroundColor = 'red';
            this.innerText = 'Save Error!';
        }, 1800); // After 1 second, start the slide-in animation
    }
    
    if (errorCatch == 0) {
        setTimeout(() => {
            this.style.animation = 'slideIn 1s';
            this.style.backgroundColor = 'green';
            this.innerText = 'Save Success!';
        }, 1800); // After 1 second, start the slide-in animation
    }

    setTimeout(() => {
        this.innerText = 'Save Again?';
        this.style.backgroundColor = 'white';
    }, 3800); // After 1 second, start the slide-in animation
});