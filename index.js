// Place your server entry point code here
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

args['port'];
args['help'];
args['debug'];
args['log'];

const help = `index.js [options]
        --port	Set the port number for the server to listen on. Must be an integer between 1 and 65535.
        --debug	If set to \`true\`, creates endpoints /app/log/access/ which returns
                    a JSON access log from the database and /app/error which throws 
                    an error with the message \"Error test successful.\" Defaults to 
                    \`false\`.
        --log		If set to false, no log files are written. Defaults to true.
                    Logs are always written to database.
        --help	Return this message and exit.`;

//If help is true, prints the help content to the log
if(args.help||args.h){
    console.log(help);
    process.exit(0);
}

// other imports
import express from 'express';
import morgan from 'morgan';
import fs from 'fs'
import coinRouter from './src/routes/coinRouter.js'
import debugRouter from './src/routes/debugRouter.js'
import { defaultEndpoint } from './src/middleware/default.js'
import { log } from './src/middleware/log.js'

// Define app using express
let app = express()

// sets port
const port = args.port || process.env.port || 5000

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public')) 

// starts server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// if log is true create a log
if (args.log == true) {
    const WRITESTREAM = fs.createWriteStream('./data/log/access.log', { flags: 'a' });
    // set up middleware
    app.use(morgan('combined', { stream: WRITESTREAM }));
    
    // Calls middleware that inserts new log into the db
    app.use(log)
}

// if debug, return access log
if (args.debug) {
    // Router with all debug endpoints
    app.use(debugRouter)
}

// Router with all coin endpoints
app.use(coinRouter)

// default 404 endpoint
app.use(defaultEndpoint);