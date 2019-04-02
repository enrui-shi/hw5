var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',jsonParser,function(req,res){
    data = req.body;
    console.log(data);
    var client = req.app.locals.client;
});

module.exports = router;