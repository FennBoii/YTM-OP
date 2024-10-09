const express = require('express');
const app = express();
const port = 3000;

app.get('/:username', (req, res) => {
    const username = req.params.username;
    // Here you would load your application/player with the username
    res.send(`Loading player for ${username}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
