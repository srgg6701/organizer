"use strict";

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
var max = Math.max.apply(Math, numbers);