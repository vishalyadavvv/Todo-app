const User = require('../models/User');
const Todo = require('../models/Todo');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent changing own role
    if (user._id.equals(req.user._id)) return res.status(400).json({ message: 'Cannot change own role' });

    user.role = role;
    await user.save();
    res.json({ message: 'Role updated', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};
