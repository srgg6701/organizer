var template = require('../sources/default.jade');

exports.helloWorld = function () {
    var html = template({greetingText:'Hello browserify world!'});
    console.log('got html: ', html);
}