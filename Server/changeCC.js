const axios = require('axios');

const baseURL = 'https://getname.ytmopdata.net'; // Replace with your base URL

// Define the data for updating the "CC" value
const ccData = {
    givenNameToken: '4787bb1adad3530f01f72869356668b294284a83', // Replace with your token values
    randomToken: '2Td2VIC96F', // Replace with your token values
    siteName: 'FennBoii', // Replace with your siteName
    newCount: 123, // Modify newCount value as needed
};

// Function to make the HTTP request and update "CC"
async function updateCC() {
    try {
        const response = await axios.post(`${baseURL}/changeCC.php`, ccData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Update "CC" response:', response.data);
    } catch (error) {
        console.error('Error updating "CC":', error.message);
    }
}

// Call the function to update "CC"
updateCC();
