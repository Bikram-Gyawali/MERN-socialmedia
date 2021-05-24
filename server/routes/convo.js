const express = require("express");
const router = express.Router();
const Convo = require("../models/Convo");

// new convo
router.post("/", async (req, res) => {
  const newConvo = new Convo({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConvo = await newConvo.save();
    res.status(200).json(savedConvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// geet user convo
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Convo.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Convo.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
