/*
var int0=setTimeout(function () {
    console.log('zero');
}, 0);
var int1=setTimeout(function () {
    console.log('first');
}, 2000);
console.log('between timeouts');
var int2=setTimeout(function () {
    console.log('second 1');
    var newDate = new Date;
    while(new Date-newDate<2500) {}
    console.log('second 2');
}, 500);*/

var P = function(){
  this.a = 'P-a';
  this.b = 'P-b';
};

P.prototype = {
    a:null,
    b:null
};

var pp = new P();
