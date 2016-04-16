var timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
    return function() {
        console.log('n = '+arguments[0]);
        var start = (new Date).getTime(),
            result = f.apply(this, arguments); // (*) 10, 20
            //result = f(arguments); // (*) 10, 20
        if (!timers[timer]) timers[timer] = 0;
        timers[timer] += (new Date).getTime() - start;
        return result;
    }
}

// функция может быть произвольной, например такой:
/*var fibonacci = function f(n) {
    console.log('fibonacci');
    return (n > 2) ? f(n - 1) + f(n - 2) : 1;
};*/

// использование: завернём fibonacci в декоратор
var fibonacciRunner = timingDecorator( function f(n) {
    console.log();
    return (n > 2) ? f(n - 1) + f(n - 2) : 1;
}, "fibo");

// неоднократные вызовы...
console.log(fibonacciRunner(10)); // 55
console.log(fibonacciRunner(20)); // 6765
// ...

// в любой момент можно получить общее количество времени на вызовы
console.log(timers.fibo + 'мс');