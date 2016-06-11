var http = require('http'),
    url = require('url'),
    port = process.argv[2] || 9876,
    pathnames,
    serverUrl = '127.0.0.1';

http.createServer(runServer).listen(port,serverUrl);

function runServer(req, res){
    var path = url.parse(req.url).pathname;
    pathnames = path.split('/');
    //console.log('Pathname: ', pathname);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1>Hello, Dude!</h1>");
    pathnames.shift();
    if(!pathnames[pathnames.length-1]) pathnames.pop();
    var pathsLength = pathnames.length;
    res.write("<h4>Path("+pathsLength+"): /"+pathnames.join('/')+"</h4>");
    if(pathnames[0]){
        res.write("<p>paths:</p>");
        for (var i = 0, j = pathsLength; i < j; i++) {
            if(pathnames[i])
                res.write(pathnames[i]+'<br>');
        }
    }else{
        res.write('<p>Point any path out, at last!</p>');
    }
    res.end();
}
module.exports={
    serverUrl:serverUrl,
    port:port
};
