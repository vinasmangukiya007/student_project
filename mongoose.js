var mongoose = require('mongoose')

var db = mongoose.connection
mongoose.connect('mongodb+srv://mangukiyavinas400:vinasM@vinas.is9q3.mongodb.net/student_project')
db.once('open',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('db connected');
    }
})