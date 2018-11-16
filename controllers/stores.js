module.exports = app => {
    
    app.get("/stores", function(req, res) {
        res.render("show-results")
    })

};
