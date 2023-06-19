const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    name: String
});

const WorkItems = mongoose.model('Work', workSchema);

module.exports = WorkItems;
