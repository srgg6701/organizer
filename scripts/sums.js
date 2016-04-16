function sum(arg){
    return function (arg2){
        var sm = arg+arg2;
        console.log('sm = ', sm);
    };
}
//sum(1)(2); //3
//sum(5)(-1); //4

function makeBuffer() {
    var buff='';
    return function (str){
        if(str){
            buff+=str;
        }else if(buff){
            return buff;
        }
    }
}

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

// получить текущее значение
console.log(buffer()); // Замыкания Использовать Нужно!