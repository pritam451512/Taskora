const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {createTaskValidation,updateTaskValidation} = require("../validators/task.validator");

const { createTask,getAllTasks,getTaskById,updateTask,deleteTask } = require("../controllers/task.controller");
 
 
router.post("/", protect,createTaskValidation,validate, createTask);
router.get("/",protect,getAllTasks);
router.get("/:id", protect, getTaskById);
router.patch("/:id",protect,updateTaskValidation,validate,updateTask);
router.delete("/:id",protect,deleteTask);

module.exports = router;