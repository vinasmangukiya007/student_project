const adminModel = require("../model/admin.model")
var jwt=require("jsonwebtoken")
const studentModel = require("../model/student.model")
var fs = require('fs')
const feesModel = require("../model/fees.model")
var path = require("path")


module.exports={
    dashbord:(req,res)=>{
        res.render('dashbord')
    },
    addstudent:(req,res)=>{
        res.render('addstudent')
    },
    adminlogin:(req,res)=>{
        res.render('adminlogin')
    },
    adminloginform:async(req,res)=>{
        var data = await adminModel.findOne({email:req.body.email})
        console.log(data);
        if(data){
            if(data.password == req.body.password){
                var token = jwt.sign({id:data._id},'developer')
                res.cookie('token',token)
                res.redirect('/admin')
            }else{
                res.redirect('/admin/adminlogin')
            }
        }else{
            res.redirect('/admin/adminlogin')
        }
    },
    adminprofile:(req,res)=>{
        res.render('adminprofile')
    },
    allstudent: async(req,res)=>{
       var student = await studentModel.find()
       res.render('allstudent',{student})
    },
    addstudentform:async(req,res)=>{
        console.log(req.file);

        req.body.img = "/"+ req.file.filename
        var data = await studentModel.create(req.body)
        if(data){
            res.redirect('/admin/allstudent')
        }else{
            res.redirect('back')
        }
    },
    deletestudent:async(req,res)=>{
        var deletedata = await studentModel.findByIdAndDelete(req.params.id)
        if(deletedata){
            res.redirect('back')
        }else{          
           res.redirect('back')
        }
    },
    more:async(req,res)=>{
        var student = await studentModel.findById(req.params.id).populate({path:"paid",model:"fees"})
        console.log(student);
        if(student){

            res.render('adminprofile',{student});
        }else{
            res.redirect('back');
        }
    },
    studentupdate:async(req,res)=>{
        if(req.file){
            var data = await studentModel.findById(req.params.id)
            if(fs.existsSync(path.join(__dirname,"../uploads",data.img))){
                fs.unlinkSync(path.join(__dirname,"../uploads",data.img))
            }
            req.body.img = "/" + req.file.filename
        }
        var updatedate = await studentModel.findByIdAndUpdate(req.params.id,req.body)
        if(updatedate){
            res.redirect('back');
        }else{
            res.redirect('back');
        }
    },
    paidfees:async(req,res)=>{
        console.log(req.body,req.params);
        req.body.studentId = req.params.id
        var data = await feesModel.create(req.body)
        if(data){
            var student = await studentModel.findByIdAndUpdate(req.params.id, {$push : {paid:data._id}})
            res.redirect('back')
        }else{
            res.redirect('back')
        }
    }
    
}