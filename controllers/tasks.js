const { v4: uuid4 } = require('uuid')
let todoTasks = []

exports.getTasks = (req, res) => {
  if (todoTasks.length === 0) {
    return res.json({ msg: 'Todo task empty' })
  }
  res.status(200).json(todoTasks)
}

exports.postTasks = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.json({ msg: 'The task is empty' })
  }
  const item = req.body
  item.id = uuid4()
  todoTasks = [...todoTasks, item]
  res.json({ msg: 'Added Successful' })
}

exports.deleteTasks = (req, res) => {
  const { id } = req.params
  todoTasks = todoTasks.filter(item => item.id !== id)
  res.json({ msg: 'Task deleted' })
}

exports.deleteAllTasks = (req, res) => {
  todoTasks = []
  res.json({ msg: 'All tasks was deleted' })
}

exports.updateTasks = (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  // eslint-disable-next-line no-return-assign
  todoTasks = todoTasks.map(item => item.id === id ? item = { id, title, description } : item)
  res.json(todoTasks)
}
