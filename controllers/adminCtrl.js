const Questions = require("../models/questionModel");
const Users = require("../models/userModel");
const Answers = require("../models/answerModel");
const Tags = require("../models/tagModel");


const adminCtrl = {

  createTag: async (req, res) => {
    const {tagName, details} = req.body;
    
    if(!tagName){
      return res.status(400).json({ msg: "Tag name cannot be empty!" });
    }
    if(!details){
      return res.status(400).json({ msg: "You must provide tag details!" });
    }
    try {

      const tagCheck = await Tags.findOne({ tagName });
      if(tagCheck){
        return res.status(400).json({ msg: "This tag is already created!" });
      }
      const newTag = new Tags({tagName, details});
      
      await newTag.save();
      
      res.json({ msg: "New tag created successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalUsers: async (req, res) => {
    try {
      const users = await Users.find();
      const total_users = users.length;
      res.json({ total_users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalQuestions: async (req, res) => {
    try {
      const questions = await Questions.find();
      const total_questions = questions.length;
      res.json({ total_questions });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalActiveQuestions: async (req, res) => {
    try {
      const questions = await Questions.find({status:"open"});
      const total_active_questions = questions.length;
      res.json({ total_active_questions });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalClosedQuestions: async (req, res) => {
    try {
      const questions = await Questions.find({status:"closed"});
      const total_closed_questions = questions.length;
      res.json({ total_closed_questions });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalBountiedQuestions: async (req, res) => {
    try {
      const questions = await Questions.find({status:"bounty"});
      const total_bountied_questions = questions.length;
      res.json({ total_bountied_questions });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalTags: async (req, res) => {
    try {
      const tags = await Tags.find();
      const total_tags = tags.length;
      res.json({ total_tags });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalUpvotes: async (req, res) => {
    try {
      const questions = await Questions.find();
      let total_upvotes = 0;
      await questions.map((question) => (total_upvotes += question.upvotes.length));
      
      res.json({ total_upvotes });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalDownvotes: async (req, res) => {
    try {
      const questions = await Questions.find();
      let total_downvotes = 0;
      await questions.map((question) => (total_downvotes += question.upvotes.length));
      
      res.json({ total_downvotes });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalAnswers: async (req, res) => {
    try {
      const answers = await Answers.find();
      const total_answers = answers.length;
      res.json({ total_answers });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;