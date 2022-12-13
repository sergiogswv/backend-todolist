// const { v4: uuid4 } = require('uuid')
const itemsModel = require('../models/itemsModel')
// let todoItems = []

exports.getItems = async (req, res) => {
  const { task } = req.params
  const { id } = req.usuario
  try {
    const items = await itemsModel.find({ task, creador: id })
    if (items.length === 0) {
      return res.json({ msg: 'The items list is empty' })
    }
    res.status(200).json(items)
  } catch (error) {
    console.log(error)
  }
}

exports.postItems = async (req, res) => {
  const { id } = req.usuario
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({ msg: 'The item is empty, please fill the fields :)' })
    }
    // eslint-disable-next-line new-cap
    const item = new itemsModel(req.body)
    // item.id = uuid4()
    item.creador = id
    // todoItems = [...todoItems, item] //local items
    item.save()
    res.json({ msg: 'Added Successful' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteItems = async (req, res) => {
  const { task } = req.params
  try {
    const { id } = req.params
    // todoItems = todoItems.filter(item => item.id !== id) // local items
    const itemDeleted = await itemsModel.findById(id)
    if (itemDeleted.creador !== req.usuario.id) {
      return res.status(400).json({ msg: 'You can\'t eliminate this item' })
    }
    if (!itemDeleted) {
      return res.status(400).json({ msg: 'The item doesnt exits' })
    }
    if (itemDeleted.task !== task) {
      return res.status(400).json({ msg: 'The item doesn\'t exits in this task' })
    }
    await itemsModel.findByIdAndDelete({ _id: id })
    res.json({ msg: 'Item deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteAllItems = async (req, res) => {
  const { task } = req.params
  const { id } = req.usuario
  try {
    if (!id) {
      return res.status(400).json({ msg: 'You can\'t eliminate that items' })
    }
    // todoItems = [] // local items
    await itemsModel.deleteMany({ task })
    res.json({ msg: 'All items was deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.updateItems = async (req, res) => {
  try {
    const { title, description, finished, newTask, oldTask } = req.body
    const { id } = req.params
    // todoItems = todoItems.map(item => item.id === id ? item = { id, title, description } : item) // local items
    const itemUpdated = await itemsModel.findById(id)
    if (itemUpdated.creador !== req.usuario.id) {
      return res.status(400).json({ msg: 'You can\'t update this item' })
    }
    if (!itemUpdated) {
      return res.status(400).json({ msg: 'The item not exist' })
    }
    if (itemUpdated.task.toString() !== oldTask) {
      return res.status(400).json({ msg: 'The item doesn\'t exits in this task' })
    }
    const newItem = {}
    if (title) { newItem.title = title }
    if (description) { newItem.description = description }
    newItem.finished = finished
    newItem.task = newTask
    newItem.creador = req.usuario.id
    await itemsModel.findByIdAndUpdate({ _id: id }, { $set: newItem }, { new: true })
    res.json(newItem)
  } catch (error) {
    console.log(error)
  }
}
