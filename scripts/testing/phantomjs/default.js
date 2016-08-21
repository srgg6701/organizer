// Simple Javascript example
console.log('Loading a web page');
var page = require('webpage').create(),
    system = require('system');
var url = 'http://localhost:8080/'+system.args[1];
page.open(url, function (status) {
    var doc = page.evaluate(function() {
        return {
            title: document.title,
            script: document.getElementById('local_script')
        };
    });
    console.log('title:' + doc.title+', script:'+doc.script.innerHTML);
    phantom.exit();
});
