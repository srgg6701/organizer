var http = require('http'),
    url = require('url'),
    port = process.argv[2] || 9876,
    serverUrl = '127.0.0.1';

console.log({port:port, serverUrl:serverUrl});

http.createServer(runServer).listen(port,serverUrl);

function runServer(req, res){
    //var pathname = url.parse(req.url).pathname;
    //console.log('Pathname: ', pathname);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Hello, Dude! Do anything, at last!");
    res.end();
}
module.exports={
    serverUrl:serverUrl,
    port:port
};
