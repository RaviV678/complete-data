const express= require("express");
require("./database/conn");
const App = express();
const port = process.env.PORT || 8000;
const Student= require("./models/students");
const Datastudent = require("./models/datastudent");
const Cors= require("cors");
App.use(express.json());
App.use(Cors());


// create a new student

App.post("/datastudent",async(req,res)=>{
  try{
    const data=req.body
    console.log(data);
    const user =await new Datastudent(data);
    const val=await user.save();
    res.json(val)
  } 
  catch(e){
    res.send(e);
  }
})
App.get("/datastudent",async(req,res)=>{
  try{
      const getD=req.body;
      console.log(getD);
      const std = await Datastudent.find(getD);
      res.send(std);
  }catch(e){
      res.send(e);
  }
})


App.delete("/datastudent/:id",async(req,res)=>{
  try{
      const id=req.params.id;
      // console.log(id);
      const deleteStudent = await Datastudent.findByIdAndDelete(id);
      if(!id){
        return res.send("incorrect id");
      }
      res.send(deleteStudent)
  }catch(e){
      res.send(e);
  }
})






App.post("/students",async(req,res)=>{
  try{
    const data=req.body
    console.log(data);
    const user =await new Student(data);
    const val=await user.save();
    res.json(val)
  } 
  catch(e){
    res.send(e);
  }
})

App.get("/students",async(req,res)=>{
  try{
      const getD=req.body;
      console.log(getD);
      const std = await Student.find(getD);
      res.send(std);
  }catch(e){
      res.send(e);
  }
})

App.listen(port , ()=>{
    console.log(`connection is setup at ${port}`);
})



    module.exports=App;

  