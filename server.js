var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var timeout = require('connect-timeout');
var argv = require('yargs').argv; 
var config = require('config');
var uuidV4 = require('uuid/v4');

var app = express();
var port = parseInt(config.port, 10); //default 4040
var ipaddress = '0.0.0.0';

var server = http.createServer(app);

server.listen(port, ipaddress, function () {
  console.log('Server Listening on port: ', port);
  outputConfigLog();
});

app.use(cors());
app.use(timeout('600s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/status', require('./routes/status'));

app.use('/users', function (req, res) {
  res.json([{
  	id: 1,
  	username: "Barak Obama"
  }, {
  	id: 2,
  	username: "Donald Trump"
  }]);
});
/**
 * @example curl 'http://localhost:4040/home'
 */
app.use('/home', function(req, res) {
  var runId = uuidV4();
  setTimeout(function() {
    var resp = {
      data: {
        run_id: runId
      },
      message: "Successfully connected to tq-api/home"
    }
    res.status(200).send(resp);
  }, 1000);
});

/**
 * @example curl 'http://localhost:4040/getsome'
 */
app.use('/getsome', function(req, res) {
  var runId = uuidV4();
  setTimeout(function() {
    var resp = {
      data: {
        run_id: runId
      },
      message: "Successfully connected to tq-api/getsome"
    }
    res.status(200).send(resp);
  }, 1000);
});

/**
 * curl 'http://localhost:4040/run_all_tests'
 * will run all tests and save results to DynamoDB. 
 * hatkins will run postman Testable collections
 */
app.use('/run_all_tests', function(req, res) {
  var runId = uuidV4();
  setTimeout(function() {
    var resp = {
      data: {
        run_id: runId
      },
      message: "Successfully connected to tq-api/run_all_tests"
    }
    res.status(200).send(resp);
  }, 1000);
});


app.use('/interval', function (req, res) {
  var runId = uuidV4();
  setTimeout(function() {
    var resp = {
      data: {
        run_id: runId
      },
      message: "Successfully connected to tq-api/interval"
    }
    res.status(200).send(resp);
  }, 1000);
});

app.post('/post', function (req, res) {
  res.send('POST request to homepage');
});


function outputConfigLog() {
  console.log('Configured as: ', 'http://' + ipaddress + ':' + port);
}