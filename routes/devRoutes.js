const express = require('express')
const router = express.Router()
const DevController = require("../controllers/DevController")
const checkAuth = require('../helpers/auth').checkAuth


router.get("/about",  DevController.about)
router.get("/add",checkAuth, DevController.createDev)
router.post("/add",checkAuth, DevController.createDevSave)
router.get("/edit/:id",checkAuth, DevController.updateDev)
router.post("/edit",checkAuth, DevController.updateDevSave)
router.get("/dashboard",checkAuth, DevController.dashboard)
router.post("/remove",checkAuth, DevController.removeDev)
router.get("/", DevController.showDev)


module.exports = router