const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rating = new Schema({
    up: Number,
    neutral: Number,
    down: Number
});

const Rating = mongoose.model('Rating', rating);
module.exports = Rating;
