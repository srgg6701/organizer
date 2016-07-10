var http = require('http'),
    url = require('url'),
    port = process.argv[2] || 9876,
    pathnames,
    serverUrl = '127.0.0.1';

http.createServer(runServer).listen(port,serverUrl);

function runServer(req, res){
    var path = url.parse(req.url).pathname; // http://localhost:9876
    pathnames = path.split('/');
    // удалить всё до первого слэша
    pathnames.shift();
    // если последний сегмент пуст -- тоже удалить
    if(!pathnames[pathnames.length-1]) pathnames.pop();
    var pathsLength = pathnames.length;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<!DOCTYPE html><html lang="en"><head>');
    res.write('<base href="http://'+serverUrl+':'+port+'">');
    res.write('<meta charset="UTF-8"><title>Title</title>');
    res.write('<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">');
    res.write('<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css.map">');
    res.write('<script src="bower_components/jquery/dist/jquery.js"></script>');
    res.write('</head>');
    res.write('<body><div class="container"><div class="row col-lg-10 col-md-10 col-sm-12 col-xs-11">');
    res.write("<h1>Hello, Dude!</h1>");
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
    res.write('</div></div></body></html>');
    res.end();
}
module.exports={
    serverUrl:serverUrl,
    port:port
};
