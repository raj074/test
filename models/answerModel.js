const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    
    data: Object,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: "question",
    },
    upvotes: [
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

module.exports = mongoose.model("answer", answerSchema);
