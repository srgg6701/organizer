/*console.log([0, 11, 2, 13, 4, 3, 6, 7, 8].sort(function(a,b){
    return b-a;
}));*/

var vasya = { name: "Вася", age: 23},
    masha = { name: "Маша", age: 18},
    vovochka = { name: "Вовочка", age: 6 };

var people = [ vasya , masha , vovochka ];

console.log(people.sort(function(a,b){
    return a.age-b.age;
}));