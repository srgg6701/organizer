//var fs = require('fs');
let val = 1 + 1;
console.log("my val will come. Here it is:", val);

var myObj = {
    sayHello: function(callback, mess) {
        console.log('Ready for callback?');
        callback(mess);
    }
};

function hello(name) {
    console.log('Hello, ', name);
}

myObj.sayHello(hello, 'Boredom');