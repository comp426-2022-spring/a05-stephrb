// Route (endpoint) definitions go in this directory
// imports coin middleware
import { coinFlip, coinFlips, countFlips, flipACoin } from '../middleware/coin.mjs'

// Imports express and creates router object
import express from 'express'
const coinRouter = express.Router()

// Default /app/ endpoint
coinRouter.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Flip 1 coin endpoint
coinRouter.get('/app/flip/', (req, res) => {
    const flip = { "flip" : coinFlip() }
    res.status(200).json(flip)
    
});

// Flip many coins endpoint
coinRouter.post('/app/flip/coins/', (req, res, next) => {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
})

// Guess flip endpoint
coinRouter.post('/app/flip/call/', (req, res, next) => {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
})

export default coinRouter