const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const dish = new Schema({
    name: {type: String, required: true},
    details: [{
        ingredients: String
    }]
});

const Dish = mongoose.model('Dish', dish);
module.exports = Dish;
