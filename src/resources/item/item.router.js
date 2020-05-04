import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

// const mockController = (req, res) => {
//   res.json({ message: 'ok' })
// }

// /api/item
router
  .route('/')
  .get(controllers.getOne) // read many
  .post(controllers.createOne) // create one

// //(req, res) => {
// // think this is the response as the final return
// // res.status(404).end({ message: 'not found' })
// res
//   .status(404)
//   .json({ message: 'not found' })
//   // res.send({ me: 'get cat' })
//   //})

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne) // read one
  .put(controllers.updateOne) // update one
  .delete(controllers.removeOne) // delete one

export default router
