const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const stores = require('./controllers/stores.js');
const isomorphic = require('isomorphic-fetch');

// Require syntax
const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;

const unsplash = new Unsplash({
    applicationId:"58542430bee9cfc91faa9dd2a463994315a568c02e82f60ced38b44a45a86f55",
    secret: "2eb81bf8ac1736f007d1d8dff32dff131cbee93039f6fda0be87ed861ae868f9",
    callbackUrl: "http://unsplash-js.herokuapp.com"
});

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

app.get('/', (req,res) => {
    unsplash.photos.getRandomPhoto({ query: "Food"})
      .then(toJson)
      .then(json => {
          console.log(json);
          res.render("home.handlebars", { randomImageURL: json.urls.regular })
      })
      .catch((err)=>{
          console.log(err.message);
          res.render("home.handlebars", { randomImageURL: 'https://i.imgur.com/S1GHqCb.jpg' })
      });
})

app.listen(5000, ()=>{
    console.log('App listening to port 5000');
})

// Get rating pictures for yelp rating from here https://www.yelp.com/developers/display_requirements
