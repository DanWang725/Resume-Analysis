var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    console.log("Hello I'm on the basic view here");
    res.render("index");
});


router.get("/about", function(req,res){
    res.render("about");
});

module.exports = router;