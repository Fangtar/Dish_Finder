'use strict'

const client = yelp.client('');

client.search({
    term:'Burrito',
    location: 'Berkeley'
}).then(response => {
    console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
    console.log(e);
});



// New yelp api code

'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '';

const searchRequest = {
  term:'Burrito',
  location: '2311 Warring Street, Berkeley, CA'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[2];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
