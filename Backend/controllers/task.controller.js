const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const createTask = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        status,
        priority,
        dueDate
    } = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        user: req.user._id,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            task,
            "Task Created Successfully"
        )
    );
});

const getAllTasks = asyncHandler(async (req, res) => {

    const {
        search,
        status,
        priority,
        sort,
        page = 1,
        limit = 10,
    } = req.query;

    const query = {
        user: req.user._id,
    };

    if (search) {
        query.title = {
            $regex: search,
            $options: "i",
        };
    }

    if (status) {
        query.status = status;
    }

    if (priority) {
        query.priority = priority;
    }

    let sortOption = {};

    if (sort === "newest") {
        sortOption = {
            createdAt: -1,
        };
    } else if (sort === "oldest") {
        sortOption = {
            createdAt: 1,
        };
    } else if (sort === "dueDate") {
        sortOption = {
            dueDate: 1,
        };
    } else {
        sortOption = {
            createdAt: -1,
        };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query);

    const totalPages = Math.ceil(
        totalTasks / Number(limit)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                tasks,
                totalTasks,
                currentPage: Number(page),
                totalPages,
            },
            "Tasks fetched successfully"
        )
    );
});


const getTaskById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(
            404,
            "Task not found"
        );
    }

    if (
        task.user.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Access denied"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            task,
            "Task fetched successfully"
        )
    );

});

const updateTask = asyncHandler(async(req,res)=>{

    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400,"Invalid Task ID");
    }

    const task=await Task.findById(id);

    if(!task){
        throw new ApiError(404,"Task not found");
    }

    if(task.user.toString()!==req.user._id.toString()){
        throw new ApiError(403,"Access denied");
    }

    task.title=req.body.title ?? task.title;

    task.description=req.body.description ?? task.description;

    task.status=req.body.status ?? task.status;

    task.priority=req.body.priority ?? task.priority;

    task.dueDate=req.body.dueDate ?? task.dueDate;

    await task.save();

    return res.status(200).json(

        new ApiResponse(

            200,

            task,

            "Task Updated Successfully"

        )

    );

});


const deleteTask = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task ID");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access Denied");
    }

    await task.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Task Deleted Successfully"
        )
    );

});

module.exports = {
    createTask,getAllTasks,getTaskById,updateTask,deleteTask
};