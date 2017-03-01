var utils = require('./utils');

var objectIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  /*
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectIdCounter
  }
  */
];

var actions = {
  'GET': function(request, response) {
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.objectId = ++objectIdCounter;
      messages.push(message);
      utils.sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

exports.requestHandler = utils.makeActionHandler(actions);

// var messages = [];//stores collective messages

// var requestHandler = function(request, response) {
//   var status, responseData; //variable to store status code
//   var headers = defaultCorsHeaders; //declares reference to defaultCorsHeaders
//   headers['content-type'] = 'text/plain';//creates custom key in headers based on our need for 'text/plain'

//   if (request.method === 'GET') {//if GET is the method
//     if (request.url === '/classes/messages') {
//       status = 200;
//     } else {
//       status = 404;
//     }
//     response.writeHead(status, headers);
//     response.end(JSON.stringify({results: messages}));
//   }//end of GET check
//   if (request.method === 'POST') {//if POST is the method
//     if (request.url === '/classes/messages') {
//       status = 201;
//     } else {
//       status = 404;
//     }

//     var collection = '';

//     request.on('data', function(cluster) {
//       collection += cluster;
//     });
//     request.on('error', function(error) {
//       console.log(error);
//     });
//     request.on('end', function() {
//       messages.push(JSON.parse(collection));
//       response.writeHead(status, headers);
//       response.end(JSON.stringify({results: messages}));
//     });
//       //for post end
//         //response.writeHead(status, header)
//   }
// };

// var sendResponse = function(response, data, status=200) {
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'application/json';
//   response.writeHead(status, headers);
//   response.end(JSON.stringify(data));
// };


// var gatherData = function(request, callback) {
//   var body = [];
//   request.on('data', function(data) {
//     body.push(data);
//     console.log(callback(body));
//   });
//   request.on('end', function() {
//     body = Buffer.concat(body).toString();
//     callback(body);
//   });
// }


// var requestHandler = function(request, response) {
//   if (request.method === 'GET') {
//     sendResponse(response, testMessage);
//   }

//   if (request.method = 'POST') {
//     gatherData(request, function(data) {
//       if (data !== "") {//prevents empty strings from being added to array
//         // console.log(data);
//         testMessage.unshift(data/*JSON.parse(data)*/);
//       };
//       sendResponse(response, testMessage, 201);
//     });
//   }
// /*

// function(request, response) {
//   var headers = request.headers;
//   var method = request.method;
//   var url = request.url;
//   var body = [];

//   request.on('error', function(err) {
//     console.error(err);
//   }).on('data', function(chunk) {
//     body.push(chunk);
//   }).on('end', function() {
//     body = Buffer.concat(body).toString();

//     response.on('error', function(err) {
//       console.error(err);
//     });
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');

//     var responseBody = {
//       headers: headers,
//       method: method,
//       url: url,
//       body: body
//     };

//     response.end(JSON.stringify(responseBody));

//   });
// }).listen(8080);

// */
// };

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };
// exports.requestHandler = requestHandler;

// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/

// var requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   console.log(request.method);
//   console.log(request.url);
//   console.log(response.writeHead);
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   //console.log(response);

//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   console.log('Serving request type ' + request.method + ' for url ' + request.url);

//   // The outgoing status.
//   var statusCode = 200;

//   // See the note below about CORS headers.
//   var headers = defaultCorsHeaders;

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.
//   headers['Content-Type'] = 'application/json';

//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   response.writeHead(statusCode, headers);

//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   response.end('Hello, World!');


// };

// // These headers will allow Cross-Origin Resource Sharing (CORS).
// // This code allows this server to talk to websites that
// // are on different domains, for instance, your chat client.
// //
// // Your chat client is running from a url like file://your/chat/client/index.html,
// // which is considered a different domain.
// //
// // Another way to get around this restriction is to serve you chat
// // client from this domain by setting up static file serving.
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };
// exports.requestHandler = requestHandler;
