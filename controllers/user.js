const User = require('../models/user');

module.exports = {
    async createUser(req, res) {
        const { name, mobile } = req.body;
        try {
            const user = await User.create({
                username : name,
                mobile : mobile,
            });
            return res.status(201).json({ user });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};