// file to connect to the MongoDB database
// basically contains the code to connect to the MongoDB database and could be used in server.js
import { MongoClient } from "mongodb";

const DB = process.env.ATLAS_URI;

const client = new MongoClient(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db;

// function to connect to the database
export const connectToServer = (callback) => {
    client.connect((err, database) => {
        if(database){
            // load Sample Collection named "sampled_mflix"
            db = database('sample_mflix');
            console.log('Connected to database successfully.')
        }

        return callback(err);

    });
}

// function to return Collection named "mflix" from the database
export const getCollection = () => {
    return db;
}
