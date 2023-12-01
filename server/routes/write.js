// test route to check if data can be written to files on the local machine
const express = require('express');
const fs = require('fs');  // read/write operations to file

// defining write router
const writeRouter = express.Router();

// POST route to write to a file on the local machine
writeRouter.post('/write', async (req, res) => {
    // prepare data to write
    let data = `
            PLAYER BIO
        Name: ${req.body.name}
        Position: ${req.body.position}
        Club: ${req.body.club}
        Country: ${req.body.country}    
    `;

    // write data to file
    fs.writeFileSync(`./${req.body.name}.txt`, data, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Written to file');
        }
    });
});

module.exports = writeRouter;