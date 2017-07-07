var AWS = require("aws-sdk");
var fs = require("fs");
var config = require('config');
var tableName = config.awsTableName;
var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
AWS.config.credentials = credentials;

AWS.config.update({
  region: config.awsRegion
});

var dynamodb = new AWS.DynamoDB();

module.exports = {
  dbCreateTable:  dbCreateTable,
  dbDeleteTable:  dbDeleteTable,
  putTestResult:  putTestResult,
  getTestResult:  getTestResult,
  delTestResult:  delTestResult,
  queryWithRunId: queryWithRunId,
  getRunIds:      getRunIds
};

function dbCreateTable() {
  var params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: "run_id", KeyType: "HASH"},  //Partition key
      { AttributeName: "test_id", KeyType: "RANGE" }  //Sort key  
    ],
    AttributeDefinitions: [       
      { AttributeName: "run_id", AttributeType: "S" },
      { AttributeName: "test_id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
    }
  }

  dynamodb.createTable(params, function(err, data) {
    if (err) console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  });
}

function dbDeleteTable() {
  checkRegionUpdate();

  var params = {
    TableName : tableName
  };

  dynamodb.deleteTable(params, function(err, data) {
    if (err) console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
  });
}

function putTestResult(loadData, tName) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: tName || tableName,
    Item: loadData
  };

  docClient.put(params, function(err, data) {
    if (err) console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  });
}

function getRunIds(ws) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName : config.awsRunIdTableName
  }
  return new Promise (function (resolve, reject) {
    docClient.scan(params, function(err, data) {
      if (err) { 
        console.log(err); 
        reject(err);
      } else {
        console.log('Query succeeded!');
        resolve(data);
      }
    });
  });
}

function getTestResult (params) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: tableName,
    Key: params
  };
  return new Promise(function(resolve, reject) {
    docClient.get(params, function(err, data) {
      if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log(JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
}

function delTestResult (params) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName:tableName,
    Key: params
  };

  docClient.delete(params, function(err, data) {
    if (err) console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  });
}

function queryWithRunId(runId) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName : tableName,
    KeyConditionExpression: "#run_id = :run_id",
    ExpressionAttributeNames: {
      "#run_id": "run_id"
    },
    ExpressionAttributeValues: {
      ":run_id": runId
    }
  };
  return new Promise (function (resolve, reject) {
    docClient.query(params, function(err, data) {
      if (err) { 
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log('Query succeeded!');
        resolve(data);
      }
    });
  });
}

function checkRegionUpdate() {
  if(!AWS.config.region) {
    AWS.config.update({
      region: config.awsRegion,
      endpoint: config.awsEndpoint
    });  
  }
}


