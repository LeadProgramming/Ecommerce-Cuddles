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

router.get('/api/admin/orders', (req, res) => {
    pool.query(`SELECT item.ItemImage, OrderID, status, orderDate, charge, item.ItemName, quantity, item.ItemPrice, username FROM ordertable INNER JOIN item ON item.ItemID = ordertable.ItemID;`, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result);
        }
    })
});
router.get('/api/admin/sales/daily', (req, res) => {
    let today = new Date();
    pool.query(`SELECT COUNT(OrderID) AS count, FORMAT(SUM(charge),2) AS profit FROM ordertable WHERE orderDate = "${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}";`, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result[0]);
        }
    })
})
router.get('/api/admin/sales/weekly', (req, res) => {
    let today = new Date();
    let lastWeek = new Date(today.getDate() - 7);
    pool.query(`SELECT COUNT(OrderID) AS count, FORMAT(SUM(charge),2) AS profit FROM ordertable WHERE orderDate BETWEEN "${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()}" AND "${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}" ;`, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result[0]);
        }
    })
})
router.get('/api/admin/sales/monthly', (req, res) => {
    let today = new Date();
    let lastMonth = new Date(today.getDate() - 31);
    pool.query(`SELECT COUNT(OrderID) AS count, FORMAT(SUM(charge),2) AS profit FROM ordertable WHERE orderDate BETWEEN "${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1}-${lastMonth.getDate()}" AND "${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}" ;`, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result[0]);
        }
    })
})
router.get('/api/admin/sales/yearly', (req, res) => {
    let today = new Date();
    let lastYear = new Date(today.getDate() - 365);
    pool.query(`SELECT COUNT(OrderID) AS count, FORMAT(SUM(charge),2) AS profit FROM ordertable WHERE orderDate BETWEEN "${lastYear.getFullYear()}-${lastYear.getMonth() + 1}-${lastYear.getDate()}" AND "${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}" `, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result[0]);
        }
    });
})
router.get('/api/admin/sales/leaderboard', (req, res) => {
    pool.query(`SELECT item.ItemImage, item.ItemName, item.ItemPrice, COUNT(ordertable.ItemID) AS sold FROM ordertable INNER JOIN item ON ordertable.ItemID = item.ItemID GROUP BY ordertable.ItemID ORDER BY sold DESC; `, (err, result) => {
        if (err) {
            res.status(400);
            throw err;
        }
        else {
            res.status(200).send(result);
        }
    })
})
module.exports = router; 