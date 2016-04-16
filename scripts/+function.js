+function(){
    console.log('I ran');
}();

!function(){
    console.log('I ran too');
}();

/* syntax error:
function(){
    // because without + or ! before function expression
}();*/

var doItBabe = function(arg){
    console.log('Done: '+arg);
}('write poem!');