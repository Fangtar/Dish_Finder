const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const stores = require('./controllers/stores.js');

const app = express();
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: require("./public/javascript/helpers.js").helpers
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('views/images'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dish-finder', { useMongoClient: true });

stores(app);

app.get('/', (req,res)=>{
    res.render("home.handlebars")
})

app.listen(5000, ()=>{
    console.log('App listening to port 5000');
})

// Get rating pictures for yelp rating from here https://www.yelp.com/developers/display_requirements
