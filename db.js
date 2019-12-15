const mongoose = require('mongoose');
const express = require('express');
mongoose.connect('mongodb://localhost:27017/Incubator', { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
{            
                if(!err)
                {
                    
                    console.log('MongoDB Connection Succeeded !!!!!')
                
                }
                else
                {
                    console.log('Error in DB Connection  :' + err)
                }

});

require('./procedure1');

