import db from '../services/database.js'

function error(req, res) {
    try{
        const logData = db.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(logData);
    } catch(e){
        console.error(e);
    }
}

function log(req, res) {
    throw new Error('Error Test Successful');
}

export { error, log}