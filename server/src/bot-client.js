const Promise = require('bluebird')

const sbox = require('./sandcastle.js')

let client = source => {
    return {
        source,
        sendNewGame,
        getDriver,
        getInputForFrame,
        sendState,
        type: 'bot',
        sendWinner
    }
}

const createScript = (source) => sbox.createScript("exports.main = function() {" + source + "}");

function getInputForFrame(car, map, tileGrid, xt, yt, t, nt, degNext) {
    return new Promise((resolve, reject) => {
        let script = createScript(this.source)
        script.on('exit', (err, output) => {
            if (err) {
                reject(err)
            } else {
                resolve(output)
            }
        })
        script.on('timeout', () => reject('timeout'))
        script.run({
            car,
            map,
            grid: tileGrid,
            xt,
            yt,
            t: t ? t : false,
            nt,
            degNext
        })
    })
}

function sendNewGame(newGameData) {
    // should the bots have an initialization function?
    // why bother tho?
}

function getDriver() {
    return new Promise(r => r({driver: 'defaultbot', client: this}))
}

function sendState(state) {
    // noop
}

function sendWinner(winner) {
    console.log('somebody won', winner)
    // noop
}

module.exports = client