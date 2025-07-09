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

app.post('/submit',(req,res) => {
    const {expenses_type,expenses_amount,expenses_date,expenses_status,description}=req.body;
    const query=`INSERT INTO expenses (expenses_type,expenses_amount,expenses_date,expenses_status,description) VALUES (?, ?, ?, ?, ?)`;
    mq.query(query,[expenses_type,expenses_amount,expenses_date,expenses_status,description],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new expenses Added"})
    })
})

app.delete('/reeba/:expenses_id',(req,res) => {
    const {expenses_id} = req.params;
    const query = `delete from expenses where expenses_id= ?`;
    mq.query(query,[expenses_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`expenses with expenses_id ${expenses_id} deleted successfully`});
    })
})


app.put('/shashi/:expenses_id',(req,res) => {
    const {expenses_id} = req.params;
    const {expenses_type} = req.body;
     // const {expenses_amount,expenses_date,expenses_status,description}=req.body;
    const query=`update expenses set expenses_type = ? where expenses_id = ?`;
    mq.query(query,[expenses_type,expenses_id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"expenses type updated"})
    })
})

app.get('/submit', (req, res) => {
    const query = 'SELECT * FROM expenses';
    
    mq.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while fetching data" });
        }
        res.json(results);

    });
});


app.listen(11000,()=>console.log("server started"));