var jwt = require('jsonwebtoken')
const adminModel = require('../model/admin.model')

var verifytoken = async(req,res,next)=>{
    var token = req.cookies.token
    if(token){
        var verify = jwt.verify(token,'developer')
        if(verify){
            var data = await adminModel.findById(verify.id)
            if(data){
                next();
            }else{
                res.redirect('/admin/adminlogin')
            }
        }else{
            res.redirect('/admin/adminlogin')
        }
    }else{
        res.redirect('/admin/adminlogin')
    }
}

module.exports = verifytoken