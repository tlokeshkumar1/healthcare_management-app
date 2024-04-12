const express = require("express");
const collection = require("./mongo");
const hashcodes = require("./db");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };
  try {
    const check = await collection.findOne({ email: email, password: password});

    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    res.json("not exist");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  const data = {
    username: username,
    email: email,
    password: password,
  };
  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("not exist");
  }
});

app.post("/upload", async (req, res) => {
  const { ipfsHash, filename, username } = req.body;

  if (ipfsHash) {
    // If ipfsHash is generated, directly store values in the database
    const data = {
      ipfsHash: ipfsHash,
      filename: filename,
      username: username,
    };

    try {
      // Increase timeout for insertMany operation
      const options = { maxTimeMS: 30000 }; // Set timeout to 30 seconds
      await hashcodes.insertMany([data], options);
      res.status(200).send("Data stored successfully.");
    } catch (error) {
      res.status(500).send("Error storing data in the database.");
    }
  } else {
    // Handle the case where ipfsHash is not generated
    res.status(400).send("IPFS hash is required.");
  }
});

app.get('/download', async (req, res) => {
  try {
    const username = req.query.username;
    const userData = await hashcodes.find({ username: username });
    
    if (userData.length > 0) {
      const data = userData.map(({ ipfsHash, filename }) => ({ ipfsHash, filename }));
      res.json(data);
    } else {
      res.status(404).json({ message: 'Username not found' });
    }
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.listen(8000, () => {
  console.log("port is connected");
});
