// file for the main server code
const express = require('express');
const cors = require('cors');

require("dotenv").config({ path: "./config.env" });


const app = express();

const port = process.env.PORT || 5000;

// allow CORS functionality across all routes
app.use(cors());

// allows incoming requests to be parsed with JSON payloads
/*
i.e., allowing to extract the data sent in the request body
to be attached to req.body. 
So when the client request sends data in JSON, it could
then be accessed using req.body
*/
app.use(express.json());

// allows app to include routes defined in the record JS file
// i.e. enables the routes defined in the JS file to be accessible
app.use(require('./routes/record'));

// connect to mongodb driver
const dbo = require("./db/conn");

app.listen(port, () => {
    dbo.connectToServer(err => {
        if(err){
            console.log(err);
        }
    });
    console.log(`Server is up and running on port ${port}`);
});

