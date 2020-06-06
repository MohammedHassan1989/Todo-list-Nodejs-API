const mongoose = require('mongoose');
const { Schema } = mongoose;


const ValidTokensSchema = new Schema({
    userToken: { type: String, default: null },
}); 

module.exports = mongoose.model('ValidTokens', ValidTokensSchema);