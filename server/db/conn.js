// file to connect to the MongoDB database
// basically contains the code to connect to the MongoDB database and could be used in server.js
const { MongoClient } = require('mongodb');

const url = process.env.ATLAS_URL;

const client = new MongoClient(url);

var db;

// function to connect to the database
const connectToServer = () => {
    client.connect();

    db = client.db('sample_mflix');

    if(db){
        console.log('Connected to database.');
        return;
    }
    else{
        throw new Error('Error: Couldn\'t connect to database.');
    }
    
}

// function to return DB named "mflix" from the database
const getDB = () => {
    //console.log(db)
    return db;
}

module.exports = {
    connectToServer,
    getDB
}
