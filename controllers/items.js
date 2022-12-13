// const { v4: uuid4 } = require('uuid')
// let todoItems = []
const connectionMysql = require('../config/db')


exports.getItems = (req, res) => {
  const connection = connectionMysql.conectarDB()
  connection.query(
    'SELECT * FROM item',
    function (err, results, fields) {
      if (err) { return res.status(500).json({ msg: 'Hubo un error' }) }
      if (results.length === 0) {
        return res.json({ msg: 'Todo task empty, add new items :)' })
      }
      return res.json(results)
    }
  );
}

exports.postItems = (req, res) => {
  const connection = connectionMysql.conectarDB()

  if (Object.keys(req.body).length === 0) {
    return res.json({ msg: 'The item is empty' })
  }

  const { title, description } = req.body

  connection.query(`insert into item (title, description) values ('${title}', '${description}')`, (err, results) => {
    if (err) { return res.status(400).json({ msg: 'Hubo un error' }) }
    res.json({ msg: 'Added Successful' })
  })
}

exports.deleteItems = (req, res) => {
  const { id } = req.params
  // todTasks = todoTasks.filter(item => item.id !== id)
  const connection = connectionMysql.conectarDB()

  connection.query(`delete from item where id='${id}'`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al eliminar el item: ${id}` }) }

    res.json({ msg: 'Item deleted' })
  })
}

exports.deleteAllItems = (req, res) => {
  const connection = connectionMysql.conectarDB()

  connection.query(`delete from item`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al eliminar los items.` }) }

    res.json({ msg: 'All items was deleted' })
  })
}

exports.updateItems = (req, res) => {
  const { title, description, finished } = req.body
  const { id } = req.params

  const connection = connectionMysql.conectarDB()

  connection.query(`update item set title='${title}', description='${description}', finished='${finished}' where id='${id}'`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al editar el item: ${id}.` }) }

    res.json({ msg: 'The task was updated' })
  })
}
