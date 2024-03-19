// const fs = require("fs")
// const text2image = require('./index');

// text2image.convert('Hello, World!', "ObelixProBIt-cyr", { family: 'pg' }, { x: 70, y: 50, width: 400, height: 400 }, {}).then(base64 => {
//     fs.writeFile("out.png", base64.replace(/^data:image\/png;base64,/, ""), 'base64', function () { });
// })

var ConnectionTitle;

function syncTimeSync() {
	if (ConnectionTitle == "[ -- Sending -- ]") {
		const baseURL = 'https://getname.ytmopdata.net/changeSyncTime.php'; // Replace with your base URL

		// Define the data for updating the "synctime" value
		const syncTimeData = {
			siteName: config.nameToken, // Replace with your siteName
			givenNameToken: config.givenNameToken, // Replace with your token values
			randomToken: config.randomToken, // Replace with your token values
			synctime: timeNow, // Modify synctime value as needed
		};

		// Function to make the HTTP request and update "synctime"
		async function updateSyncTime() {
			try {
				const response = await axios.get(baseURL, {
					params: syncTimeData
				});
				console.log('Update "synctime" response:', response.data);
			} catch (error) {
				console.error('Error updating "synctime":', error.message);
			}
		}

		// Call the function to update "synctime"
		updateSyncTime();

	}
}

syncTimeSync();
