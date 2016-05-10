function BigAnimalObject() {
    this.name = "Мышь";
    return { name: "Годзилла" };
}
//console.log('new BigAnimalObject.name: '+ new BigAnimalObject().name); // Годзилла

function BigAnimalLiteral() {
    this.name = "Мышь";
    // проигнорируется:
    return "Годзилла";
}
//console.log('new BigAnimalLiteral.name: '+ new BigAnimalLiteral().name); // Мышь

function User(name) {
    this.name = name;
    this.sayHi = function() {
        console.log({"Моё имя: ": this.name, this:this});
    };
}

var ivan = new User("Иван");

//ivan.sayHi();

function Th(){
    this.showThis = function(){
        console.log(this);
    };
}
/*
try{
    // error: Th.showThis is not a function
    // Потому что в контексте функции this -- это window
    Th.showThis();
}catch(e){
    console.error(e.stack);
}
*/

function A() {
    return this; // A
}
function B() {
    return new A(); // A
}

var a = new A;
var b = new B;

console.log({
    a:a,
    b:b,
    equal: a==b
});