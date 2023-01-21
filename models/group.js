const mongoose = require('mongoose');


const groupChatSchema = new mongoose.Schema({
    name: { type: String, required: true, index : true, unique: true }, // for convenience we will use the group name as the group id, but we can use a unique id instead in the future
    created_at: { type: Date, default: Date.now },
    description : { type: String, },
    admins : [{ type: String, ref: 'User',required: true }],
    members: [{
        type: String, //now we used userName as id, but we can use a unique id instead in the future
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    groupImage: { type: String, default: null },
    permissionLevel : { type: Number, default: 0 } // 0 = public, 1 = admin only
});

module.exports = mongoose.model('GroupChat', groupChatSchema);