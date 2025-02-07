<template>
  <div id="app">
    <h1>Vue CRUD Application</h1>
    <div>
      <input v-model="newItem.name" placeholder="Name" />
      <input v-model="newItem.description" placeholder="Description" />
      <button @click="createItem">Add Item</button>
    </div>
    <ul>
      <li v-for="item in items" :key="item._id">
        <span>{{ item.name }} - {{ item.description }}</span>
        <button @click="deleteItem(item._id)">Delete</button>
        <button @click="editItem(item)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newItem: {
        name: '',
        description: ''
      },
      items: [],
      currentEditItem: null
    };
  },
  methods: {
    async fetchItems() {
      const res = await axios.get('http://localhost:5000/items');
      this.items = res.data;
    },
    async createItem() {
      if (this.newItem.name.trim()) {
        await axios.post('http://localhost:5000/items', this.newItem);
        this.newItem = { name: '', description: '' }; // Reset the form
        this.fetchItems(); // Refresh the list
      }
    },
    async deleteItem(id) {
      await axios.delete(`http://localhost:5000/items/${id}`);
      this.fetchItems(); // Refresh the list
    },
    async editItem(item) {
      this.currentEditItem = item;
      this.newItem.name = item.name;
      this.newItem.description = item.description;
    },
    async updateItem() {
      if (this.currentEditItem) {
        await axios.put(`http://localhost:5000/items/${this.currentEditItem._id}`, this.newItem);
        this.newItem = { name: '', description: '' }; // Reset the form
        this.currentEditItem = null;
        this.fetchItems(); // Refresh the list
      }
    }
  },
  mounted() {
    this.fetchItems(); // Fetch items when component mounts
  }
};
</script>

<style>
/* Add some basic styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

input {
  margin: 5px;
}

button {
  margin: 5px;
}
</style>
