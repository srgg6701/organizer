var arr=[];
[4, 2, 5, 1, 3, 4, 12, 5, 1, 3].forEach(function(item){
    if(arr.indexOf(item)==-1) arr.push(item);
});
//console.log(arr);
var mp = [4, 2, 5, 1, 3, 4, 12, 5, 1, 3].map(function(item){
    return ((item>3)? 'bigger':((item<3)? 'smaller':'equal')) + ':' + item ;
});
console.log('mp', mp);

