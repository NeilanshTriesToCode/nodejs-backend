// Another ExpressJS route called "customers"
/*
 I'll be using the sample_analytics Collection from MongoDB.
 This route is for viewing, adding, updating and deleting a customer's entry.
*/
const express = require('express');

// convert string to ObjectID when querying is related to IDs of a document
const { ObjectId } = require('mongodb');

// import database-related stuff from conn.js
const dbo = require('../db/conn');

// defining "customers" route
const customersRouter = express.Router();

/*
 The GET method for this route would allow the user to view customer details with a specific username
 so the "username" field would be required in the URL.
*/
customersRouter.get('/customers/:username', async (req, res) => {
    // get analytics DB object
    let analyticsDB = dbo.getDB('analytics');

    // get "customers" Collection from the DB
    let customers = analyticsDB.collection('customers');

    // set up filters and option to query the Collection
    /*
     NOTE: req.params is being used instead of req.query since username is a required parameter.
           This is unlike the "movies" route, whose GET method didn't have a required parameter in its URL.
           Optional parameters in the URL are accessed by req.query.parameterName.
    */
    let query = {
        username: req.params.username, // filter by customer username
    }

    // let options = {};

    // get results
    const cursor = await customers.find(query);

    // extract the results as an array from the cursor
    cursor.toArray()
        .then(docsArray => {
            if(docsArray.length === 0){
                res.send('No records found for this customer username. Please check the username.');
            }
            else{
                // record is found
                // console.log(docsArray);
                res.json(
                    {
                        ...docsArray[0]
                    }
                );
            }
        })
        .catch(err => {
            console.log(err);
            res.send(`An unknown error occurred: ${err}`);
        });

});

// POST route to create a customer in the "customers" Collection
customersRouter.post('/customers/add', async (req, res) => {
    // get analytics DB object
    let analyticsDB = dbo.getDB('analytics');

    // get "customers" Collection from the DB
    let customers = analyticsDB.collection('customers');

    // extract data for the new customer
    // NOTE: req.body.parameterName is used to access data from a POST request
    let newCustomer = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        accounts: 0, // 0 by default
        tier_and_details: {} // empty Object by default
    };

    // create new customer, i.e., add new document to the "customers" Collection
    customers.insertOne(newCustomer)
        .then(insertOneResult => {
            if(insertOneResult.acknowledged){
                console.log('\nData added to DB.');
                res.send('\nCustomer created successfully.');
            }
        })
        .catch(err => {
            console.log(err);
            res.send(`\nAn unknown error occurred: ${err}`);
        });
});


// POST route to update customer
customersRouter.post('/customers/update/:username', async (req, res) => {
    // get analytics DB object
    let analyticsDB = await dbo.getDB('analytics');

    // get "customers" Collection from the DB
    let customers = await analyticsDB.collection('customers'); 

    // filter by username
    let options = {
        username: req.params.username
    }
 
    // fields to update for the customer (only name and email for now)
    // NOTE: req.body.parameterName is used to access data from a POST request
    // NOTE: notice Object structure for updating date (notice $set)
    let updateValues = {
        $set: {
            name: req.body.name,
            email: req.body.email,
        }
    };

    // update values
    customers.updateOne(options, updateValues)
        .then(updateResult => {
            if(updateResult.acknowledged){
                console.log('\nData updated.');
                res.send('\nCustomer updated successfully.')
            }
        })
        .catch(err => {
            console.log(err);
            res.send(`\nAn unknown error occurred: ${err}`);
        });


});

module.exports = customersRouter;