// see its environment here: C:\Users\srgg6701\Documents\Projects\JS\miscellanous\CrossDomainMessaging\example2\server2.js
const   http = require('http'),
        fs = require('fs'),
        port = 8080;

http.createServer(function (request, response) {
    var exts, ext, type = 'text';

    function setParams(content) {
        response.writeHead(200, {'Content-Type': type + "/" + ext});
        response.write(content);
        response.end();
    }

    fs.readFile(__dirname+'/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        if(request.url=='/'){
            ext = 'html';
        }else{
            exts = request.url.split('.');
            ext = exts.pop();
        }
        switch (ext) {
            case 'js': case 'json':
                type = 'application';
                if(ext=='js') ext = 'javascript';
                break;
            case 'ico':
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                type = 'image';
                break;
            case 'wav':
                type = 'audio';
                break;
            default:
                type = 'text';
                break;
        }   //console.log({__dirname:__dirname, 'request.url': request.url, "Content-Type": type + "/" + ext});
        if (ext == 'html') {
            setParams(html);
        }else{
            fs.readFile(__dirname+request.url, function(err, content) {
                if (err) {
                    throw err;
                }
                setParams(content);
            });
        }
    })
}).listen(port, function(){console.log('Server is run!')});