// const { v4: uuid4 } = require('uuid')
const taskModel = require('../models/tasksModel')
// let todoTasks = [] // local tasks

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find()
    if (tasks.length === 0) {
      return res.json({ msg: 'Todo task empty' })
    }
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
  }
}

exports.postTasks = (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({ msg: 'The task is empty, please fill the fields :)' })
    }
    // eslint-disable-next-line new-cap
    const task = new taskModel(req.body)
    // task.id = uuid4()
    task.save()
    res.json({ msg: 'Added Successful' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteTasks = async (req, res) => {
  try {
    const { id } = req.params
    const taskEliminated = await taskModel.findById(id)
    if (!taskEliminated) {
      return res.status(400).json({ msg: 'There is any task to eliminate' })
    }
    // todoTasks = todoTasks.filter(item => item.id !== id) // local task
    await taskModel.findByIdAndDelete({ _id: id })
    res.json({ msg: 'Task was deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteAllTasks = async (req, res) => {
  try {
    await taskModel.deleteMany()
    res.json({ msg: 'All tasks was deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.updateTasks = async (req, res) => {
  try {
    const { id } = req.params
    const taskUpdated = await taskModel.findById(id)
    if (!taskUpdated) {
      return res.json(400).json({ msg: 'This task does not exist' })
    }
    const { title, description, finished } = req.body
    // eslint-disable-next-line no-return-assign
    // todoTasks = todoTasks.map(item => item.id === id ? item = { id, title, description } : item) // local tasks
    const newItem = {}
    if (title) { newItem.title = title }
    if (description) { newItem.description = description }
    if (finished) { newItem.finished = finished }
    await taskModel.findByIdAndUpdate(
      { _id: id },
      { $set: newItem },
      { new: true }
    )
    res.json(newItem)
  } catch (error) {
    console.log(error)
  }
}
