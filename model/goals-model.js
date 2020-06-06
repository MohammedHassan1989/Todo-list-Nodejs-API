const mongoose = require('mongoose');
const { Schema } = mongoose;


const goals = new Schema({
    title: {
        type: String,
        index: true,
        required: [true, 'title is required'],
        unique: [true, 'title is already exist']
    },
    creationDate: { type: Date, default: Date.now },
    properties: [{
        title: { type: String, required: [true, 'title is required'] },
        propertyType: ['string', 'textArea', 'boolean', 'date'],
        value: { type: String },
        position: { type: Number, required: [true, 'property position is required'] }
    }]

})
module.exports = mongoose.model('goals', goals);