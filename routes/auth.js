const express = require('express')
const router = express.Router()
const auth = require('../controllers/user')
require('express-group-routes')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/auth')

const app = express()

app.group('/', () => {
  router.get('/', authMiddleware, auth.returnUser)
  router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ], auth.authUser)
})

router.post('/create', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('name', 'Username is required').not().isEmpty()
], auth.createUser)

module.exports = router
