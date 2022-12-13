const express = require('express')
require('express-group-routes')
const app = express()
const router = express.Router()
const tasks = require('../controllers/tasks')
const auth = require('../middleware/auth')

app.group('/', () => {
  router.get('/', auth, tasks.getTasks)
  router.post('/', auth, tasks.postTasks)
  router.delete('/:id', auth, tasks.deleteTasks)
  router.delete('/', auth, tasks.deleteAllTasks)
  router.put('/:id', auth, tasks.updateTasks)
})

module.exports = router
