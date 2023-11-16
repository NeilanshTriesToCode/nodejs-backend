// file containing API endpoints
// this will have the code concerneed with the "movies" route
import express from 'express';
import { getDB } from '../db/conn.js';

// defining movies route
export const moviesRouter = express.Router();

// route to retrieve all movies
moviesRouter.route('/movies').get((req, res) => {
    let moviesDb = getDB();
    console.log(moviesDb)

    moviesDb.collection('movies')
        .find({})
        .toArray((err, result) => {
            if(err){
                console.log(err);
                throw err;
            }

            res.json(result);
            console.log(res.json(result));
        })
});


