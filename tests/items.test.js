const supertest = require('supertest')
const { app, server } = require('../index')
// const items = require('../controllers/items')

const api = supertest(app)

const initialItems = [{ id: 1, title: 'Hola', description: 'primer item' }, { id: 2, title: 'Hola2', description: 'segundo item' }]

// eslint-disable-next-line no-undef
test('fetching data', async () => {
  await fetch('http://localhost:3001/api/v1/items', {
    method: 'POST',
    body: initialItems[0]
  })
  await fetch('http://localhost:3001/api/v1/items', {
    method: 'POST',
    body: initialItems[1]
  })
})

// eslint-disable-next-line no-undef
test('items are returned as json', async () => {
  const response = await api.get('/api/v1/items')
  // eslint-disable-next-line no-undef
  expect(response.body).toHaveLength(2)
})

// eslint-disable-next-line no-undef
afterAll(() => server.close())
// para tema de moongose, moongose.connection.close()
