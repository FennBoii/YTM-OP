const axios = require('axios');

// Set the API endpoint and parameters
const apiEndpoint = 'https://music.youtube.com';
const params = {
    part: 'snippet',
    q: 'music video',
    maxResults: 10,
    key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30'
};

// Make a GET request to the YouTube API
axios.get(apiEndpoint, { params })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
