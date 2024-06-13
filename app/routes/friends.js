var express = require('express');
var router = express.Router();
const friendController = require('../controllers/friendsController');


router.get('/api/friends/:owner', friendController.index);
router.get('/api/friends/:owner/:id',  friendController.show);
router.post('/api/friends/:id',  friendController.store);
router.patch('/api/friends/:owner/:id',  friendController.update);
router.delete('/api/friends/:owner/:id',  friendController.remove);



module.exports = router;
