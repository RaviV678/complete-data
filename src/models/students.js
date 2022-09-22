const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    firstName : {
        type : String,
       
    } ,
    lastName : {
        type : String,
       
    } ,
    
    
    email:{
            type:String,
        },
    password:{
            type:String
        }
   
})
const Student = new mongoose.model('Student',studentSchema);
module.exports = Student;