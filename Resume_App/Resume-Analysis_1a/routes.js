var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    console.log("Hello I'm on the basic view here");
    res.render("index");
});

module.exports = router;