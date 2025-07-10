const express=require('express');
const app=express();
const mysql=require('mysql2');

const mq=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'laddu',
    waitForConnections:true,
})

app.use(express.json());

app.post('/submit',(req,res)=>{
    const { name,salary,designation,Joindate,mobileno,email }=req.body;
    const query=`INSERT INTO employee (name, salary, designation, Joindate, mobileno, email) VALUES (?, ?, ?, ?, ?, ?)`;
    mq.query(query,[name,salary,designation,Joindate,mobileno,email],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success",message:"new Employee Added"})
    })
})

app.get('/',(req,res)=>{
    res.send("Entered get Method");
    console.log("Enetered get Method");
});

app.listen(9000,()=>console.log("server started"));