// file to connect to the MongoDB database
// basically contains the code to connect to the MongoDB database and could be used in server.js
import { MongoClient, ServerApiVersion } from "mongodb";

const url = process.env.ATLAS_URI;

const client = new MongoClient(url);

var db;

// function to connect to the database
export const connectToServer = async () => {
    await client.connect();

    await client.db('sample_mflix').command({ ping: 1 })
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.log(err);
    });
    
}

// function to return DB named "mflix" from the database
export const getDB = () => {
    return db;
}
