
const yelp = require('yelp-fusion');
const apiKey = 'Ttm9T3jW7ItGLfoEF1IaUztpCbCc5BVHFgzNjAbKgz2iyEP9JTBsjYJFxYz-HBux6r4GGROqZb8AWno1CvxmretUb7l7L79FUOByZGk9s2SX9kWEXF2X3BNPcuPlW3Yx';
// const searchRequest = {
//     term:'Burrito',
//     location: '2311 Warring Street, Berkeley, CA'
// };
const client = yelp.client(apiKey);
const Store = require('../models/store.js');

module.exports = app => {

    app.get("/stores", function(req, res) {
        let query_input = req.query;
        let query_term = query_input.term.toLowerCase();
        query_input.limit = 5;
        console.log(query_input);
        // query_input.location = '2311 Warring Street, Berkeley, CA';
        // console.log(query_input);
        client.search(query_input).then(response => {
            let results = response.jsonBody.businesses;
            let displayResults = [];
            let resultsId = [];
            // console.log(results);
            // const firstResult = response.jsonBody.businesses[2];
            // const prettyJson = JSON.stringify(firstResult, null, 4);
            // console.log(prettyJson);
            results.forEach((result)=>{
                resultsId.push(result.id);
                // Store.create(result)
                Store.updateOne({id: result.id}, result, {upsert: true, setDefaultsOnInsert: true})
                .then((store)=>{
                })
                .catch((err)=>{
                    console.log(err.message);
                })

                // Store.find({id: result.id})
                // .then((store)=>{
                //     let dishResult = store[0].dishes.filter((el)=>{
                //         let tagResult = el.tags.some(function(ele){
                //             return ele == query_term;
                //         })
                //         return tagResult;
                //     })
                //     displayResults.unshift(dishResult);
                //     console.log(dishResult);
                // })
                // .catch((err)=>{
                //     console.log(err.message);
                // })
            });
            console.log(resultsId);
            // Store.find({id: {$in: resultsId}})
            Store.find({'dishes.tags': {$in: [query_term]}, 'id': {$in: resultsId}})
            .then((stores)=>{
                // console.log(`stores are ${stores}`);
                stores.forEach((store)=>{
                    let dishResult = store.dishes.filter((el)=>{
                        let tagResult = el.tags.some(function(ele){
                            return ele == query_term;
                        })
                        return tagResult;
                    })
                    console.log(dishResult);
                    store.dishResult = dishResult;
                })
                res.render("show-results", {results: stores, query: query_input});
            }).catch((err)=>{
                console.log(err.message);
            })

        }).catch((err) => {
            console.log(err.message);
        });
    })

};
