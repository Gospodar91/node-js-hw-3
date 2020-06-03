const express = require("express");
const mongoose = require('mongoose')
const contactsActions=require('./routes/route')
const  bodyParser = require('body-parser')

const morgan = require("morgan");

require("dotenv").config();
const cors = require('cors');
const PORT=process.env.PORT

class MongoDBServer {

  constructor(){
    this.server = null;
  }

async start(){
  this.initServer()
  this.initMiddleware()
  this.initRout()
  await this.initDataBase()
  this.startListening()
}
initServer=()=>{
  this.server = express();
}
initMiddleware=()=>{
this.server.use(express.json());
this.server.use(express.static("public"));
this.server.use(morgan("dev"));
this.server.use(bodyParser.urlencoded({ extended: true }));
// this.server.use(cors({origin:process.env.ALLOWED_ACESS}))

}
initRout=()=>{
  this.server.use('/',contactsActions)

}
initDataBase=()=>{
  try{
  mongoose.connect(process.env.MONGODB_URL)
  console.log("Database connection successful");
} catch (error) {
  console.log("Connecting error:", error.message);
  process.exit(1);
}
}
startListening=()=>{

  this.server.listen(PORT,()=>{
    console.log('server started on',PORT )
  })
}
}

new MongoDBServer().start();
















// async function initDataBase(){
//   await mongoose.connect(MONGODB_URL)
//   console.log('DataBase started')
// }

// initDataBase()
// const server = express();

// server.use(express.json());
// server.use(express.static("public"));
// server.use(morgan("dev"));
// server.use(cors({origin:ALLOWED_ACESS}))

// server.get("/", function (req, res) {
//   res.send("hello, world!");
// });
// server.get("/api/contacts", async (req, res, next) => {


// });

// server.get("/api/contacts/:id", (req, res, next) => {
//   const validationContact = Joi.object({
//     id:Joi.objectId(),

//   });

//   const validationResult = Joi.validate(req.params, validationContact);

//   return contacts.getContactById(req, res, req.params.id);
// });
// server.delete("/api/contacts/:id", (req, res, next) => {
//   const validationContact = Joi.object({
//     id:Joi.objectId(),

//   });

//   const validationResult = Joi.validate(req.params, validationContact);

//   return contacts.removeContact(req, res, req.params.id);
// });
// server.post(
//   "/api/contacts",
//   (req, res, next) => {
//     const validationContact = Joi.object({

//       name: Joi.string().required(),
//       email: Joi.string().required(),
//       phone: Joi.string().required(),
//     });
//     const validationResult = Joi.validate(req.body, validationContact);
//     if (validationResult.error) {
//       res.status(400).send(validationResult.error.details[0].message);
//     } else {
//       next();
//     }
//   },
//   (req, res) => {
//     return  contacts.createUser(req.body,res)
//   }
// );

// {
// }
// server.patch(
//   "/api/contacts/:contactId",
//   (req, res, next) => {
//     const validationContact = Joi.object({
//       name: Joi.string(),
//       email: Joi.string(),
//       phone: Joi.string(),
//     });
//     const validationResult = Joi.validate(req.body, validationContact);
//     if (validationResult.error) {
//       resp.status(400).send(validationResult.error.details[0].message);
//     } else {
//       next();
//     }
//   },
//   (req, res) => {
//     const id = req.params.contactId;
//     console.log("req.body", req.body);
//     return contacts.updateContact(req.body, res, id);
//   }
// );
// server.listen(PORT, () => {
//   console.log("Server is now started on port: ", PORT);
// });