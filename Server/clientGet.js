const axios = require('axios');

// Define the URL of your PHP script
const phpScriptURL = 'https://getname.ytmopdata.net/token_verifier.php'; // Replace with your PHP script URL

// Define the query parameters
const queryParameters = {
    givenNameToken: '4787bb1adad3530f01f72869356668b294284a83', // Replace with your token values
    randomToken: 'uzlkGHcIgj', // Replace with your token values
    siteName: 'FennBoii', // Replace with your siteName
};

// Send a GET request with query parameters
axios.get(phpScriptURL, { params: queryParameters })
			.then((response) => {
				// Access the 'theLink' field from the response data
				thelink = response.data.thelink;
				synctimeGET = response.data.synctime;

				const thelinkSave = thelink.indexOf('&t=') + 3;
				const thelinkSaved = thelink.substring(thelinkSave);

				const thelinkEdit = thelink.indexOf('&t=');
				const thelinkFin = thelink.slice(0, thelinkEdit + 3);

                console.log(thelinkSaved);
                console.log(thelinkFin);
                console.log(thelinkFin + thelinkSaved);
			})
    .catch((error) => {
        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Server responded with status code:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server.');
        } else {
            // Something else went wrong
            console.error('Error:', error.message);
        }
    });
