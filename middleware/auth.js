const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('X-Authorization')

  if (!token) {
    return res.status(400).json({ msg: 'Invalidate token' })
  }

  try {
    const crypt = jwt.verify(token, process.env.PALABRAFRASESECRETA)
    req.usuario = crypt.usuario
    next()
  } catch (error) {
    res.status(400).json({ msg: 'El token no es válido' })
  }
}
