import express  from "express";
import mysql from "mysql";
import cors from 'cors'


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "password123",
    database:"mydb",
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json("hello to backend")
})

app.get("/questions", (req,res) => {
    const q = 'SELECT * FROM questions'
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, () => {
    console.log('Connected')
})