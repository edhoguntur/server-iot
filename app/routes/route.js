const express = require('express')
const arduino = require('../controllers/arduino.controller')
const sensor = require('../controllers/sensor.controller')
const base = require('../controllers/base.controller')
const router = express.Router()
const auth = require('../middleware/apiAuth')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get("/", base.home);

// define the arduinos route
router.post("/arduino/create", arduino.create)
router.get("/arduino/findAll", arduino.findAll);
router.get("/arduino/findByName/:name", arduino.findByName);

// define sensors route
router.get("/sensor/findAll", sensor.findAll)

module.exports = router