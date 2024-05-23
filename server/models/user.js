const mongoose = require('mongoose')
const {Schema, model}  = mongoose;

const userSchema = Schema({
    username: {type: String, required: true, min: 3, unique: true},
    password: {type: String, required: true}
});

const userModel = model('user', userSchema);

module.exports = userModel;