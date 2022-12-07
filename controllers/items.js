const { v4: uuid4 } = require('uuid')
let todoItems = []

exports.getItems = (req, res) => {
  if (todoItems.length === 0) {
    return res.json({ msg: 'Todo list empty' })
  }
  res.status(200).json(todoItems)
}

exports.postItems = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.json({ msg: 'The item is empty' })
  }
  const item = req.body
  item.id = uuid4()
  todoItems = [...todoItems, item]
  res.json({ msg: 'Added Successful' })
}

exports.deleteItems = (req, res) => {
  const { id } = req.params
  todoItems = todoItems.filter(item => item.id !== id)
  res.json({ msg: 'Item deleted' })
}

exports.deleteAllItems = (req, res) => {
  todoItems = []
  res.json({ msg: 'All items was deleted' })
}

exports.updateItems = (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  // eslint-disable-next-line no-return-assign
  todoItems = todoItems.map(item => item.id === id ? item = { id, title, description } : item)
  res.json(todoItems)
}
