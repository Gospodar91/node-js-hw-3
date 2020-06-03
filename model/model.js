const mongoose = require('mongoose')
const {
  Schema
} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }


})



UserModel = mongoose.model(
  'Contacts', userSchema)


module.exports =
  UserModel