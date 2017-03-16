var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');


var height = 0;
var newHeight = 0;
var url = 'http://9.122.79.220:7050/chain';


app.get('/', function(req, res){
  res.sendfile('index.html');
});


setTimeout(checkBlock,0000);

function checkBlock(){
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var Response = JSON.parse(body);
        height = Response.height
        console.log(height); 
    }
});
}


io.on('connection', function(socket){
  console.log('A user connected');


  setInterval(function(){ eventCheck()}, 2000);
 

function eventCheck(){

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var Response = JSON.parse(body);
        newHeight = Response.height
       // Show the HTML for the Modulus homepage.
      }

    console.log ("value to show is " + newHeight )
   console.log("value early is " + height); 
    });

  
  setTimeout(calHeight, 1000);

  function calHeight(){

    if (height != newHeight){
    
    console.log("Hi");

setTimeout(emitblock,1000);
  

  }else {

    console.log("Hello");
  socket.emit('testerEvent', { description: 'Block height' + height});
  }

  }
}



function emitblock(){

socket.emit('testerEventBlock', { description: 'New block created !' + newHeight });
height++;

}


  socket.on('disconnect', function () {
    console.log('A user disconnected');
  }); 
});


//var url = 'http://9.122.79.220:7050/chain';


http.listen(3000, function(){
  console.log('listening on localhost:3000');
});