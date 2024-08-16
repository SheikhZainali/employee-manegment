import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
const app=express();

app.use(cors())
app.use(express.json())
const db=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee"
})
app.get('/',(req,res)=>{
    const sql="SELECT * FROM employee"
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"error in server side"});
        return res.json(result)
    })
})
app.get('/read/:id',(req,res)=>{
    const sql="SELECT * FROM employee where ID=?"
    const id=req.params.id
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"error in server side"});
        return res.json(result)
    })
})
app.post('/addemployee',(req,res)=>{
    const sql="INSERT INTO employee (`empname`,`salary`) VALUES(?)"
    const values=[
        req.body.empname,
        req.body.salary
    ]
    db.query(sql,[values],(err,result)=>{
     if(err) return res.json(err); 
     return res.json(result)
    })
})
app.put('/edit',(req,res)=>{
    const sql='UPDATE employee SET `empname`=?,`salary`=? WHERE id=?'
    const values=[
        req.body.id,
        req.body.empname,
        req.body.salary
    ]
    db.query(sql,[req.body.empname,req.body.salary,req.body.id],(err,result)=>{
     if(err) return res.json(err); 
     return res.json(result)
    })
})
app.listen(8081,()=>{
    console.log("listening");
})
