const express = require('express')
const cors = require('cors')
const { conectarDB } = require('./config/db')

const app = express()

app.use(express.json())
app.use(cors())

// create the connection to database
conectarDB()

const port = process.env.PORT || 3001

app.use('/api/v1/items', require('./routes/items'))
app.use('/api/v1/tasks', require('./routes/tasks'))

const server = app.listen(port || 3001, () => {
  console.log(`Server running on port: ${port}`)
})

module.exports = { app, server }
