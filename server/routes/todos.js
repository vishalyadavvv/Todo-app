const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { todoValidator } = require('../validators/validators');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

router.use(auth);

router.get('/', getTodos);
router.post('/', todoValidator, createTodo);
router.put('/:id', todoValidator, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
