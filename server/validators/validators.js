const { body, validationResult } = require('express-validator');

exports.registerValidator = [
  body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username too short'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.loginValidator = [
  body('identifier').notEmpty().withMessage('Email or username required'),
  body('password').notEmpty().withMessage('Password required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.todoValidator = [
  body('title').notEmpty().withMessage('Title required').isLength({ max: 100 }).withMessage('Max 100 chars for title'),
  body('description').optional().isLength({ max: 500 }).withMessage('Max 500 chars for description'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Due date must be a valid date'),
  body('category').optional().isIn(['Urgent', 'Non-Urgent']).withMessage('Invalid category'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
