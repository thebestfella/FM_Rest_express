import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

//   user->[]->token
export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

//   token->[]->user
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  //  make sure the email and pw are present
  if (req.body.email === undefined || req.body.password === undefined)
    return res.status(400).send({ message: 'requires email and password' })
  try {
    // use try and catch to prevent problems
    const user = await User.create(req.body)
    const token = newToken(user)
    // not sure why needs return instead of res. directly
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ message: 'something went wrong' })
  }
}

export const signin = async (req, res) => {
  if (req.body.email === undefined || req.body.password === undefined)
    return res.status(400).send({ message: 'requires email and password' })
  try {
    // get user from getOne
    const user = await User.findOne({ email: req.body.email })

    // check if user is true,
    if (!user) return res.status(401).send({ message: 'no such user' })

    // check if pw matched, make sure to use async match
    const match = await user.checkPassword(req.body.password)
    if (!match) return res.status(401).send({ message: 'wrong password' })

    // then create new token
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ message: 'something went wrong' })
  }
}

// verify token
export const protect = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end()

  const token = req.headers.authorization.split('Bearer ')[1]

  if (!token) return res.status(401).end()

  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password') // also remove the password from payload
      .lean() // convert everything to JSON
      .exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}
