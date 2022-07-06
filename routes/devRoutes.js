const express = require('express')
const router = express.Router()
const DevController = require("../controller/DevController")

router.get("/", DevController.showDev)


module.exports = router