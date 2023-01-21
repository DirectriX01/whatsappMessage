const Group = require('../models/group');
const Message = require('../models/message');
const crypto = require('crypto');


module.exports = {
    async createGroup(req, res) {
        const { name, description, admin } = req.body;
        //function to create a whatsapp group;
        try {
            //create a local encryption key
            const localEncryptKey = crypto.randomBytes(6).toString('hex');
            const group = await Group.create({
                name,
                description,
                admin
            });
            return res.status(201).json({ group, key : localEncryptKey });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async addMembers(req, res) {
        const { groupName, newMember } = req.body;
        try {
            const group = await Group.findOneAndUpdate(groupName, { $push: { members: newMember }, new: true });
            return res.status(201).json({ group });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async addMessagetoChat(req, res) {
        const {groupName, message, userName, localEncryptKey} = req.body;
        try {
            //use localEncryptKey to encrypt 
            let iv = crypto.randomBytes(6);
            const encryptedMessage = crypto.createCipheriv('aes-256-cbc', localEncryptKey, iv);
            // encrypt the message and convert it to hex
            const encrypted = encryptedMessage.update(message, 'utf8', 'hex') + encryptedMessage.final('hex');
            //get the group
            const group = await Group.findOne({ name: groupName });
            if(!group) return res.status(404).json({ error: 'Group not found' });

            //check if the user is a member of the group
            const isMember = group.members.find(member => member === userName);
            if(!isMember) return res.status(401).json({ error: 'You are not a member of this group' });

            //check permissionLevel
            if(group.permissionLevel === 1 && group.admins.indexof(userName) == -1) return res.status(401).json({ error: 'You are not an admin of this group' });

            //create a new message and add messageType and message
            const message = await Message.create({
                message: encrypted,
                sender: userName,
                group_chat: groupName
            });

            //future code to handle image, audio, file using multer for our api
            // if (req.file) {
            //     const url = req.protocol + '://' + req.get("host");
            //     message.image = url + "/images/" + req.file.filename;
            // }

            //save the message 
            let response = await message.save();
            if(response){
                // add the message to the group chat
                group.messages.push(message);
                // save the group messages
                await group.save();
                return res.status(201).json({ message, tick : true });
            } else {
                return res.status(500).json({ error: 'Error saving message', tick : false});
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async getGroupMessages(req, res) {
        const { groupName, localEncryptKey, pageNo } = req.body;
        try {
            //paginate to get 20 messages at one time
            //pageNo is the page number and is depenedent on the client side
            const messages = await Message.find({ group_chat: groupName }).sort({ sent: -1 }).skip(pageNo * 20).limit(20);
            //decrypt the messages
            const decryptedMessages = messages.map(message => {
                // use localEncryptKey to decrypt message
                const decryptedMessage = crypto.createDecipheriv('aes-256-cbc', localEncryptKey, iv);
                // decrypt the message and convert it to utf8
                // now we decrypt server side, but we should decrypt client side
                const decrypted = decryptedMessage.update(message.text, 'hex', 'utf8') + decryptedMessage.final('utf8');
                return { ...message, text: decrypted };
            }
            );
            return res.status(201).json({ messages: decryptedMessages });
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
};