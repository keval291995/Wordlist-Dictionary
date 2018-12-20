
var messageLogger = function(message,type) {
  var color = '\x1b[33m';//yellow
  if(type === 'success'){
    color = '\x1b[32m'//green
  }else if(type === 'error'){
    color = '\x1b[31m'//red
  }

  var liner = '-'
  for(var i =0; i<= message.length; i++){
    liner += '-';
  }
  console.log(liner);
  console.log(color+'%s\x1b[0m', ` ${message}`);
  console.log(liner);
}

var resultsLogger = function(results) {
  var result = '';
  results.forEach(r => {
    if(typeof r === 'string'){
      result += r + '\n';
    }else{
      result += r.text + '\n'
    }
  });
  console.log(result);
}
var resultsLogger1 = function(results) {
  var result = '';
  results.forEach(r => {
    if(typeof r === 'string'){
      result += r + '<br>';
    }else{
      result += r.text + '<br>'
    }
  });
  return result;
}

var headingLogger = function(message) {
  var liner = '-';
  for(var i =0; i<= message.length; i++){
    liner += '-';
  }
  console.log('\x1b[32m%s\x1b[0m', ` ${message}`);
  console.log(liner);
}


module.exports = {
  resultsLogger,
  resultsLogger1,
  headingLogger,
  messageLogger
};