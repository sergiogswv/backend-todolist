const express = require('express')
require('express-group-routes')
const app = express()
const router = express.Router()
const items = require('../controllers/items')
const auth = require('../middleware/auth')

app.group('/', () => {
  router.get('/:task', auth, items.getItems)
  router.post('/', auth, items.postItems)
  router.delete('/:id', auth, items.deleteItems)
  router.delete('/', auth, items.deleteAllItems)
  router.put('/:id', auth, items.updateItems)
})

module.exports = router
