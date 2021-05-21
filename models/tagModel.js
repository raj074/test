const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    tagName: {
      type: String
    },
    details: {
      type: String
    },
    questions: {
      type: mongoose.Types.ObjectId,
      ref: "question",
    },
    followers: [
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

module.exports = mongoose.model("tag", tagSchema);
