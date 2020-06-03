const model_DB = require('../model/model')


exports.listContacts = async (req, res) => {
  try {
    const data = await model_DB.find()

    return res.status(200).json(data);
  } catch (err) {
    res.send(error);
  }

}
exports.addContact = async (req, res, next) => {

  try {
    const data = await model_DB.create(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.findContact = async (req, res) => {
  try {
    console.log('req.params', req.params.contactId)
    const id = req.params.contactId
    const data = await model_DB.findOne({
      _id: id
    })
    return res.status(200).json(data)
  } catch (err) {
    res.send(error);
  }

}
exports.deleteContact = async (req, res) => {
  const id = req.params.contactId
  if (id) {
    try {
      const data = await model_DB.findByIdAndDelete({
        _id: id
      })
      return res.status(200).json(data)
    } catch (err) {
      res.send(error);
    }
  }

}
exports.updateContact =  async(req, res,) => {
  const id = req.params.contactId
  console.log('req.body', req.body)
  const newData=req.body
  if (id) {
    try {
      const data = await model_DB.findOneAndUpdate({
        _id: id
      }, {
        $set: newData
      }, {
        new: true
      })
return res.status(200).json(data)
    } catch (err) {
      res.send(error);
    }
  }


}
