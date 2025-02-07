const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors'); // Enable CORS

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// MongoDB connection URL (replace with your MongoDB URI)
const uri = "mongodb://127.0.0.1:27017"; // Or use a cloud MongoDB URI
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();

const dbName = 'vue_crud'; // Replace with your database name
const collectionName = 'items'; // Replace with your collection name

// Example CRUD routes
app.get('/api/items', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// ... other CRUD routes (POST, PUT, DELETE)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});