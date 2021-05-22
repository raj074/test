const router = require("express").Router();
const tagCtrl = require("../controllers/tagCtrl");
const auth = require("../middleware/auth");


router.get("/search", auth, tagCtrl.searchTags);
router.get("/tag/:id", auth, tagCtrl.getTagQuestions);
router.get("/tags", auth, tagCtrl.getTags);

router.patch("/tag/:id/follow", auth, tagCtrl.followTag);
router.patch("/tag/:id/unfollow", auth, tagCtrl.unfollowTag);



module.exports = router;