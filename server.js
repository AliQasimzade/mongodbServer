require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const {users} = require('./workout')
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 10000

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("success")
})
    .catch(err => {
        console.log("Error")
    })

app.listen(port, () => {
    console.log(`Server listening on: ${port}`)
})

app.get("/",  async (req, res) => {
  try {
      const workout = await users.find()
      res.status(200).json(workout);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})