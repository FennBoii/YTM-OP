// Request the current config data on page load
window.api.send('load-config');

var errorCatch = 0;

    const yaml = window.yaml;


// Listen for the config data from the main process
window.api.receive('config-loaded', (configData) => {
    console.log("Received config data in renderer:", configData); // Log received data
    document.getElementById('configTextarea').value = configData; // Use yaml.dump to convert to YAML
});

// Handle form submission for saving changes
document.getElementById('configForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const configString = document.getElementById('configTextarea').value;
    try {
        const configData = configString; // Use yaml.load to parse YAML
        window.api.send('save-config', configData);
    } catch (error) {
        alert('Invalid YAML format: ' + error.message);
        console.log("Error");
        errorCatch += 1;
    }
});

document.getElementById('saveConfig').addEventListener('click', function () {
    setTimeout(() => {
        this.style.animation = 'slideOut 1.5s';
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