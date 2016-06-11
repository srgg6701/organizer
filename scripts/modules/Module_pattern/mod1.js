var global = 'Hello, I am a global variable :)';

(function () {
    // We keep these variables private inside this closure scope

    var myGrades = [93, 95, 88, 0, 55, 91];

    var average = function() {
        var total = myGrades.reduce(function(accumulator, item) {
            return accumulator + item}, 0);

        return 'Your average grade is ' + total / myGrades.length + '.';
    };

    var failing = function(){
        var failingGrades = myGrades.filter(function(item) {
            return item < 70;});

        return 'You failed ' + failingGrades.length + ' times.';
    };

    console.log(failing());
    console.log(average());
    console.log(global);
}());

// 'You failed 2 times.'
// 'Hello, I am a global variable :)'

var fn = function(){};
+function(){console.log('Hello!')}; //бессмысленное выражение, т.к. функция не вызывается и не может быть вызывана из-за отсутствия имени в своём LexicalEnvironment
+function hello(){console.log('Hello!')}; // может быть вызвана
+function(){console.log('Hello!')}(); // вызывается сразу после определения
0,function(){console.log('Hello!')}(); // также вызывается сразу после определения
(function(){console.log('Hello!')}());