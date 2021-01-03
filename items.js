require('dotenv').config()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(fileUpload());

let pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
})

router.get("/api/items", (req, res) => {
    pool.query(`SELECT * FROM item`, (err, result) => {
        if (err) {
            res.status(400).send("Cannot update address information.");
            throw err;
        }
        else {
            res.status(200).send(result);
        }
    });
})

router.post("/api/items", (req, res) => {
    let query = "INSERT INTO item SET ?", values = {
        ItemID: req.body.id,
        ItemName: req.body.name,
        ItemQuantity: req.body.quantity,
        ItemPrice: req.body.price,
        ItemDescription: req.body.description,
        ItemImage: req.files.image.data
    };
    pool.query(query, values, (err, result) => {
        console.log(err);
        if (err) {
            res.status(400).send(`Cannot create ${values.ItemName}.`);
            throw err(`Cannot create ${values.ItemName}`);
        }
        else {
            res.status(200).send(`Successfully created ${values.ItemName}.`);
        }
    });
});
router.put("/api/items", (req, res) => {
    let query = `UPDATE item SET ? WHERE ItemID = ${req.body.id};`, values = {
        ItemID: req.body.id,
        ItemName: req.body.name,
        ItemQuantity: req.body.quantity,
        ItemPrice: req.body.price,
        ItemDescription: req.body.description,
        ItemImage: req.files.image.data
    }
    pool.query(query, values, (err) => {
        if (err) {
            res.status(400).send(`Cannot update ${values.ItemName}.`);
            throw err("Cannot Update Item")
        }
        else {
            res.status(200).send(values.ItemName + " has been updated.");
        }
    })
})
router.delete("/api/items", (req, res) => {
    const { ItemID } = req.body;
    pool.query(`DELETE FROM item WHERE item.ItemID = ${ItemID}`, (err, result) => {
        if (err) {
            res.status(400).send("Cannot delete Item");
        }
        else {
            res.status(200).send(result);
        }
    })
})



module.exports = router;