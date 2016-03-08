// занчениия массивов и объектов передаются и изменяются по ссылке
// не передаются: number, string
var obj={ name:'no name'},
    arr = [1, 4, obj, 2, 22, 7],
    objNext = obj; // reference!
console.log('obj, arr', {obj:obj, arr:arr});
objNext.name = 'First Name';
objNext.lastName = 'Mo';
objNext.family = 'Unknown';
console.log('before splice',{obj:obj, objNext:objNext, arr:arr});
arr.splice(2,3,'objNext','objLast');
console.info('after splice',{obj:obj, objNext:objNext, arr:arr});

