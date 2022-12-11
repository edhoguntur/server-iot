const express = require('express')
const arduino = require('../controllers/arduino.controller')
const base = require('../controllers/base.controller')
const router = express.Router()
//const auth = require('../middleware/apiAuth')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get("/", base.home);

// define the arduino route
router.post("/arduino/create", arduino.create)
router.get("/arduino/findAll", arduino.findAll);
router.get("/arduino/findByName/:id", arduino.findByName);



module.exports = router