
const yelp = require('yelp-fusion');
const apiKey = '';
// const searchRequest = {
//     term:'Burrito',
//     location: '2311 Warring Street, Berkeley, CA'
// };
const client = yelp.client(apiKey);


module.exports = app => {

    app.get("/stores", function(req, res) {
        let query_input = req.query;
        console.log(query_input);
        // query_input.location = '2311 Warring Street, Berkeley, CA';
        // console.log(query_input);
        client.search(query_input).then(response => {
            let results = response.jsonBody.businesses;
            // console.log(results);
            // const firstResult = response.jsonBody.businesses[2];
            // const prettyJson = JSON.stringify(firstResult, null, 4);
            // console.log(prettyJson);
            res.render("show-results", {results: results, query: query_input})
        }).catch((err) => {
            console.log(err.message);
        });
    })

};
