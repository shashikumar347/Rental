const express=require('express');
const app=express();
const mysql=require('mysql2');
const cors = require('cors')

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
    const {tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required}=req.body;
    const query=`INSERT INTO ticket (tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    mq.query(query,[tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new user Added"})
    })
})

app.delete('/reeba/:tenant_id',(req,res) => {
    const {tenant_id} = req.params;
    const query = `delete from ticket where tenant_id = ?`;
    mq.query(query,[tenant_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`ticket with tenant_id ${tenant_id} deleted successfully`});
    })
})


app.put('/shashi/:tenant_id',(req,res) => {
    const {tenant_id} = req.params;
    const {tenant_name} = req.body;
    // const {tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required}=req.body;
    const query=`update ticket set tenant_name = ? where tenant_id = ?`;
    mq.query(query,[tenant_name,tenant_id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"tenant name updated successfully"})
    })
})

app.get('/tickets', (req, res) => {
    const query = 'SELECT * FROM ticket';
    
    mq.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while fetching data" });
        }
        res.status(200).json(results);

    });
});


app.listen(9000,()=>console.log("server started"));