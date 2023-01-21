const mongoose = require('mongoose');


const groupChatSchema = new mongoose.Schema({
    name: { type: String, required: true, index : true, unique: true }, // for convenience we will use the group name as the group id, but we can use a unique id instead in the future
    created_at: { type: Date, default: Date.now },
    description : { type: String, required: true },
    admins : [{ type: string, ref: 'User',required: true }],
    members: [{
        type: string, //now we used userName as id, but we can use a unique id instead in the future
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

const GroupChat = mongoose.model('GroupChat', groupChatSchema);