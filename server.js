const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//connecting to the database and checking for errors if any are present
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skylark_demo'
});

db.connect(err => {
    if (err) {
        return err;
    }
})

app.use(cors());
app.use(express.json());

app.get("/api/user/:username/:password",(req, res) => {
    const reqName = req.params.username;
    const reqPass = req.params.password;
    console.log(req.params.username);
    console.log(req.params.password)
    db.query(`SELECT * FROM users`, ((err, result) =>{
        if (err) {
            console.log(err);
        }else {
            let userArray = Object.keys(result)
            userArray.filter(item => {
                let x = result[item]
                if(x.user_name === reqName && x.user_password === reqPass){
                    console.log(x);
                    res.send(result[item]);
                }
            });
        };
    })
)});

app.get('/friends/:userid', (req,res) => {
    db.query(`SELECT users.user_name FROM users LEFT JOIN friends ON friends.user_id2 = users.id WHERE friends.user_id1 = ${req.params.userid}`, (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.send(result);
        };
    });

});

app.get('/users', (req,res) => {
    db.query(`SELECT users.id, users.user_name,quotes.quote FROM quotes INNER JOIN users ON quotes.user_id = users.id`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/friends/:userid', (req, res) => {
    console.log(req.body)
    const userId = req.params.userid;
    const friendId = req.body.friendId
    console.log(`friendId: ${friendId}`)
    db.query(
        'INSERT INTO friends (user_id1, user_id2) VALUES (?,?)', 
        [userId, friendId], (err, result) => {
            if (err){
                console.log(err);
            }else {
                res.send("values inserted")
            }
        }   
    );
})

app.listen(4000, () => {
    console.log(`console server listening on port 4000`)
})