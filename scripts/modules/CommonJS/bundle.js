(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let x ='X';
module.exports={
    x:x
};
},{}],2:[function(require,module,exports){
let y = 'Y';

function say() {
    console.log('Well, hello');
}
module.exports = {
    y: y,
    say: say
};
},{}],3:[function(require,module,exports){
var x = require('./one').x,
    two = require('./two'),
    y = two.y;

window.say = two.say;

console.log('x, y:', x + ', ' + y);
},{"./one":1,"./two":2}]},{},[3]);
