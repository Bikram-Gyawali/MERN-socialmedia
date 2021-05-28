const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth.middleware");
//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:convoId", async (req, res) => {
  try {
    const messages = await Message.find({
      convoId: req.params.convoId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
