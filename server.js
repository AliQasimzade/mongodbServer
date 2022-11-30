const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { connectToDb, getDb } = require("./db");
let db;

const port = 3001
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("listening on..");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  let users = [];
  db.collection("users")
    .find()
    .sort({ login: 1 })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not found users" });
    });
})
app.get("/users", (req, res) => {
  if (req.query.login) {
    db.collection("users")
      .findOne({ login: req.query.login })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid Document id" });
  }
});

app.delete("/users/:login", (req, res) => {
  console.log(req.params.login);
  db.collection("users")
    .deleteOne({ login: req.params.login })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not delete the user" });
    });
});

app.patch("/users/:login", (req, res) => {
  const updates = req.body;
  db.collection("users")
    .updateOne({ login: req.params.login }, { $set: updates })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not update user" });
    });
});

module.exports = db;