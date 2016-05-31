"use strict";

function showMenu(title = "Untitled", width = 100, height = 200) {
    console.log(`${title} ${width} ${height}`);
}

showMenu("Меню"); // Меню 100 200

let numbers = [2, 3, 15];
// Оператор ... в вызове передаст массив как список аргументов
// Этот вызов аналогичен Math.max(2, 3, 15)
let max = Math.max(...numbers);


