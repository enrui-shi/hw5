var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var multer = require('multer');
var upload = multer();
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(upload.array()); 
router.use(express.static('public'));
router.post('/',upload.fields([]),function(req,res){
    data = req.body;
    console.log(req.body)
    //console.log('filename:',data.filename);
    //console.log('content:');
    //console.log(data.contents);
    var client = req.app.locals.client;
    const query = 'INSERT INTO imgs (filename,contents) VALUES (?, ?)';
    const params = ['a','b'];
    client.execute(query, params, { prepare: true }, function (err) {
            if(err){
                console.log(err);
                res.json({status:"error"});
            }else{
                res.json({status:"OK"});
            }
            //Inserted in the cluster
    });
});

module.exports = router;