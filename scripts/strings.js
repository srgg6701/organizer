/*
var inputValues=['hello', null, 'bye-bye'], outputStrings = [], outputStr1=[];
for (var i = 0, n = inputValues.length; i < n; ++i) {
    // will cause of error on inputValues[1]!
    //outputStr1.push(inputValues[i].toString());
    // safe using with String, which creates string 'null'
    outputStrings.push(String(inputValues[i]));
}
console.log({outputStrings:outputStrings, outputStr1:outputStr1});*/

/*
function outputStr(){
    console.info(String(this));
}
"Hello".outputStr.call("Hello");*/

String.prototype.repeatify = function(cnt){
    var str='';
    while(cnt){
        console.log('this: ', this);
        str+=this; // this пробразуется в примитив, т.к. скрипт пытается конкатенировать его со строкой
        cnt--;
    }
    return str;
};
console.log('hello'.repeatify(3));

//var str1 = new String("Hello"); console.log('str1', str1);