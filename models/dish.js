const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const dish = new Schema({
    name: {type: String, required: true},
    // details: [{
    //     ingredients: String
    // }]
    tags: [String],
    rating: Number
});

const Dish = mongoose.model('Dish', dish);
module.exports = Dish;
