const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'datacenter1',
    keyspace: 'hw5'
  });
  
  client.connect(function (err) {
    if(err){
        console.log(err);
    }
    console.log("connet to local cassandra-driver")
    app.locals.client = client;
  });

//routers
var deposit = require('./routers/deposit.js');
var retrieve = require('./routers/retrieve.js');
//api endpoint
app.use('/deposit',deposit);
app.use('/retrieve',retrieve);

app.get('/',function(req,res){
    res.send('INDEX page');
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})



app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})