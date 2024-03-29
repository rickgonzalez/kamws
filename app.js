

import WebSocket, { WebSocketServer } from 'ws';
let clients = [];

createWebSocketServer(8080);
const port = 3000
import express from 'express';
var app = express();

app.get('/', (req, res) => {
  res.send('Basic server with websocket attempt');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('my app is listening at http://%s:%s', host, port);
});

export function createWebSocketServer(myport) {
  //this may not be necessary
  const wss = new WebSocketServer({
    port: myport,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
      //
    }
  });


  wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('adding connections to array')
    
    ws.on('message', (message) => {
      // Handle incoming messages
      console.log('Received:', message);
      //send to everyone else?
     

    });
    ws.on('close', () => {
      // Remove closed connections from the clients list
      clients = clients.filter((client) => client !== ws);
    });
  });

  console.log('WebSocket server started on port 8080');
}




//-----------------------------------------------------------

// var WebSocketServer = require('websocket').server;
// var http = require('http');




// var server = http.createServer(function(request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });

// let wsServer = new WebSocketServer({
//     httpServer: server,
//     // You should not use autoAcceptConnections for production
//     // applications, as it defeats all standard cross-origin protection
//     // facilities built into the protocol and the browser.  You should
//     // *always* verify the connection's origin and decide whether or not
//     // to accept it.
//     autoAcceptConnections: true
// });

// function originIsAllowed(origin) {
//   // put logic here to detect whether the specified origin is allowed.
//   return true;
// }

// wsServer.on('request', function(request) {
//     if (!originIsAllowed(request.origin)) {
//       // Make sure we only accept requests from an allowed origin
//       request.reject();
//       console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//       return;
//     }
    
//     var connection = request.accept('echo-protocol', request.origin);
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });



// var express = require('express');
// var app = express();

// var options = {
//   index: "coming-soon.html"
// };

// app.use('/', express.static('app', options));

// var server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('my app is listening at http://%s:%s', host, port);
// });