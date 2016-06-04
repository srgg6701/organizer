'use strict';

var x = 5;
console.log('x=' + x);'use strict';

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
console.log(h); // 200"use strict";

function showMenu() {
    var title = arguments.length <= 0 || arguments[0] === undefined ? "Untitled" : arguments[0];
    var width = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
    var height = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];

    console.log(title + " " + width + " " + height);
}

showMenu("Меню"); // Меню 100 200

var numbers = [2, 3, 15];
// Оператор ... в вызове передаст массив как список аргументов
// Этот вызов аналогичен Math.max(2, 3, 15)
var max = Math.max.apply(Math, numbers);"use strict";

var _obj;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _templateObject = _taggedTemplateLiteral(["Sum of ", " + ", " =\n ", "!"], ["Sum of ", " + ", " =\\n ", "!"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function f(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    console.log({ strings: strings, values: values });
}
var apples = 3;
var oranges = 5;
var str = f(_templateObject, apples, oranges, apples + oranges);

var animal = {
    walk: function walk() {
        return "I'm walking";
    }
};

var rabbit = _obj = {
    __proto__: animal,
    walk: function walk() {
        var w = _get(Object.getPrototypeOf(_obj), "walk", this).call(this); // I'm walking
        console.log('walk? ', w);
    }
};

rabbit.walk();"use strict";

console.log("Hi, way!");console.log("Remember me?");console.log("I am Dude!");