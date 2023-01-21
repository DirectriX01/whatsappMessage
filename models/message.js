const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    group_chat: { type: String, ref: 'GroupChat',required: true}, //now we used groupName as id, but we can use a unique id instead in the future
    sender: { type: String, ref: "User", required: true },
    text: {type: String},
    file: { type: Object, default: null },    
    sent: { type: Date,default: Date.now },
    readBy : [{ type: String, ref: 'User' }], //now we used userName as id, but we can use a unique id instead in the future
    messageType: {
        type: String,
        enum: ["text", "emoji", "image", "audio", "file"],
        default: "text",
        required: true
    },

});

const Message = mongoose.model('Message', messageSchema);
