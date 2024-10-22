var express = require('express')
var router = express.Router()
var controller = require("../controller/admin.controller")
var middleware = require('../middleware/admin.middleware')
const upload = require('../multer')

router.get('/',middleware,controller.dashbord)
router.get('/addstudent',controller.addstudent)
router.get('/adminlogin',controller.adminlogin)
router.get('/adminprofile',controller.adminprofile)
router.get('/allstudent',controller.allstudent)
router.get('/delete/:id',middleware,controller.deletestudent)
router.get('/more/:id',middleware,controller.more)

router.post('/adminlogin',controller.adminloginform)
router.post('/addstudent',middleware,upload.single('img'),controller.addstudentform)
router.post('/update/:id',middleware,upload.single('img'),controller.studentupdate)

router.post("/paidfees/:id",middleware,controller.paidfees)

module.exports = router;