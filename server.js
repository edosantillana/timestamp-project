
var express = require('express');

var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

app.get('/:dateValue', sendDate);

function sendDate(request, response) {

  var data = request.params.dateValue;
  var dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  if(isNaN(data)) {
    var natDate = new Date(data);
    natDate = natDate.toLocaleDateString("en-us", dateFormat);
    var unixDate = new Date(data).getTime() / 1000;
  } else {
    if(!isNaN(data)){
      var unixDate = data;
      var natDate = new Date(data * 1000);
      natDate = natDate.toLocaleDateString("en-us", dateFormat);
    } else {
      unixDate = null;
      natDate = null;      
    }
  }
  response.json({unix: unixDate, natural: natDate});
}
