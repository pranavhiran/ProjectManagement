const mongoose = require('mongoose');

const ProcedureSchema = new mongoose.Schema({

    id: 
    {
       type: String
    },

    name:
    {
        type: String
    },

    createdBy:
    {
        type: String
    },

    filelocation:
    {
        type: String
    },

    addedToProduct:
    {
        type: [Array],
        index:true
    },

    createDate:
    {
        type: Date,
        default: new Date()
    },

    updateDate:
    {
        type: [Date]    
    },

    tags:
    {
        type: [Array]
    }

});

module.exports = mongoose.model('Procedure', ProcedureSchema);




