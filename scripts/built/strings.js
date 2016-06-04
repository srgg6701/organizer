"use strict";

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

rabbit.walk();