const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true, index: true
    },
    mobile: {
        type: String, required: true, unique: true
    },
    groupChats : [{ type: String, ref: 'GroupChat' }]
});

module.exports = mongoose.model('User', userSchema);