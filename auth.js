require('dotenv').config()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
})

let userList = {
    'admin': 'diana',
};

router.post('/api/register', (req, res) => {
    pool.query(`SELECT username FROM user WHERE username="${req.body.username}"`, (err, result) => {
        if (err) {
            throw err;
        }
        else if (result.length === 0) {
            pool.query(`INSERT INTO user (username, password, fullname, email, phone) VALUES ("${req.body.username}","${req.body.password}","${req.body.fullName}","${req.body.email}","${req.body.phone}")`, (err) => {
                if (err) {
                    res.status(400).send("Account has not been registered. Please retry.");
                    throw err;
                }
                else {
                    res.status(200).send({ account: "user", user: req.body.username });
                }
            });
        }
        else {
            res.status(400).send("Username already exists.");
        }
    })
});

router.get('/showUsers', (req, res) => {
    res.json(userList);
});

router.post('/login', (req, res) => {
    if (userList[req.body.username] === req.body.password) {
        res.status(200).send({ account: "admin", user: "admin" });
    }
    else {
        pool.query(`SELECT username, password FROM user WHERE username = "${req.body.username}" AND password = "${req.body.password}"`, (error, result) => {
            if (error) {
                res.status(400);
                throw error;
            }
            else if (result.length > 0) {
                res.status(200).send({ account: "user", user: req.body.username });
            }
            else {
                res.status(400).send("Wrong username/password.");
            }
        });
    }
})

module.exports = router;