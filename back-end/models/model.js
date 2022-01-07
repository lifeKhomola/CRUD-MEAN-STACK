const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Issue = new Schema({
    title: {
        type: String
    },
    responsile:{
        type: String
    },
    description: {
        type: String
    },
    severity:{
        type: String
    },
    status: {
        type: String,
        default: 'open'
    }
});

// export default mongoose.model('Issue',Issue);
module.exports = mongoose.model('Issue',Issue);