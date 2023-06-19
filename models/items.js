const mongoose = require('mongoose');   

const itemSchema = new mongoose.Schema({
    name: String
});

const Items = mongoose.model('Item', itemSchema);

module.exports = Items;

