import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (req, res) => {
 try {
  const { size, page, title } = req.query;

  const condition = title ? {
   title: {
    $regex: new RegExp(title), $options: "i"
   }
  } : {};

  const { limit, offset } = getPagination(page, size);

  const data = await Task.paginate(condition, {
   offset,
   limit
  });

  res.json({
   totalItems: data.totalDocs,
   tasks: data.docs,
   totalPages: data.totalPages,
   currentPage: data.page - 1
  })
 } catch (error) {
  res.status(500).json({
   message: error.message || 'Something goes wrong retrieving the tasks'
  })
 }
}

export const createTask = async (req, res) => {
 if (!req.body.title) {
  return res.status(400).json({
   message: 'Title is required'
  })
 }

 try {
  const newTask = new Task({
   title: req.body.title,
   description: req.body.description,
   done: req.body.done || false
  })
  const taskSaved = await newTask.save();
  res.json(taskSaved)
 } catch (error) {
  res.status(500).json({
   message: error.message || 'Something goes wrong creating the task'
  })
 }
}

export const findOneTask = async (req, res) => {
 const { id } = req.params;
 try {
  const task = await Task.findById(id)

  if (!task)
   return res
    .status(404)
    .json({ message: 'Task not found' })

  res.json(task)

 } catch (error) {

  res.status(500).json({
   message: error.message || 'Error retrieving task with id: ' + id
  })
 }
}

export const deleteTask = async (req, res) => {
 const { id } = req.params;
 try {
  await Task.findByIdAndDelete(id)
  res.json({
   message: "Task deleted successfully",
  })
 } catch (error) {
  res.status(500).json({
   message: error.message || 'Error deleting task with id: ' + id
  })
 }
}

export const getDoneTasks = async (req, res) => {
 const tasks = await Task.find({ done: true })
 res.json(tasks)
}

export const updateTask = async (req, res) => {
 await Task.findByIdAndUpdate(req.params.id, req.body)
 res.json({
  message: "Task updated successfully",
 })
}

export const deleteAllTasks = async (req, res) => {
 await Task.deleteMany()
 res.json({
  message: "Tasks deleted successfully",
 })
}