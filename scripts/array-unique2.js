// оставить в массиве только уникальные элементы
var a1 = [1, 2, 7, 6, 0, 4, 4, 2, 8, 100, "hello", 10, 11, "bye", "18", 0, 1, 100, 'chiao!'],
    el, i, k, nextKey;
for (i = 0, j = a1.length; i < j; i++) {
    if((el=a1[i])==undefined) continue;
    //
    console.log('el[' + i + '] = ' + el);
    for (k = 1; k < j; k++) {
        nextKey = k + i;
        if (a1[nextKey] == undefined) continue;
        //
        console.log('\ta1[' + nextKey + '] = ' + a1[nextKey]);
        if (a1[nextKey] == el) {
            //
            console.log('remove: ', a1[nextKey]);
            a1.splice(nextKey, 1);
        }
    }
}
console.log('a1', a1);
// [ 1, 2, 7, 6, 0, 4, 8, 100, 'hello', 10, 11, 'bye', '18', 'chiao!' ]