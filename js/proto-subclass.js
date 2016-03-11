// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Shape — суперкласс
function Shape() {
    this.x = 0;
    this.y = 0;
    console.log('this: ', this);
}

// метод суперкласса
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Фигура переместилась.');
};

// Rectangle — подкласс
function Rectangle() {
    Shape.call(this); // вызываем конструктор суперкласса
}

// подкласс расширяет суперкласс
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Является ли rect экземпляром Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('Является ли rect экземпляром Shape? ' + (rect instanceof Shape)); // true
rect.move(1, 1); // выведет 'Фигура переместилась.'

/**
this:  Shape { x: 0, y: 0 }
Является ли rect экземпляром Rectangle? true
Является ли rect экземпляром Shape? true
Фигура переместилась. */