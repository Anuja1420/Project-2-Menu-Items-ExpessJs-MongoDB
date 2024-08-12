//I should be able to see the different categories of the menu like pizza, sides, beverages, combo, new launches, and bestsellers. 
//I should be able to select an item from the menu and see the details of the item, including name, description, price, and availability. 
//I should be able to perform CRUD (Create, Read, Update, Delete) operations on the items available in the menu.

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const menuitem = require('./Routes/MenuItems');

mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const PORT = 4001;
app.listen(PORT , ()=>{
    console.log(`Server Connected to port ${PORT}`);
})

app.use(bodyParser.json());
app.use(cors());
app.use('/menuitems', menuitem);