var http = require('http'),
    netBible = require('../netBible');

http.createServer(function (req, res) {
    netBible.get("Nahum 1")
        .then(function(data) {
            res.end(JSON.stringify(data));
        }, function(error) {
            res.end("Error: " + error);
        });
}).listen(3000);

console.log('Server running at http:localhost:3000');
