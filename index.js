var logger = require('./logger');
var oxford = require('./oxfordClient');
var express = require('express');
const app = express();
var prompt = require('prompt');

//list to help users the available keyword
var helpers = [
  'Definitions : def',
  'Synonyms : syn',
  'Antonyms : ant',
  'Examples : ex',
  'Audio : aud',
  'All the above : all'
]

logger.messageLogger('Enter any of the below keyword and Enter the word');
logger.resultsLogger(helpers);
prompt.start();
prompt.get(['type','word'], function (err, result) {
    var type = result.type;
    var word = result.word;
    console.log(' type: ' + result.type);
    console.log(' word: ' + result.word);
    if(type === 'def' && word != ''){
      oxford.getDefinitions(word);
    }
    else if(type === 'aud' && word != ''){
      oxford.getAudio(word);
    }
    else if(type === 'syn' && word != ''){
      oxford.getSynonyms(word);
    }
    else if(type === 'ant' && word != ''){
      oxford.getAntonyms(word);
    }
    else if(type === 'ex' && word != ''){
      oxford.getExamples(word);
    }
    else if(type === 'all' && word != ''){
      oxford.getAll(word);
    }
    else{
      logger.messageLogger('Wrong keyword!, below are the supported one','error');
      logger.resultsLogger(helpers);
    }
  });


