const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.authUser = async (req, res) => {
  const { email, password } = req.body

  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }

  const usuario = await userModel.findOne({ email })
  if (!usuario) {
    return res.status(400).json({ msg: 'This user doesn\'t exist, please verify your email or login :D' })
  }

  const passCorrect = await bcrypt.compare(password, usuario.password)
  if (!passCorrect) {
    return res.status(400).json({ msg: 'Incorrect password' })
  }

  const payload = {
    usuario: {
      id: usuario.id
    }
  }
  jwt.sign(payload, process.env.PALABRAFRASESECRETA, (error, token) => {
    if (error) throw error

    return res.json({ token })
  })
}

exports.returnUser = async (req, res) => {
  try {
    const usuario = await userModel.findById(req.usuario.id).select('-password')
    res.json(usuario)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hubo un error' })
  }
}

exports.createUser = async (req, res) => {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  const { email, password, name } = req.body
  try {
    const userExist = await userModel.findOne({ email })

    if (userExist) {
      return res.json({ msg: 'This email already exist' })
    }
    const salt = await bcrypt.genSalt(10)
    const passHashed = await bcrypt.hash(password, salt)

    // eslint-disable-next-line new-cap
    const newUser = new userModel({ email, password: passHashed, name })
    await newUser.save()
    res.json({ msg: 'User register successfuly' })
  } catch (error) {
    console.log(error)
  }
}
