const fs = require("fs")
const path = require('path')
const {
    registerFont,
    createCanvas
} = require("canvas");
const canvasTxt = require("canvas-txt").default;

function loadFont(font) {
    let Path = ['.']
    switch (require('os').type()) {
        case 'Windows_NT':
            Path = [
                ...Path,
                path.join(process.env.windir, 'Fonts'),
                path.join(process.env.LOCALAPPDATA, 'Microsoft', 'Windows', 'Fonts'),
            ]
            break
        case 'Darwin':
            Path = [
                ...Path,
                '$HOME/Library/Fonts',
                '/System/Library/Fonts',
                '/Library/Fonts',
                '~/Library/Fonts',
            ]
            break
        case 'Linux':
            Path = [
                ...Path,
                '/usr/local/share/fonts',
                '/usr/share/fonts',
                '~/.fonts',
            ]
            break
    }
    for (let fontName of font) {
        let extension = [path.extname(fontName)]
        if (extension[0] == '') extension = ['.ttf', '.otf', '.woff2', '.TTF', '.OTF', '.WOFF2']
        for (let checkPath of Path) {
            for (let extensionname of extension) {
                const FontPath = path.resolve(path.join(checkPath, fontName + extensionname))
                if (fs.existsSync(FontPath)) {
                    return FontPath
                }
            }
        }
    }
}

/**
 * Create Text to Image
 * @param {String} text text
 * @param {String} font font name
 * @param {Object} fontFace {{  family: String, weight?: String, style?: String }}
 * @param {Object} position {{ x: Number, y: Number, width: Number, height: Number }}
 * @param {Object} options {{ background: String, color: String, stroke: String, align: String, lineHeight: Number, justify: Boolean, fontSize: Number }}
 * @example
 * text2image.convert('Hello, World!', "ObelixProBIt-cyr", { family: 'pg' }, { x: 70, y: 50, width: 400,  height: 400 }, {}).then(base64 => {
 *     fs.writeFile("out.png", base64.replace(/^data:image\/png;base64,/, ""), 'base64', function() {});
 * })
 * @returns {String} base64
 */
module.exports.convert = async (text, font, fontFace, position = {}, options = {}) => new Promise(async (resolve, reject) => {
    registerFont(loadFont([font]), fontFace)
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = options['background'] == undefined ? "rgba(0,0,0,0)" : options['background'];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = options['color'] == undefined ? "white" : options['color'];
    ctx.strokeStyle = options['stroke'] == undefined ? "black" : options['stroke'];
    canvasTxt.font = fontFace['family'];
    canvasTxt.align = options['align'] == undefined ? "center" : options['align'];
    canvasTxt.lineHeight = options['lineHeight'] == undefined ? null : options['lineHeight'];
    canvasTxt.justify = options['justify'] == undefined ? false : options['justify'];
    canvasTxt.fontSize = options['fontSize'] == undefined ? 50 : options['fontSize'];
    canvasTxt.drawText(ctx, text, position['x'] == undefined ? 70 : position['x'], position['y'] == undefined ? 50 : position['y'], position['width'] == undefined ? 400 : position['width'], position['height'] == undefined ? 400 : position['height'])
    resolve(canvas.toDataURL())
    reject('Error')
})