// const { v4: uuid4 } = require('uuid')
// let todoTasks = []
const connectionMysql = require('../config/db')

exports.getTasks = (req, res) => {

  const connection = connectionMysql.conectarDB()
  connection.query(
    'SELECT * FROM task',
    function (err, results, fields) {
      if (err) { return res.status(500).json({ msg: 'Hubo un error' }) }
      if (results.length === 0) {
        return res.json({ msg: 'Todo list empty' })
      }
      return res.json(results)
    }
  );
}

exports.postTasks = (req, res) => {
  const connection = connectionMysql.conectarDB()

  if (Object.keys(req.body).length === 0) {
    return res.json({ msg: 'The task is empty' })
  }

  const { title, description } = req.body

  connection.query(`insert into task (title, description) values ('${title}', '${description}')`, (err, results) => {
    if (err) { return res.status(400).json({ msg: 'Hubo un error' }) }
    res.json({ msg: 'Added Successful' })
  })
}

exports.deleteTasks = (req, res) => {
  const { id } = req.params
  // todTasks = todoTasks.filter(item => item.id !== id)
  const connection = connectionMysql.conectarDB()

  connection.query(`delete from task where id='${id}'`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al eliminar la tarea: ${id}` }) }

    res.json({ msg: 'Task deleted' })
  })
}

exports.deleteAllTasks = (req, res) => {
  const connection = connectionMysql.conectarDB()

  connection.query(`delete from task`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al eliminar las tareas.` }) }

    res.json({ msg: 'All tasks was deleted' })
  })
}

exports.updateTasks = (req, res) => {
  const { title, description, finished } = req.body
  const { id } = req.params
  // eslint-disable-next-line no-return-assign
  // todTasks = todoTasks.map(item => item.id === id ? item = { id, title, description } : item)
  const connection = connectionMysql.conectarDB()

  connection.query(`update task set title='${title}', description='${description}', finished='${finished}' where id='${id}'`, (err, results) => {
    if (err) { return res.json({ msg: `Hubo un error al editar la tarea: ${id}.` }) }

    res.json({ msg: 'The task was updated' })
  })
}
