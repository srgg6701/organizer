var store = {}; // объект для коллекции

var items = ["div", "a", "hello", "form"];

for (var i = 0; i < items.length; i++) {
    var key = items[i]; // для каждого элемента создаём свойство
    store[key] = true; // значение здесь не важно
}

console.log('hello?', store['hello']);