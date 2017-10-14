var jade = require('jade');
var fn = jade.compileFile('default.jade');
var htmlOutput = fn({
    maintainer: {
        name: 'Forbes Lindesay',
        twitter: '@ForbesLindesay',
        blog: 'forbeslindesay.co.uk'
    }
});