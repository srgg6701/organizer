function f(strings, ...values) {
    console.log({strings:strings, values:values})
}
let apples = 3;
let oranges = 5;
let str = f`Sum of ${apples} + ${oranges} =\n ${apples + oranges}!`;

let animal = {
    walk() {
        return "I'm walking";
    }
};

let rabbit = {
    __proto__: animal,
    walk() {
        let w = super.walk(); // I'm walking
        console.log('walk? ', w);
    }
};

rabbit.walk();