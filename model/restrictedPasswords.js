const mongoose = require('mongoose');
const { Schema } = mongoose;


const restrictedPasswordsSchema = new Schema({
password: { type: String, default: null },
}); 

module.exports = mongoose.model('restrictedPasswords', restrictedPasswordsSchema);