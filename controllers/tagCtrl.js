const Questions = require("../models/questionModel");
const Users = require("../models/userModel");
const Answers = require("../models/answerModel");
const Tags = require("../models/tagModel");


const tagCtrl = {
    getTagQuestions: async (req, res) => {
        try {
          const { id } = req.params;
          const tag = await Tags.findOne({_id:id});
          
          if(!tag || tag.length === 0){
            return res.status(400).json({ msg: "Tag does not exist." });
          }
    
          const questions = await Questions.find({ tags: id })
          .sort("-createdAt")
          .limit(10)
          .populate("user", "username fullname points")
          .populate("tags");
    
          
    
    
          res.json({
            msg: "Success",
            questions,
            tag
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
    
      getTags: async (req, res) => {
        try {
          const tags = await Tags.find();
    
          res.json({
            msg: "Success",
            tags,
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

      searchTags: async (req, res) => {
        try {
          
          const tags = await Tags.find({
            tagName: { $regex: req.query.tag },
          })
            .limit(9);
            
          res.json({ tags });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

      followTag: async (req, res) => {
        try {
          const {id} = req.params;
          const followCheck = await Tags.findOne({ _id:id, followers:req.user._id });
          
          if(followCheck){
            return res.status(400).json({ msg: "You are already following this tag." });
          }

          await Tags.findOneAndUpdate({_id:id}, {$push: {followers:req.user} });

          await Users.findOneAndUpdate({_id:req.user._id}, {$push: {followedTags:id} });

          res.json({ msg: "You followed this tag successfully." });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

      unfollowTag: async (req, res) => {
        try {
          const {id} = req.params;
          const followCheck = await Tags.findOne({ _id:id, followers:req.user._id });
          
          if(!followCheck){
            return res.status(400).json({ msg: "You are not following this tag." });
          }

          await Tags.findOneAndUpdate({_id:id}, {$pull: {followers:req.user._id} });

          await Users.findOneAndUpdate({_id:req.user._id}, {$pull: {followedTags:id} });

          res.json({ msg: "You unfollowed this tag successfully." });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
};



module.exports = tagCtrl;