'use strict';
let [firstName, lastName] = ["Вася", "Пупкин"];
console.log('firstName:'+firstName); // Вася
console.log('lastName:'+lastName);  // Пупкин

let [first, last, ...rest] = "Юлий Цезарь Император Рима".split(" ");
console.log(first); // Юлий
console.log(last);  // Цезарь
console.log(rest);      // Император,Рима (массив из 2х элементов)

// значения по умолчанию
let [f="Гость", l="Анонимный"] = [];
console.log(f); // Гость
console.log(l);  // Анонимный

let options = {
    title: "Меню",
    width: 100,
    height: 200
};

let {ttl, width, height} = options;
console.log(ttl);  // Меню
console.log(width);  // 100
console.log(height); // 200

let options2 = {
    ttl: "Меню",
    width: 100,
    height: 200
};
let {width2: w, height2: h, titl} = options2;
console.log(titl);  // Меню
console.log(w);      // 100
console.log(h);      // 200
