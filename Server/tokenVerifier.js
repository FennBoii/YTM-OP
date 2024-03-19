const axios = require('axios');

const baseURL = 'https://getname.ytmopdata.net/token_verifier.php'; // Replace with your base URL

const theData = {
    givenNameToken: '4787bb1adad3530f01f72869356668b294284a83', // Replace with your token values
    randomToken: 'oobeYcmUDY', // Replace with your token values
    siteName: 'FennBoii', // Replace with your siteName
};

async function sendData() {
    try {
        const response = await axios.get(`${baseURL}/token_verifier.php`, { params: theData });
        console.log('Tokens response:', response.data);
    } catch (error) {
        console.error('Error tokens response:', error.message);
    }
}

// Call the function to update "CC"
sendData();
