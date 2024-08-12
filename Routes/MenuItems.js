const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Menu Item Schema
const MenuItemsSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    availability : Boolean,
    category : {type : String , enum : ['pizza', 'sides', 'beverages', 'combo', 'new launches', 'bestsellers' ]}
})

const MenuItems = mongoose.model('MenuItems' , MenuItemsSchema);

//CRUD Operations
//Post Menu
router.post('/', async(req,res)=>{
    try{
        const menuitem = new MenuItems(req.body);
        await menuitem.save();
        res.send("Menu Item saved successfully");
    }catch(error){
        res.status(500).send(error);
    }
})

//Get Menu Item
router.get('/', async(req,res)=>{
    try{
        const menuItems = await MenuItems.find();
        res.send(menuItems);
    }catch(error){
        res.status(500).send(error);
    }
})

//Get Menu Item by id
router.get('/id/:id', async(req,res)=>{
    try{
        const menuitems = await MenuItems.findById(req.params.id);
        if(!menuitems){
            return res.status(404).send('Menu Item not found for this Id');
        }
        res.send(menuitems);
    }catch(error){
        res.status(500).send(error);
    }
})

//Update Menu Item
router.put('/id/:id', async(req,res)=>{
    try{
        const menuitem = await MenuItems.findByIdAndUpdate(req.params.id, req.body ,{new : true});
        if(!menuitem){
            return res.status(404).send('Menu Item not found');
        }
        res.send('Menu Item Data Updated Successfully');
    }catch(error){
        res.status(500).send(error);
    }
})

//Delete Menu Item by Id
router.delete('/id/:id', async(req,res)=>{
    try{
        const menuitem = await MenuItems.findByIdAndDelete(req.params.id);
        if(!menuitem){
            return res.send(404).send('Menu Item data not found');
        }
        res.send('Menu Item Deleted Successfully');
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;