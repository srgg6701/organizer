var jade = require('jade');

// Compile a function
var fn = jade.compile('string of jade');

// Render the function
var html = fn();
module.exports = {
    html: html
};