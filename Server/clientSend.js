const axios = require('axios');

const baseURL = 'https://getname.ytmopdata.net/changeTheLink.php'; // Replace with your base URL

// Define the data for updating the "thelink" value
const theLinkData = {
    givenNameToken: '4787bb1adad3530f01f72869356668b294284a83', // Replace with your token values
    randomToken: 'XxbMF4oz6T', // Replace with your token values
    siteName: 'FennBoii', // Replace with your siteName
    thelink: 'https://music.youtube.com/watch?list=OLAK5uy_kXYkk_00wSfuI2W03sRvpjfOnDA6NF54A&v=dm87PN-fTlg', // Modify thelink value as needed
};

// Function to make the HTTP request and update "thelink"
async function updateTheLink() {
    try {
        const response = await axios.get(`${baseURL}/updateTheLink.php`, { params: theLinkData });
        console.log('Update "thelink" response:', response.data);
    } catch (error) {
        console.error('Error updating "thelink":', error.message);
    }
}

// Call the function to update "synctime"
updateTheLink();


// const baseURL = 'https://getname.ytmopdata.net/changeSyncTime.php'; // Replace with your base URL

// // Define the data for updating the "synctime" value
// const syncTimeData = {
//     givenNameToken: '4787bb1adad3530f01f72869356668b294284a83', // Replace with your token values
//     randomToken: 'uzlkGHcIgj', // Replace with your token values
//     siteName: 'FennBoii', // Replace with your siteName
//     synctime: 12345, // Modify synctime value as needed
// };

// // Function to make the HTTP request and update "synctime"
// async function updateSyncTime() {
//     try {
//         const response = await axios.get(baseURL, { params: syncTimeData });
//         console.log('Update "synctime" response:', response.data);
//     } catch (error) {
//         console.error('Error updating "synctime":', error.message);
//     }
// }

// // Call the function to update "synctime"
// updateSyncTime();
