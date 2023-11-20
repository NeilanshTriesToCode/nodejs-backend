// file containing API endpoints
// this will have the code concerneed with the "movies" route
const express = require('express');

// defining movies route
const moviesRouter = express.Router();

// import items from conn.js
const dbo = require('../db/conn');

// route to retrieve all movies
moviesRouter.route('/movies').get((req, res) => {
    let moviesDb = dbo.getDB();
    console.log(moviesDb)

    res.send('hello');

    moviesDb.collection('movies')
        .find({})
        .toArray((err, result) => {
            if(err){
                console.log(err);
                throw err;
            }

            res.send('hello');
            console.log('hello');
        })
});

module.exports = moviesRouter;


