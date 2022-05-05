// Middleware function definitions go here
import { coinFlip, coinFlips, countFlips, flipACoin } from '../controllers/coin.mjs'

// check middleware
function check(req, res) {
    // Respond with status 200
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode + ' ' + res.statusMessage)
}

// flip one coin 
function flip(req, res) {
    const flip = { "flip" : coinFlip() }
    res.status(200).json(flip)
}

// flip many coins Get
function flipsGet(req, res) {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
}

// flip many coins POST
function flips(req, res) {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
}

// guess flip GET
function guessGet(req, res) {
    const game = flipACoin(req.params.guess)
    res.status(200).json(game)
}

// guess flip POST
function guess(req, res) {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
}

export { check, flip, flipsGet, flips, guessGet, guess }