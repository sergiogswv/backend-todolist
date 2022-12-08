const { v4: uuid4 } = require('uuid')
const itemsModel = require('../models/itemsModel')
// let todoItems = []

exports.getItems = async (req, res) => {
  const { task } = req.body
  try {
    const items = await itemsModel.find({ task })
    if (items.length === 0) {
      return res.json({ msg: 'The items list is empty' })
    }
    res.status(200).json(items)
  } catch (error) {
    console.log(error)
  }
}

exports.postItems = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({ msg: 'The item is empty, please fill the fields :)' })
    }
    // eslint-disable-next-line new-cap
    const item = new itemsModel(req.body)
    item.id = uuid4()
    // todoItems = [...todoItems, item] //local items
    item.save()
    res.json({ msg: 'Added Successful' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteItems = async (req, res) => {
  try {
    const { id } = req.params
    // todoItems = todoItems.filter(item => item.id !== id) // local items
    const itemDeleted = await itemsModel.findById(id)
    if (!itemDeleted) {
      return res.status(400).json({ msg: 'The item doesnt exits' })
    }
    await itemsModel.findByIdAndDelete({ _id: id })
    res.json({ msg: 'Item deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteAllItems = async (req, res) => {
  try {
    // todoItems = [] // local items
    await itemsModel.deleteMany()
    res.json({ msg: 'All items was deleted' })
  } catch (error) {
    console.log(error)
  }
}

exports.updateItems = async (req, res) => {
  try {
    const { title, description, finished } = req.body
    const { id } = req.params
    // todoItems = todoItems.map(item => item.id === id ? item = { id, title, description } : item) // local items
    const itemUpdated = await itemsModel.findById(id)
    if (!itemUpdated) {
      return res.status(400).json({ msg: 'The item not exist' })
    }
    const newItem = {}
    if (title) { newItem.title = title }
    if (description) { newItem.description = description }
    newItem.finished = finished
    await itemsModel.findByIdAndUpdate({ _id: id }, { $set: newItem }, { new: true })
    res.json(newItem)
  } catch (error) {
    console.log(error)
  }
}
