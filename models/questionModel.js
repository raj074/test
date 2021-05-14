const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    upvotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    downvotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", questionSchema);
