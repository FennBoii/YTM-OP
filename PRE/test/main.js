const { htmlToText } = require('html-to-text');
const axios = require('axios');

async function displayWebpageAsAscii(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const asciiText = htmlToText(response.data, {
            wordwrap: 130
        });
        console.log(asciiText);
    } catch (error) {
        console.error('Error fetching or converting the webpage:', error);
    }
}

// Usage example
displayWebpageAsAscii('https://music.youtube.com/');
