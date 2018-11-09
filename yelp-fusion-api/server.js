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
