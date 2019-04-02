var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

router.get('/',upload.none(),function(req,res){
    filename = req.query.filename;
    console.log('filename:',filename);
    var client = req.app.locals.client;
    const query = 'SELECT contents FROM imgs WHERE filename = ?';
    client.execute(query, [filename], { prepare: true }, function(err,result){
        if(err){
            console.log(err);
            res.json({"status":'error'});

        }else{
            console.log(result.first());
            res.type('image')
            res.send(result.first());
        }
    });
    
});

module.exports = router;