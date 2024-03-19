const axios = require('axios');

const baseURL = 'https://getname.ytmopdata.net/webpageEdit.php'; // Replace with your base URL

let theURL = "https://lh3.googleusercontent.com/y8Y3ejkyBvXC_XMR_R0HKk7NWI47Z3AfT_y9q1_RCnIueiKY8bDBge-xT20yH670MbTzB2bQU4E6Ronh3A=w60-h60-l90-rj"
let finalURL = encodeURIComponent(theURL);

// Define the data for updating the "thelink" value
const theLinkData = {
    givenNameToken: '4787bb1adad3530f01f72869356668b294284a83',
    randomToken: '35or9asp50', // Replace with your token values
    sitename: 'FennBoii', // Replace with your siteName
    thelink: finalURL,
    imgVer: imgVer,
};

// Function to make the HTTP request and update "thelink"
async function updateTheLink() { 
    try {
        const response = await axios.get(`${baseURL}/webpageEdit.php`, { params: theLinkData });
        console.log('Update "thelink" response:', response.data);
        // console.log("respose:", response);
    } catch (error) {
        console.error('Error updating "thelink":', error.message);
    }
    // console.log(theLinkData)
}

// Call the function to update "synctime"
updateTheLink();
