const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dish = require('./dish.js')

const store = new Schema({
    id: {type: String, required: true},
    categories: [{
        alias: String,
        title: String
    }],
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    display_phone: String,
    image_url: String,
    location: {
        address1: String,
        address2: String,
        address3: String,
        city: String,
        country: String,
        display_address: [
            String
        ],
        state: String,
        zip_code: String
    },
    name: String,
    phone: String,
    price: String,
    rating: Number,
    review_count: Number,
    url: String,
    dishes: [Dish.schema]
});

const Store = mongoose.model('Store', store);
module.exports = Store;
