const Questions = require("../models/questionModel");


const questionCtrl = {
  createQuestion: async (req, res) => {
    try {
      const { body, title } = req.body;

      if (title.length < 15) {
        return res
          .status(400)
          .json({
            msg: "Question title length must be at least 15 characters.",
          });
      }

      if (title.length > 150) {
        return res
          .status(400)
          .json({
            msg: "Question title length must be less than 150 characters.",
          });
      }

      const newQuestion = new Questions({
        title,
        body,
        user: req.user._id,
      });
      await newQuestion.save();
      res.json({
        msg: "Question posted successfully.",
        newQuestion,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getQuestions: async (req, res) => {
    try {
      const questions = await Questions.find()
        .sort("-createdAt")
        .populate("user", "username fullname");

      res.json({
        msg: "Success",
        questions,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      
      const question = await Questions.find({_id: id})
        .populate("user", "username fullname avatar");
      
      res.json({
        msg: "Success",
        question,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};


module.exports = questionCtrl;