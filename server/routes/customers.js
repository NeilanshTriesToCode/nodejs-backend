// Another ExpressJS route called "customers"
/*
 I'll be using the sample_analytics Collection from MongoDB.
 This route is for viewing, adding, updating and deleting a customer's entry.
*/
const express = require('express');

// import database-related stuff from conn.js
const dbo = require('../db/conn');

// defining "customers" route
const customersRoute = express.Router();

/*
 The GET method for this route would allow the user to view customer details with a specific id
 so the "cid" field would be required in the URL.
*/
customersRoute.get('/customers/:cid', async (req, res) => {
    // get analytics DB object
    let analyticsDB = dbo.getDB('analytics');

    // get "customers" Collection from the DB
    let customersData = analyticsDB.collection('customers');

    // set up filters and option to query the Collection
    /*
     NOTE: req.params is being used instead of req.query since cid is a required parameter.
           This is unlike the "movies" route, whose GET method didn't have a required parameter in its URL.
           Optional parameters in the URL are accessed by req.query.parameterName.
    */
    let query = {
        cid: req.params.cid, // filter by customer id
        runtime: { $lt: 15 }
    }

    let options = {};

});