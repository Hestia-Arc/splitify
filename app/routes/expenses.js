var express = require('express');
var router = express.Router();
const expenseController = require('../controllers/expensesController');


router.get('/api/expenses/:owner', expenseController.index);
router.get('/api/expenses/:owner/:id',  expenseController.show);
router.post('/api/expenses/:id',  expenseController.store);
router.patch('/api/expenses/:owner/:id',  expenseController.update);
router.delete('/api/expenses/:owner/:id',  expenseController.remove);



module.exports = router;
