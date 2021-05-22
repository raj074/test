const Users = require("../models/userModel");
const Questions = require("../models/questionModel");

const userCtrl = {
  
  getUser: async (req, res) => {
    try {
       
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followedTags");

      if (!user) {
        return res.status(400).json({ msg: "requested user does not exist." });
      }

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const posts = await Questions.find({ user: req.params.id }).populate("tags").sort("-createdAt").limit(9);

      res.json({
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        fullname,
        mobile,
        address,
        about,
        website,
        gender,
      } = req.body;
      if (!fullname) {
        return res.status(400).json({ msg: "Please add your full name." });
      }
      console.log(req.body)
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { avatar, fullname, mobile, address, about, website, gender }
      );

      res.json({ msg: "Profile updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = userCtrl;
