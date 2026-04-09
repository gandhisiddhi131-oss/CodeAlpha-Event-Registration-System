const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Root@2006",
database:"event_system"
})

db.connect(err=>{
if(err) throw err
console.log("MySQL Connected")
})

app.get("/events",(req,res)=>{
db.query("SELECT * FROM events",(err,result)=>{
if(err) throw err
res.json(result)
})
})

app.post("/register",(req,res)=>{

const {name,email,event_id} = req.body

const sql="INSERT INTO registrations (name,email,event_id) VALUES (?,?,?)"

db.query(sql,[name,email,event_id],(err,result)=>{
if(err) throw err
res.json({message:"Registration Successful"})
})

})

app.get("/registrations",(req,res)=>{

const sql = `
SELECT registrations.id, registrations.name, registrations.email, events.event_name
FROM registrations
JOIN events ON registrations.event_id = events.id
`

db.query(sql,(err,result)=>{
if(err) throw err
res.json(result)
})

})


app.listen(3000,()=>{
console.log("Server running on port 3000")
})
app.delete("/registration/:id",(req,res)=>{

const id = req.params.id

db.query("DELETE FROM registrations WHERE id=?",[id],(err,result)=>{
if(err) throw err
res.json({message:"Registration Cancelled"})
})

})
