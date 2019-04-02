var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

router.post('/',upload.single('contents'),function(req,res){
    data = req.body;
    console.log('filename:',data.filename);
    console.log('content:');
    console.log(req.file);
    var client = req.app.locals.client;
    const query = 'INSERT INTO imgs (filename,contents) VALUES (?, ?)';
    const params = [data.filename,'b'];
    fs.readFile(req.file.path, 'utf8', function(err, data) {  
        if (err) throw err;
        console.log(data);
    });
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