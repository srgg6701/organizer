'use strict';

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var firstName = "Вася";
var lastName = "Пупкин";

console.log('firstName:' + firstName); // Вася
console.log('lastName:' + lastName); // Пупкин

var _ = "Юлий Цезарь Император Рима".split(" ");

var _ref = _toArray(_);

var first = _ref[0];
var last = _ref[1];

var rest = _ref.slice(2);

console.log(first); // Юлий
console.log(last); // Цезарь
console.log(rest); // Император,Рима (массив из 2х элементов)

// значения по умолчанию
var _ref2 = [];
var _ref2$ = _ref2[0];
var f = _ref2$ === undefined ? "Гость" : _ref2$;
var _ref2$2 = _ref2[1];
var l = _ref2$2 === undefined ? "Анонимный" : _ref2$2;

console.log(f); // Гость
console.log(l); // Анонимный

var options = {
    title: "Меню",
    width: 100,
    height: 200
};

var ttl = options.ttl;
var width = options.width;
var height = options.height;

console.log(ttl); // Меню
console.log(width); // 100
console.log(height); // 200

var options2 = {
    ttl: "Меню",
    width: 100,
    height: 200
};
var w = options2.width2;
var h = options2.height2;
var titl = options2.titl;

console.log(titl); // Меню
console.log(w); // 100
console.log(h); // 200