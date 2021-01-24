const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "",
});

app.get("/user", (req, res) => {
  db.query("SELECT user.* FROM", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Delete //
app.delete("/user/delete/:user_id", (req, res) => {
  const name = req.params.user_id;
  const sqlDelete = "DELETE FROM user WHERE user_id = ? ";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(ree);
  });
});

// Check Login //
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username Password Combination!" });
      }
    }
  );
});

app.post("/user/create", (req, res) => {
  const protion_id = req.body.protion_id;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const landname = req.body.landname;
  const status_id = req.body.status_id;
  const branch_id = req.body.branch_id;

  db.query(
    "INSERT INTO user (protion_id, username, password, email, firstname, landname, status_id, branch_id) VALUES(?,?,?,?,?,?,?,?)",
    [
      protion_id,
      username,
      password,
      email,
      firstname,
      landname,
      status_id,
      branch_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Inserte UserName And PassWord ComPlete!!");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server Is Running on Compass! 3001");
});
