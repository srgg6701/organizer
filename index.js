var serv=require('./server/server');
if(serv){
    for(var key in serv){
        console.log(key+':'+serv[key]);
    }
    console.log('Server is ran, open the browser window at address http://'+serv.serverUrl+':'+serv.port);
}else{
    console.log('Something went wrong...');
}
//console.log("I'd love NodeJS...");
//var fs = require('fs');
//console.log({fs:fs});
