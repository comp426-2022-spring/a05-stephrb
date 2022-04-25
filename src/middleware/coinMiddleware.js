// Middleware function definitions go here
import { coinFlip, coinFlips, countFlips, flipACoin } from '../controllers/coin.mjs'

// check endpoint
function check(req, res) {
    // Respond with status 200
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode + ' ' + res.statusMessage)
}

// 
function flip(req, res) {
    const flip = { "flip" : coinFlip() }
    res.status(200).json(flip)
}

//
function flips(req, res) {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
}

//
function guess(req, res) {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
}

export { check, flip, flips, guess }