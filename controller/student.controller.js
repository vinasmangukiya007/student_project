const studentModel = require("../model/student.model")
var jwt = require('jsonwebtoken')
module.exports = {
        login: async (req, res) => {
        res.render('studentlogin')
    },
    loginform: async (req, res) => {
        console.log(req.body);
        var data = await studentModel.findOne({ email: req.body.email })
        if (data) {
            if (data.password == req.body.password) {
                var token = jwt.sign({ id: data._id }, "developer")
                res.cookie('studentToken', token)
                res.redirect('/student/studenthome')
            } else {
                res.redirect('back')
            }
        } else {
            res.redirect('back')
        }
    },
    studenthome:async(req,res)=>{
        var data = await studentModel.findById(req.user._id).populate({path:"paid",model:"fees"})
        res.render('studenthome',{data})
    }

}