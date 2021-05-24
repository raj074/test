const router = require("express").Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/adminCtrl");

router.post('/create_tag' , auth, adminCtrl.createTag);

router.get('/get_total_users' , auth, adminCtrl.getTotalUsers);

router.get("/get_total_questions", auth, adminCtrl.getTotalQuestions);

router.get("/get_total_active_questions", auth, adminCtrl.getTotalActiveQuestions);

router.get("/get_total_closed_questions", auth, adminCtrl.getTotalClosedQuestions);

router.get("/get_total_bountied_questions", auth, adminCtrl.getTotalBountiedQuestions);

router.get("/get_total_tags", auth, adminCtrl.getTotalTags);

router.get("/get_total_answers", auth, adminCtrl.getTotalAnswers);

router.get("/get_total_upvotes", auth, adminCtrl.getTotalUpvotes);

router.get("/get_total_downvotes", auth, adminCtrl.getTotalDownvotes);



module.exports = router;
