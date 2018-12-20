var https = require('https');
var logger = require('./logger');
var express = require('express');
const app = express();
//reg exp to check if the responsedata is not html content
var htmlRegExp = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i;

//Request parameters that are sent to oxford path is changed based on the user request of def/ant/syn/ex
var postRequest = {
  host: "od-api.oxforddictionaries.com",
  path: "/api/v1/entries/en/",
  port: "443",
  method: "GET",
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': "application/json",
    'app_id': '99cad4c5',
    'app_key': '53d0c0df294133bda56e70c901e79aff'
  }
};
var postRequestDuplicatepath = '/api/v1/entries/en/';

var getDefinitions = function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          // console.log(searchData);
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/', function(req, res) {
              res.send('<b>Defination</b> : '+yx);
            });
            app.listen(3000);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Definitions of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getSynonyms = function(word) {
  try {
      postRequest.path = postRequest.path + word + '/synonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data ;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/', function(req, res) {
              res.send('<u><b>Synonyms </b></u>:<br><br>'+yx+'');
            });
            app.listen(3000);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Synonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getAntonyms = function(word) {
  try {
      postRequest.path = postRequest.path + word + '/antonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/', function(req, res) {
              res.send('<b><u>Antonyms </u></b>:<br><br>'+yx+'');
            });
            app.listen(3000);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Antonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getExamples =function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].examples;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/', function(req, res) {
              res.send('<p><b><u>Example </u></b>:<br><br>'+yx+'</p>');
            });
            app.listen(3000);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Examples of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}

var getAudio = function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          // console.log(searchData);
          if(!htmlRegExp.test(searchData)){
            //console.log(searchData);
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            app.get('/', function(req, res) {
              res.send('<html><head><title>Audio</title></head><body><div><p>Entered word : '+word+' <br><br> Press <b>Play</b> button to hear the audio</p></div><div><audio controls> <source src="'+requiredData+'" type="audio/mpeg"></div></body></html>');
            });
            app.listen(3000);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Audio of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}

var getAll = function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData1 = searchData.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
            getSyn(word);
            var requiredData4 = searchData.results[0].lexicalEntries[0].entries[0].senses[0].examples;
            var requiredData5 = searchData.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            var yx1 = logger.resultsLogger1(requiredData1);
            var yx2 = logger.resultsLogger1(requiredData4);
            
            app.get('/', function(req, res) {
              res.send('<p><b><u>Defination</u></b> : '+yx1+'</p><p><b><u>Synonyms</u></b> : <a href="/sym">Click Here</a></p><p><b><u>Antonyms</u></b> : <a href="/anty">Click Here</a>'+'</p><p><b><u>Example</u></b> :<br><br>'+yx2+'</p><div><p><b><u>Audio</u></b> <br><br> Press <b>Play</b> button to hear the audio</p></div><div><audio controls> <source src="'+requiredData5+'" type="audio/mpeg"></div>');
            });
            app.listen(3000);
            logger.headingLogger(`Loading`)
          }else{
            logger.messageLogger(`OOPS! Definitions of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}

var getSyn = function(word){
  try {
      postRequest.path = postRequest.path + '/synonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/sym', function(req, res) {
              res.send('<p><b><u>Synonyms</u></b> : '+yx+'</p><br><p><a href="../"><< Go Back</a>');
            });
            app.listen(3001);
            logger.headingLogger(`Loading`)
            getAtn(word);
          }else{
            logger.messageLogger(`OOPS! Synonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getAtn = function(word){
  try {
      postRequest.path = postRequestDuplicatepath + word + '/antonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;;
            var yx = logger.resultsLogger1(requiredData);
            app.get('/anty', function(req, res) {
              res.send('<p><b><u>Antonyms</u></b> : '+yx+'</p><br><p><a href="../"><< Go Back</a>');
            });
            app.listen(3002);
            logger.headingLogger(`Open the link 'localhost:3000' in the browser`)
          }else{
            logger.messageLogger(`OOPS! Antonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}

module.exports = {
  getDefinitions,
  getSynonyms,
  getAntonyms,
  getExamples,
  getAudio,
  getAll
}