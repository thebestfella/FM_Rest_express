import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors()) // make server cors enabled, bascially allows api to be used by other servers
app.use(json()) // serialize json for js obj
app.use(urlencoded({ extended: true })) // allows paramters to url
app.use(morgan('dev')) // does logging, time it takes

app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

// middlewares

/*

const router = express.Router()

// /api/item
router
  .route('/')
  .get((req, res) => {
    res.send({ me: 'get cat' })
  })
  .post((req, res) => {
    res.send({ me: 'post cat' })
  })

// /api/item/:id
router
  .route('/:id')
  .get((req, res) => {
    res.send({ me: 'get cat id' })
  })
  .put((req, res) => {
    res.send({ me: 'put cat id' })
  })
  .delete((req, res) => {
    res.send({ me: 'delete cat id' })
  })

app.use('/api/item', router)

export const start = async () => {
  try {
    app.listen(3000, () => {
      console.log(`REST API on http://localhost:3000/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

*/

// const routes = [
//   'get /cat',
//   'get /cat/:id',
//   'pot /cat/:id',
//   'put cat/:id',
//   'delete /cat/:id'
// ]

// router
//   .route('/cat')
//   .get()
//   .post()

// router
//   .route('/cat/:id')
//   .get()
//   .put()
//   .delete()

/*

export const start = () => {
  app.listen(3000, () => {
    console.log('server port is 3000')
  })
}

const router = express.Router()

router.get('/me', (req, res) => {
  // console.log(req.body)
  res.send({ me: 'hello' })
})

app.use('/api', router)
// this will allow access to localhost/api/me

const log = (req, res, next) => {
  console.log('logging')
  // how to comnmunicate between middleware
  // req.mydata
  next()
}
// if i were to enable logging for everything
// app.use(log)

// post data controller
// [C]reate
app.post('/data', (req, res) => {
  // console.log(req.body)
  res.send(req.body)
})

// get data controller
// add a log(middleware)
// [R]ead
app.get('/', log, (req, res) => {
  res.send({ data: [1, 2, 3] })
})

// [U]pdate
app.put('/data', (req, res) => {})

// [D]elete
app.delete('/data', (req, res) => {})

// how you start server
export const start = () => {
  app.listen(3000, () => {
    console.log('server port is 3000')
  })
}
*/
