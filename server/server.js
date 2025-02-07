const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/vue_crud').then(() => console.log('MongoDB connected')).catch(err => console.log(err));
// Define the schema for data
const Item = mongoose.model('Item', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
}));

// CRUD Routes

// Create an item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an item
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
