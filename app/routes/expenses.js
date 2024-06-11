var express = require('express');
var router = express.Router();
const expenseController = require('../controllers/expensesController');


router.get('/api/expenses', expenseController.index);
router.get('/api/expenses/:id',  expenseController.show);
router.post('/api/expenses',  expenseController.store);
router.patch('/api/expenses/:id',  expenseController.update);
router.delete('/api/expenses/:id',  expenseController.remove);



module.exports = router;
