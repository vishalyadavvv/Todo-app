const Todo = require('../models/Todo');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const todo = await Todo.create({ title, description, dueDate, category, user: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const todos = await Todo.find().populate('user', 'username email').sort({ createdAt: -1 });
      return res.json(todos);
    }
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (req.user.role !== 'admin' && !todo.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updates = req.body;
    Object.assign(todo, updates);
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (req.user.role !== 'admin' && !todo.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    next(err);
  }
};
