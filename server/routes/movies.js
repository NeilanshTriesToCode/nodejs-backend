// file containing API endpoints
// this will have the code concerned with the "movies" route
const express = require('express');

// defining movies route
const moviesRouter = express.Router();

// import items from conn.js
const dbo = require('../db/conn');

// route to retrieve all movies
moviesRouter.get('/movies', async (req, res) => {
    let moviesDb = dbo.getDB('mflix');
    // res.send('hello client');
    let moviesData = moviesDb.collection('movies');

    // set up query object used for filters
    let query;
    
    let options = {
        sort: { title: 1 },
        projection: {
            _id: 0, 
            title: 1, 
            imdb: 1
        }
    }

    // check if the user has specified a movie name to search for
    // if not, return all results by default
    /*
     NOTE: Optional parameters are accessed using req.query.parameterName and not req.params.parameterName.
           Only for required parameters, req.params is used.
    */

    // if user has requested a specific movie title, add that to the filter
    if(req.query.movieTitle){
        // OBSERVE: filter has title option to only look for the title requested by the user
        query = { title: req.query.movieTitle,  runtime: { $lt: 15 }};
    }
    // if not, show all results by default
    else{
        // OBSERVE: filter has no title option
        query = { runtime: { $lt: 15 }};
    }

    /*
     Access the Movies Collection from the "sample_mflix" database
     and get the movies data
    */
   const cursor = await moviesData.find(query, options);

   /*
    cursor contains the documents resulted from the query above.
    To access the results, convert the cursor items to array
    using mongoDB's built-in toArray() method, which returns a Promise
   */
   cursor.toArray()
    .then((docsArray) => {
        console.log(`\nData containing ${docsArray.length} record(s) sent to the client.`);
        docsArray.length === 0 ? res.send('No documents found.') : res.json({ data: docsArray.slice(0, 5) ,length: docsArray.length });
   })
    .catch(err => {
        console.log(err);
        res.send('\nAn error occurred. Couldn\'t retrieve docs');
   });

});

module.exports = moviesRouter;


