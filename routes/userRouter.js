const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');



router.get('/user/:id', auth, userCtrl.getUser);
router.get('/user_posts/:id', auth, userCtrl.getUserPosts);
router.patch('/user', auth, userCtrl.updateUser);






module.exports = router;