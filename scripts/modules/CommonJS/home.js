var x = require('./one').x,
    two = require('./two'),
    y = two.y;

window.say = two.say;

console.log('x, y:', x + ', ' + y);