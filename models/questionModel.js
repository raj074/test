const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    title: String,
    body: String,
    status: {
      type: String,
      default: "open"
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    bounty: {
      value: {
        type: Number,
        default:0
      },
      time:{
        type:Date
      }
    },    
    answers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "answer",
      },
    ],
    upvotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", questionSchema);
