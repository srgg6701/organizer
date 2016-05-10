function makeBuffer() {
    var buffered='';

    if(!buffer) buffer = {};

    return function(word){ // buffer
        if(buffer&&!buffer.clear){
            buffer.clear = function(){
                buffered = '';
            };
        }
        if(word){
            buffered+=word;
        }else return buffered;
    };
}

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

// получить текущее значение
console.log( buffer() ); // Замыкания Использовать Нужно!
buffer.clear();
console.log('buffer now: ' + buffer());