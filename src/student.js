const route = require('express').Router();
const stud = require("./models/user");
const bodyParser = require("body-parser");
const data=require("./InitialData")

const port = 8080
// route.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
// route.use(express.json());
route.use(bodyParser.urlencoded({ extended: false }))
route.use(bodyParser.json())
route.get("/api/student",async(req,res)=>{
   try{
    const  stu= await stud.find()
    
        res.json({
            status :"success",
            stu:stu
        })
   }catch(e){
         res.status(404).json({
            err:e.message
         })
   }
  
})  
route.get("/api/student/:id",async(req,res)=>{
    try{
     const  stu= await stud.find({_id:req.params.id})
     console.log(stu.length)
     if(!stu.length){
        return res.status(404).json({
            errr:"enter valid id"
        })
     }
         res.json({
             status :"success",
             stu:stu
         })
    }catch(e){
          res.json({
             err:e.message
          })
    }
   
 })  
 route.put("/api/student/:id",async(req,res)=>{
    try{
     const  stu= await stud.updateOne({_id:req.params.id},{$set:{name:req.body.name}})
     console.log(stu)
     if(!stu.modifiedCount){
        return res.status(404).json({
            errr:"enter valid id"
        })}
         res.json({
             status :"success",
             stu:stu
         })
    }catch(e){
          res.json({
             err:e.message
          })
    }
   
 }) 
 route.delete("/api/student/:id",async(req,res)=>{
    try{
     const  stu= await stud.deleteOne({_id:req.params.id})
     console.log(stu.deletedCount)
     if(!stu.deletedCount){
        return res.status(404).json({
            errr:"enter valid id"
        })
     }
         res.json({
             status :"success",
             stu:stu
         })
    }catch(e){
          res.json({
             err:e.message
          })
    }
   
 }) 
route.post("/api/student",async(req,res)=>{
    try{
        const count= await stud.findOne().sort({_id:-1}).limit(1);
          const i=count._id+1;
          console.log(count,count._id)
        const  stu= await stud.create({
            _id: i,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        
            res.json({
                status:"success",
                stu:stu
                
            })
       }catch(e){
             res.status(400).json({
                err:e.message
             })
       }
})






















module.exports = route;



