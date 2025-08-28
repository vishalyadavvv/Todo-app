const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const { getAllUsers, updateUserRole, getAllTodos } = require('../controllers/adminController');

router.use(auth, adminOnly);

router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.get('/todos', getAllTodos);

module.exports = router;
