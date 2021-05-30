const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    convoId: {
      type: String,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
