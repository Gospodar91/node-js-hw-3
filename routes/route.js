const express=require('express')
const router =express.Router()
const  db_Actions = require("../controllers/actions");
const validations = require("../controllers/validation");
console.log('RUTE---------------------', )

router.get("/", db_Actions.listContacts);
router.get("/:contactId", db_Actions.findContact);
router.post("/", validations.validateRequest, db_Actions.addContact);
router.delete('/:contactId',validations.validateRequest,db_Actions.deleteContact)

router.patch(
    "/:contactId",
    validations.validateRequest,
    db_Actions.updateContact
  );
  
  module.exports = router;



