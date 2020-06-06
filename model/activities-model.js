const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    title: {
        type: String,
        default: null,
        sparse: true,
        index: true,
        unique: [true, 'title is already exist']
    },
    description: { type: String, default: null },
    creationDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDone: { type: Boolean, default: false }
})


const activitiesSchema = new Schema({
    categoryName: {
        type: String,
        index: true,
        unique: [true, 'category name is duplicate'],
        required: [true, 'category name is required']
    },
    creationDate: { type: Date, default: Date.now },
    activities: [activitySchema]

});


module.exports = mongoose.model('activities', activitiesSchema);