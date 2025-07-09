const express=require('express');
const app=express();
const cors = require('cors')
const mysql=require('mysql2');


const mq=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'rental',
    waitForConnections:true,
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.post('/top',(req,res) => {
    const {employee_name,salary,designation,join_date,employee_phone_number,employee_mail}=req.body;
    const query=`INSERT INTO employee (employee_name,salary,designation,join_date,employee_phone_number,employee_mail) VALUES (?, ?, ?, ?, ?, ?)`;
    mq.query(query,[employee_name,salary,designation,join_date,employee_phone_number,employee_mail],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new employee Added"})
    })
})

app.delete('/reeba/:employee_id',(req,res) => {
    const {employee_id} = req.params;
    const query = `delete from employee where employee_id= ?`;
    mq.query(query,[employee_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`employee with employee_id ${employee_id} deleted successfully`});
    })
})


app.put('/sh/:employee_id',(req,res) => {
    const {employee_id} = req.params;
    const {employee_mail} = req.body;
    // const {salary,designation,join_date,employee_phone_number,employee_mail}=req.body;
    const query=`update employee set employee_mail = ? where employee_id = ?`;
     mq.query(query,[employee_mail,employee_id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:" employee mail updated successfully"})
    })
})

app.get('/employee', (req, res) => {
    const query = 'SELECT * FROM employee';
    
    mq.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while fetching data" });
        }
        res.json(results);

    });
});


app.listen(10000,()=>console.log("server started"));