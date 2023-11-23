// file to connect to the MongoDB database
// basically contains the code to connect to the MongoDB database and could be used in server.js
const { MongoClient } = require('mongodb');

const url = process.env.ATLAS_URL;

const client = new MongoClient(url);

var moviesDB, analyticsDB;

// function to connect to the database
const connectToServer = () => {
    client.connect();

    // connect to both DBs by default
    moviesDB = client.db('sample_mflix');
    analyticsDB = client.db('sample_analytics');

    if(moviesDB && analyticsDB){
        console.log('Connected to database.');
        return;
    }
    else{
        throw new Error('Error: Couldn\'t connect to database.');
    }
    
}

// function to return either of the DBs ("sample_mflix" or "sample_analytics") from MongoDB
const getDB = (dbName) => {
    //console.log(db)
    if(dbName == 'mflix'){
        return moviesDB;
    }
    else if(dbName == 'analytics'){
        return analyticsDB;
    }
}

module.exports = {
    connectToServer,
    getDB
}
