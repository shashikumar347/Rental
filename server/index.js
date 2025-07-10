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


app.post('/tickets',(req,res) => {
    const {tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required}=req.body;
    const query=`INSERT INTO ticket (tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    mq.query(query,[tenant_name,issue_type,description,status,employee_name,closed_date,ticket_title,follow_up_required],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new user Added"})
    })
})

app.delete('/tickets/:tenant_id',(req,res) => {
    const {tenant_id} = req.params;
    const query = `delete from ticket where tenant_id = ?`;
    mq.query(query,[tenant_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`ticket with tenant_id ${tenant_id} deleted successfully`});
    })
})


app.put('/tickets/:tenant_id',(req,res) => {
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






/// expenses

app.post('/expenses',(req,res) => {
    const {expenses_type,expenses_amount,expenses_date,expenses_status,description}=req.body;
    const query=`INSERT INTO expenses (expenses_type,expenses_amount,expenses_date,expenses_status,description) VALUES (?, ?, ?, ?, ?)`;
    mq.query(query,[expenses_type,expenses_amount,expenses_date,expenses_status,description],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new expenses Added"})
    })
})

app.delete('/expenses/:expenses_id',(req,res) => {
    const {expenses_id} = req.params;
    const query = `delete from expenses where expenses_id= ?`;
    mq.query(query,[expenses_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`expenses with expenses_id ${expenses_id} deleted successfully`});
    })
})


app.put('/expenses/:expenses_id',(req,res) => {
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

app.get('/expenses', (req, res) => {
    const query = 'SELECT * FROM expenses';
    
    mq.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while fetching data" });
        }
        res.json(results);

    });
});



// employee
app.post('/employee',(req,res) => {
    const {employee_name,salary,designation,join_date,employee_phone_number,employee_mail}=req.body;
    const query=`INSERT INTO employee (employee_name,salary,designation,join_date,employee_phone_number,employee_mail) VALUES (?, ?, ?, ?, ?, ?)`;
    mq.query(query,[employee_name,salary,designation,join_date,employee_phone_number,employee_mail],(err,result)=>{
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:"new employee Added"})
    })
})

app.delete('/employee/:employee_id',(req,res) => {
    const {employee_id} = req.params;
    const query = `delete from employee where employee_id= ?`;
    mq.query(query,[employee_id],(err,result) => {
        if(err){
            return res.status(500).json({message:"error Occured"});
        }
        res.status(200).json({status:"success", message:`employee with employee_id ${employee_id} deleted successfully`});
    })
})


app.put('/employee/:employee_id',(req,res) => {
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


app.listen(8080,()=>console.log("server started"));