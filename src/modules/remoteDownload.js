const path = require("path");

const nircmdPath = path.join(__dirname, "nircmd.exe");

async function getNircmd() {
    const url = "https://github.com/FennBoii/YTM-OP/raw/underConstruction/nircmd.exe"; // Use the raw URL for direct download
    const writer = fs.createWriteStream(nircmdPath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

function downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(`Failed to get '${url}' (${response.statusCode})`);
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close(resolve); // close() is async, call resolve after close completes.
            });

            file.on('error', (err) => {
                fs.unlink(outputPath, () => reject(err)); // Delete the file if there's an error.
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => reject(err)); // Delete the file if there's an error.
        });
    });
}

module.exports = { downloadFile };