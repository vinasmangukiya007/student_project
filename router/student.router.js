var express = require('express')
var router = express.Router()
var controller = require('../controller/student.controller')
var middleware = require('../middleware/student.middleware')

router.get("/studentlogin",controller.login)  
router.post("/studentlogin",controller.loginform)
router.get("/studenthome",middleware,controller.studenthome)


router.get('/logout',middleware,(res,req)=>{
    res.cookie('studenttoken',"")
    res.clearCookie()
    res.redirect('/student/studentlogin')
})


module.exports = router;