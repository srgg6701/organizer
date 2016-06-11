class Greeter {
    constructor(message) {
        this.message = message;
    }

    greet() {
        var element = document.querySelector('#content');
        element.innerHTML = this.message;
    }
}

var greeter = new Greeter('Hello, world!');
greeter.greet();