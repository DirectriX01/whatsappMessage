const express = require("express"),
    app = express(),
    router = express.Router(),
    {createUser } = require("../controllers/user");

router.post("/user", createUser);

module.exports = router;