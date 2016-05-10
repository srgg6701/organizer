var arr = [0, 11, 2, 13, 4, 3, 6, 7, 8],
    arr2 = [0, 11, 2, 13, 4, 3, 6, 7, 8],
    item,
    cnt=0;
// в качестве ограничителя оставить длину массива, которая изменяется динамически
for (var i = 0; i < arr.length; i++) {
    if (arr[i] < 3 || arr[i] > 6) arr.splice(i--, 1);
}
console.log(arr);

for (var i = 0; i < arr2.length; i++) {
    //
}   console.log('i = '+i, 'arr2.length = '+arr2.length);

while(arr2.length>cnt){
    item = arr2[cnt];
    if (item < 3 || item > 6) {
        console.log('splice: ', {
            item: item,
            cnt: cnt
        });
        arr2.splice(cnt, 1);
    }else{
        cnt++;
    }
}
//console.log(arr2);