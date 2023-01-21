const express = require("express"),
    app = express(),
    router = express.Router(),
    { createGroup , addMembers, addMessagetoChat, getGroupMessages } = require("../controllers/group");

router.post("/group", createGroup);
router.post("/group/addMembers", addMembers);
router.post("/group/addMessagetoChat", addMessagetoChat);
router.get("/group/getGroupMessages", getGroupMessages);


module.exports = router;