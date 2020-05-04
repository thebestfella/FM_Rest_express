//needs to pass model as the crud will be universal
export const getOne = model => async (req, res) => {
  // const id = req.params.id
  // const user = req.params._id
  // const doc = await model.findOne({ _id: id, createdBy: user }).exec()

  // if (!doc) {
  //   return res.status(404).end()
  // }

  // res.status(200).json({ data: doc })

  const doc = await model.findOne({
    createdBy: req.user._id,
    _id: req.params.id
  })
  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const doc = await model.find({ createdBy: req.user._id })
  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

//create (post request) should be 201
export const createOne = model => async (req, res) => {
  const doc = await model.create({ ...req.body, createdBy: req.user._id })
  if (!doc) {
    return res.status(400).end()
  }
  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {
      createdBy: req.user._id,
      _id: req.params.id
    },
    req.body,
    { new: true } // need this to get back the updated object
  )
  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model.findOneAndDelete({
    createdBy: req.user._id,
    _id: req.params.id
  })
  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
