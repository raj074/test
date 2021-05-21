const router = require("express").Router();
const questionCtrl = require("../controllers/questionCtrl");
const auth = require("../middleware/auth");

router
  .route("/questions")
  .post(auth, questionCtrl.createQuestion)
  .get(auth, questionCtrl.getQuestions);

  router.get("/questions/bountied", auth, questionCtrl.getBountiedQuestions);
  router.get("/questions/all", auth, questionCtrl.getAllQuestions);

router
  .route("/questions/:id")
  .get(auth, questionCtrl.getQuestion);

  router.patch("/question/:id/upvote", auth, questionCtrl.upVoteQuestion);
  router.patch("/question/:id/removeVote", auth, questionCtrl.removeVote);
  router.patch("/question/:id/close", auth, questionCtrl.closeQuestion);
  router.post("/question/:id/answer", auth, questionCtrl.answerQuestion);
  router.post("/question/:id/bounty", auth, questionCtrl.putBounty);
  router.patch("/question/:id/report", auth, questionCtrl.reportQuestion);

  router.get("/search", auth, questionCtrl.searchTags);

module.exports = router;
