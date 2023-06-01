//For Client side application - basic configuration
const express = require("express");
const app = express();
const bodyParser = require ("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
        user: "root",
        password: "password",
        database: "student_db"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM student_table";
    db.query(sqlSelect, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req,res) => { 
    const {firstname,lastname,Location,Email,DOB,Education} = req.body;
    const sqlInsert = 
    "INSERT INTO student_table (`firstname`, `lastname`, `Location`, `Email`, `DOB`, `Education`) VALUES (?, ?, ?, ?, ?, ?)";
    //  "INSERT INTO `student_db`.`student_table` (`firstname`, `lastname`, `Location`, `Email`, `DOB`, `Education`) VALUES ('?', '?', '?', '?', '?', '?')";
     db.query(sqlInsert, [firstname,lastname,Location,Email,DOB,Education], (error, result) => {
        if(error){
            console.log(error);
        }     

     });
});

app.delete("/api/remove/:id", (req,res) => { 
    const {id} = req.params;
    const sqlRemove = "DELETE FROM student_table WHERE id = ?"; 
    db.query(sqlRemove,id, (error, result) => {
        if(error){
            console.log(error);
        }     

     });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlSelect = "SELECT * FROM student_table where id = ?";
    db.query(sqlSelect, id, (error, result) => {
        if(error){
            console.lpg(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {firstname,lastname,Location,Email,DOB,Education} = req.body;
    const sqlUpdate = "UPDATE student_table SET firstname = ?, lastname = ?, Location = ?, Email = ?, DOB = ?, Education = ?  WHERE id = ?";
    
    db.query(sqlUpdate,[firstname,lastname,Location,Email,DOB,Education, id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
//     // const sqlSelect = "SELECT * FROM student_table";
//     const sqlInsert = 
//     "INSERT INTO `student_db`.`student_table` (`First Name`, `Last Name`, `Location`, `Email`, `DOB`, `Education`) VALUES ('Dinesh', 'Karthick', 'madurai', 'dk06@gmail.com', '2000-12-06', 'MSC')";
//     // const sqlInsert = 
//     // "INSERT INTO student_table('id', 'First Name', 'Last Name', 'Location', 'Email', 'DOB', 'Education') VALUES(1, 'Raji', 'Lakshmi', 'Madurai', 'raji06@gmail.com', '2000-09-06', 'MSC')";
//     db.query(sqlInsert, (error, result) => {
//         console.log("error",error);
//         console.log("result",result);
//     res.send("Hello World");
// });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})