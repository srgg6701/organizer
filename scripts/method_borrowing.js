function printArgs() {
    //arguments.join = [].join; // одолжили метод (1)
    //var argStr = arguments.join(':'); // (2)
    var argStr = Array.prototype.join.call(arguments, ':'); // (2)

    console.log(argStr); // сработает и выведет 1:2:3
}

printArgs(1, 2, 3);