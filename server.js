require('.././controllers/db');
const express = require('express');

var app = express();

app.listen(4020, () => {

    console.log("Express Server started at Port:4020");
    
})