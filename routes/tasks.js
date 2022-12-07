const express = require('express')
require('express-group-routes')
const app = express()
const router = express.Router()
const tasks = require('../controllers/tasks')

app.group('/', () => {
  router.get('/', tasks.getTasks)
  router.post('/', tasks.postTasks)
  router.delete('/:id', tasks.deleteTasks)
  router.delete('/', tasks.deleteAllTasks)
  router.put('/:id', tasks.updateTasks)
})

module.exports = router
