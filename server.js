//
// # SimpleServer
//
// A simple Express server
//
var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(bodyParser.json());

router.use(express.static(path.resolve(__dirname, 'client')));

// API Routes
router.get('/api/v1/getData', function(request, response) {
//creates array for cells
    var data = [];
    var treasures = 0;
    for(var i = 0; i < 12; i++){
      var row = [];
      for(var j = 0; j < 12; j++){
          var hasTreasure = Math.random() < .2;
          if(hasTreasure){
              treasures++
          }
          var hasOrangutan = false;
          if(!hasTreasure){
            hasOrangutan = Math.random() < .1;
          } 
          
          var cell = {
            hasTreasure: hasTreasure,
            hasOrangutan: hasOrangutan,
            row: i,
            col: j
          };
        row.push(cell);
      }
      data.push(row);
    }
    
  console.log(treasures);

    response.send(data);
});

router.post('/api/v1/postData', function(request, response) {
    var color = request.body.color;
    if (color) {
        color = color.charAt(0).toUpperCase() + color.substring(1) + ' ';
    }
    var data = {
        message: color + 'Monday??'
    };
    response.send(data);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
