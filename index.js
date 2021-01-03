
require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql')
const auth = require('./auth');
const app = express();
const items = require('./items.js');
const admin = require('./admin.js');
const port = process.env.PORT || 5000;

//serve static files (react components)
app.use(express.static(path.join(__dirname, '/client/build')));

//HTTP methods logging
app.use(morgan('short'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

//authentication
app.use('/', auth);
//items
app.use('/', items);
//admin
app.use('/', admin)
let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST ,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
})
app.get('/', (req, res) => {
  res.send("Welcome to Cuddles's server.");
});
app.get('/api/users/:username/confirmation', (req, res) => {
  pool.query(`SELECT fullname, email, phone, street, city, zip, state, payment, cardnumber FROM user WHERE username="${req.params.username}"`, (err, result) => {
    if (err) {
      res.status(400);
      throw err;
    }
    else {
      res.status(200).send(result);
    }
  })
})

app.post('/api/users/:username/orders', (req, res) => {
  let today = new Date()
  pool.query(`INSERT INTO ordertable (ItemID, username, quantity, status, charge, orderDate) VALUES (${req.body.id}, "${req.params.username}", "1","PENDING","${req.body.price}","${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}")`, (err, result) => {
    if (err) {
      res.status(400);
      throw err;
    }
    else {
      res.status(200).send("Successfully inserted");
    }
  })
});
app.get('/api/users/:username/orders', (req, res) => {
  pool.query(`SELECT item.ItemImage, OrderID, status, orderDate, charge, item.ItemName, quantity, item.ItemPrice FROM ordertable INNER JOIN item ON item.ItemID = ordertable.ItemID WHERE username = "${req.params.username}";`, (err, result) => {
    if (err) {
      res.status(400);
      throw err;
    }
    else {
      res.status(200).send(result);
    }
  })
});
app.post('/api/users/:username/cart', (req, res) => {

});
app.put('/api/users/:username/accountInfo/username', (req, res) => {
  if (req.body.username != req.params.username) {
    pool.query(`SELECT username FROM user WHERE username = "${req.body.username}"`, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        pool.query(`UPDATE user SET username= "${req.body.username}" WHERE username="${req.params.username}"`, (err) => {
          if (err) {
            res.status(400).send("Cannot update Username");
            throw err;
          }
          else {
            res.status(200).send("Username updated");
          }
        })
      }
      else {
        res.status(400).send("Username exists!");
      }
    })
  }
})
app.put('/api/users/:username/accountInfo/password', (req, res) => {
  pool.query(`UPDATE user SET password = "${req.body.password}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update password");
      throw err;
    }
    else {
      res.status(200).send("Password updated");
    }
  })
})
app.put('/api/users/:username/accountInfo/email', (req, res) => {
  pool.query(`UPDATE user SET email= "${req.body.email}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update email");
      throw err;
    }
    else {
      res.status(200).send("Email updated");
    }
  })
})
app.put('/api/users/:username/accountInfo/fullname', (req, res) => {
  pool.query(`UPDATE user SET fullname= "${req.body.fullname}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update full name");
      throw err;
    }
    else {
      res.status(200).send("Full name updated");
    }
  })
})
app.put('/api/users/:username/accountInfo/phone', (req, res) => {
  pool.query(`UPDATE user SET username= "${req.body.phone}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update billing information");
      throw err;
    }
    else {
      res.status(200).send("Username updated");
    }
  })
})
app.get('/api/users/:username/accountInfo/billing', (req, res) => {
  pool.query(`SELECT cardnumber FROM user WHERE cardnumber IS NOT NULL AND username="${req.params.username}"`, (err, result) => {
    if (err) {
      res.status(400).send("Billing information does not exists.");
      throw err;
    }
    if (result.length > 0) {
      res.status(200).send("Billing information exsits.");
    }
    else {
      res.status(400).send("Billing information does not exists.");
    }
  })
});
app.put('/api/users/:username/accountInfo/billing', (req, res) => {
  pool.query(`UPDATE user SET payment="${req.body.payment}", cardnumber="${req.body.cardNumber}", cvv="${req.body.cvv}", expiration_date="${req.body.expirationDate}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update billing information");
      throw err;
    }
    else {
      res.status(200).send("Billing information updated");
    }
  })
})
app.get('/api/users/:username/accountInfo/address', (req, res) => {
  pool.query(`SELECT street FROM user WHERE street IS NOT NULL AND username="${req.params.username}"`, (err, result) => {
    if (err) {
      res.status(400).send("Address information does not exists.");
      throw err
    }
    else if (result.length > 0) {
      res.status(200).send("Address information exists.");
    }
    else {
      res.status(400).send("Address information does not exists.");
    }
  })
});
app.put('/api/users/:username/accountInfo/address', (req, res) => {
  pool.query(`UPDATE user SET street="${req.body.street}", city="${req.body.city}", zip="${req.body.zip}", state="${req.body.state}" WHERE username="${req.params.username}"`, (err) => {
    if (err) {
      res.status(400).send("Cannot update address information.");
      throw err;
    }
    else {
      res.status(200).send("Address information updated.");
    }
  });
})

app.get('/api/users/:username/accountInfo', (req, res) => {
  pool.query(`SELECT * FROM user WHERE username = '${req.params.username}'`, (err, result) => {
    if (err) {
      res.status(400).send("Cannot fetch account information.");
      throw err;
    }
    else {
      res.status(200).send(result[0]);
    }
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));