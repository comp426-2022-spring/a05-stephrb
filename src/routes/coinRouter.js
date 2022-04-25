// Route (endpoint) definitions go in this directory
// imports coin middleware
import { check, flip, flips, guess } from '../middleware/coinMiddleware.js'

// Imports express and creates router object
import express from 'express'
const coinRouter = express.Router()

// Check /app/ endpoint
coinRouter.get('/app/', check);

// Flip 1 coin endpoint
coinRouter.get('/app/flip/', flip);

// Flip many coins endpoint
coinRouter.post('/app/flip/coins/', flips);

// Guess flip endpoint
coinRouter.post('/app/flip/call/', guess);

export default coinRouter