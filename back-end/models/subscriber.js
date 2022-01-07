//model to allow us to interact with the database in a easy way
const mongoose = require('mongoose');
//create a schema
const subscriberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    subscriberToChannel: {
        type: String,
        required: true, 
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now,
    },

})

module.exports = mongoose.model('Subscriber', subscriberSchema)