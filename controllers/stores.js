
const yelp = require('yelp-fusion');
const apiKey = 'Ttm9T3jW7ItGLfoEF1IaUztpCbCc5BVHFgzNjAbKgz2iyEP9JTBsjYJFxYz-HBux6r4GGROqZb8AWno1CvxmretUb7l7L79FUOByZGk9s2SX9kWEXF2X3BNPcuPlW3Yx';
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
            res.render("show-results", {results: results})
        }).catch((err) => {
            console.log(err.message);
        });
    })

};
