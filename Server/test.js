const axios = require('axios');

const YOUR_API_TOKEN = '[YOUR_API_TOKEN]';  // Replace with your actual token

const headers = {
    'Authorization': `Bearer ${YOUR_API_TOKEN}`,
    'Content-Type': 'application/json'
};

const data = {
    from: '12085689744',
    to: ['13107075221'],
    body: 'Enter test message here'
};

axios.post('https://sms.api.sinch.com/xms/v1/49c530c9845b432d9dea2aedfdb50496/batches', data, { headers: headers })
    .then(response => {
        console.log('Success:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
