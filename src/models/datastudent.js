const mongoose = require("mongoose");
// const validator = require("validator");

const dataSchema = new mongoose.Schema({
   
    firstName : {
        type : String,
       
    } ,
    lastName : {
        type : String,
       
    } ,
    email:{
            type : String,
        },
    score:{
            type : Number,
        }
   
})
const Datastudent = new mongoose.model('Datastudent',dataSchema);
module.exports = Datastudent;