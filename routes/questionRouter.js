const router = require("express").Router();
const questionCtrl = require("../controllers/questionCtrl");
const auth = require("../middleware/auth");

router
  .route("/questions")
  .post(auth, questionCtrl.createQuestion)
  .get(auth, questionCtrl.getQuestions);

router
  .route("/questions/:id")
  .get(auth, questionCtrl.getQuestion);

module.exports = router;
