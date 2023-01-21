const user = require('../models/user');

module.exports = {
    async createUser(req, res) {
        const { name,  } = req.body;
        try {
            const user = await User.create({
                name,
                mobile,
            });
            return res.status(201).json({ user });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};