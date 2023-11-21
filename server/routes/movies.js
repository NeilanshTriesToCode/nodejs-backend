// file containing API endpoints
// this will have the code concerneed with the "movies" route
const express = require('express');

// defining movies route
const moviesRouter = express.Router();

// import items from conn.js
const dbo = require('../db/conn');

// route to retrieve all movies
moviesRouter.get('/movies', async (req, res) => {
    let moviesDb = dbo.getDB();
    // res.send('hello client');
    let moviesData = moviesDb.collection('movies');

    // set up query object used to query and fetch from the database
    let query = { runtime: { $lt: 15 }};
    
    let options = {
        sort: { title: 1 },
        projection: {
            _id: 0, 
            title: 1, 
            imdb: 1
        }
    }

    /*
     Access the Movies Collection from the "sample_mflix" database
     and get all the movies data
    */
   const cursor = await moviesData.find(query, options);

   /*
    cursor contains the documents resulted from the query above.
    To access the results, convert the cursor items to array
    using mongoDB's built-in toArray() method, which returns a Promise
   */
   cursor.toArray()
   .then((docsArray) => {
        console.log(docsArray.length);
        docsArray.length === 0 ? res.send('No documents found.') : res.json({ length: docsArray.length });
   })
   .catch(err => {
    console.log(err);
    res.send('An error occurred. Couldn\'t retrieve docs');
   })

});

module.exports = moviesRouter;


