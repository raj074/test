const Questions = require("../models/questionModel");
const Users = require("../models/userModel");
const Answers = require("../models/answerModel");


const questionCtrl = {
  createQuestion: async (req, res) => {
    try {
      const { body, title } = req.body;

      if (title.length < 15) {
        return res.status(400).json({
          msg: "Question title length must be at least 15 characters.",
        });
      }

      if (title.length > 150) {
        return res.status(400).json({
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
      const questions = await Questions.find({ status: "open" })
        .sort("-createdAt")
        .populate("user", "username fullname points");

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

      const question = await Questions.find({ _id: id })
        .populate("user", "username fullname avatar points")
        .populate({ path: "answers", populate: { path: "user" } });

      if (question.length === 0) {
        return res.status(400).json({ msg: "Question does not exist" });
      }

      res.json({
        msg: "Success",
        question,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  upVoteQuestion: async (req, res) => {
    try {
      const question = await Questions.find({
        _id: req.params.id,
        upvotes: req.user._id,
      });
      if (question.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already up voted this question" });
      }

      const upvote = await Questions.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { upvotes: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!upvote) {
        return res.status(400).json({ msg: "Question does not exist." });
      }

      await Users.findOneAndUpdate(
        { _id: upvote.user },
        { $inc: { points: 3 } }
      );

      res.json({ msg: "Question upVoted successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeVote: async (req, res) => {
    try {
      const Vote = await Questions.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { upvotes: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!Vote) {
        return res.status(400).json({ msg: "Question does not exist." });
      }

      await Users.findOneAndUpdate(
        { _id: Vote.user },
        { $inc: { points: -3 } }
      );

      res.json({ msg: "Vote removed from Question successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  closeQuestion: async (req, res) => {
    try {
      const question = await Questions.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { status: "closed" },
        {new: true}
      )
      .populate("user", "username fullname avatar points")
      .populate({ path: "answers", populate: { path: "user" } });

      if (!question) {
        return res.status(400).json({ msg: "You are not authorized." });
      }

      res.json({ msg: "Question closed successfully.", question });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  answerQuestion: async (req, res) => {
    try {
      const question = await Questions.find({
        _id: req.params.id,

        status: "open",
      });

      if (!question || question.length === 0) {
        return res
          .status(400)
          .json({ msg: "Either question is closed or does not exist." });
      }

      const answer = new Answers({
        data: req.body,
        user: req.user,
      });

      await Questions.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { answers: answer._id } }
      );

      await answer.save();

      res.json({ msg: "Answer posted successfully.", answer });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  reportQuestion: async (req, res) => {
    try {
      const question = await Questions.find({
        _id: req.params.id,
        reports: req.user._id,
      });
      if (question.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already reported this post" });
      }

      const report = await Questions.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { reports: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!report) {
        return res.status(400).json({ msg: "Question does not exist." });
      }

      res.json({ msg: "Question reported successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllQuestions: async (req, res) => {
    try {
      const questions = await Questions.find()
        .sort("-createdAt")
        .populate("user", "username fullname points");

      res.json({
        msg: "Success",
        questions,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBountiedQuestions: async (req, res) => {
    try {
      const questions = await Questions.find({ status:"bounty" })
        .sort("-createdAt")
        .populate("user", "username fullname points");
        
      res.json({
        msg: "Success",
        questions,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  putBounty: async (req, res) => {
    
    try {
      const question = await Questions.find({
        _id: req.params.id,
        user: req.user._id,
        status: "open",
      });

      if (!question || question.length === 0) {
        return res
          .status(400)
          .json({ msg: "Something went wrong ,Please try again." });
      }


      const newQue = await Questions.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { "bounty.value":req.body.bounty, "bounty.time": Date.now(), status: "bounty" },
        {new: true}
      )
      .populate("user", "username fullname avatar points")
      .populate({ path: "answers", populate: { path: "user" } });
        
      await Users.findOneAndUpdate({_id:req.user._id}, { $inc: { points: -req.body.bounty } })

      res.json({ msg: `${req.body.bounty} points deducted from your account.`, question: newQue });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = questionCtrl;

