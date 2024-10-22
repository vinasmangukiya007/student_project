const cookieparser = require('cookie-parser')
var express = require("express")
const path = require('path')
var app = express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.set(express.static(path.join(__dirname,"views")))
app.use(express.static(path.join(__dirname,"assets")))
app.use(express.static(path.join(__dirname,"uploads")))

require('./mongoose')
app.use(cookieparser())

app.use('/admin', require('./router/admin.router'))
app.use('/student', require('./router/student.router'))

app.get('/',(req,res)=>{
    res.redirect('/admin')
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("server is running");
    }   
})