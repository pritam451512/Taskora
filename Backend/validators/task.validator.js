const { body } = require("express-validator");

const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

const updateTaskValidation = [

    body("title")
    .optional()
    .trim()
    .isLength({min:3,max:100})
    .withMessage("Title must be between 3 and 100 characters"),

    body("description")
    .optional()
    .trim(),

    body("status")
    .optional()
    .isIn(["Pending","In Progress","Completed"])
    .withMessage("Invalid status"),

    body("priority")
    .optional()
    .isIn(["Low","Medium","High"])
    .withMessage("Invalid priority"),

    body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date")

];

module.exports = {
  createTaskValidation,updateTaskValidation,
};