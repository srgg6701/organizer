var codes = {
    "+7": "Россия",
    "+38": "Украина",
    "+1": "США"
};

for (var code in codes) {
    var value = codes[code];
    // "+" будет удалён, если заменить его на минус, то -- нет!
    code = +code; // ..если нам нужно именно число, преобразуем: "+7" -> 7
    //
    console.log( code + ": " + value ); // 7, 38, 1 во всех браузерах
}